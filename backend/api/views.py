# api/views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from django.conf import settings
import jwt
import datetime
from rest_framework.permissions import AllowAny
import subprocess
import tempfile
import sys
import os
from .models import StudentData, Faculty ,ExamPaper,ExamResult,Attendance
from .serializers import (
    CustomLoginSerializer, 
    UserSerializer, 
    StudentDataSerializer, 
    FacultySerializer,
    ExamPaperSerializer,
    ExamResultSerializer,
    AttendanceSerializer
)

# This is the new, improved view for your custom login logic.
class CustomLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = CustomLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        pin = serializer.validated_data['pin']
        role = serializer.validated_data['role']

        user_model = None
        user_data_serializer = None
        user_id_field = None
        email_field = None

        if role == 'student':
            user_model = StudentData
            user_data_serializer = StudentDataSerializer
            user_id_field = 'enrollment_no'
            email_field = 'email_id'
        elif role == 'faculty':
            user_model = Faculty
            user_data_serializer = FacultySerializer
            user_id_field = 'fac_id'
            email_field = 'fac_mail'

        # 1. Find the user by email first.
        try:
            user = user_model.objects.get(**{email_field: email})
        except user_model.DoesNotExist:
            return Response(
                {'detail': f'No {role} account found with this email.'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

        # 2. Check if the pin matches.
        # Note: This is a simple integer comparison. For a real application,
        # you would use Django's password hashing system.
        if user.pin != int(pin):
            return Response(
                {'detail': 'Invalid PIN provided.'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

        # 3. If both checks pass, generate the token.
        user_id = getattr(user, user_id_field)
        user_data = user_data_serializer(user).data
        
        # Add the role to the user data object for the frontend
        if user_data:
            user_data['role'] = role

        payload = {
            'id': user_id,
            'role': role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return Response({
            'token': token,
            'user': user_data
        })

# This view is for the Django Admin User model and can be kept.
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class VerifyTokenView(APIView):
    # This ensures that only requests with a valid token can access this view.
    # We will need to create a custom permission for this.
    # For now, let's build the logic.
    
    def get(self, request, *args, **kwargs):
        # The token is sent in the Authorization header. We need to decode it.
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({'detail': 'Invalid token header.'}, status=status.HTTP_401_UNAUTHORIZED)

        token = auth_header.split(' ')[1]
        
        try:
            # Decode the token using your SECRET_KEY
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            user_id = payload.get('id')
            role = payload.get('role')

            user_data = None
            if role == 'student':
                student = StudentData.objects.get(enrollment_no=user_id)
                user_data = StudentDataSerializer(student).data
            elif role == 'faculty':
                faculty = Faculty.objects.get(fac_id=user_id)
                user_data = FacultySerializer(faculty).data
            
            if user_data:
                user_data['role'] = role # Ensure role is in the response
                return Response(user_data)
            else:
                raise Exception("User not found")

        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Exception) as e:
            # If the token is expired, invalid, or the user doesn't exist, return an error.
            return Response({'detail': 'Token is invalid or expired.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class ExamPaperListView(generics.ListAPIView):
    """
    This view provides a list of all exam papers from the database.
    """
    queryset = ExamPaper.objects.all()
    serializer_class = ExamPaperSerializer
    permission_classes = [IsAuthenticated]
    
class RunCodeView(APIView):
    """
    This view runs student code against a list of JSON test cases.
    The code must pass all test cases to be considered correct.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_code = request.data.get('code')
        exam_paper_id = request.data.get('exam_paper_id')

        if not user_code or not exam_paper_id:
            return Response(
                {'error': 'Code and exam paper ID are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            exam_paper = ExamPaper.objects.get(id=exam_paper_id)
            test_cases = exam_paper.test_output_2 
        except ExamPaper.DoesNotExist:
            return Response(
                {'error': 'Exam paper not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # --- FIX: Check if test_cases is a list ---
        if not isinstance(test_cases, list):
            return Response(
                {'error': 'Test case data is not a valid list for this exam paper.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        temp_file_path = ''
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".py", mode='w', encoding='utf-8') as temp:
                temp.write(user_code)
                temp_file_path = temp.name
            
            all_passed = True
            first_output = ""
            first_error = ""

            # --- FIX: Loop through each test case from the JSON array ---
            for i, case in enumerate(test_cases):
                if not isinstance(case, dict):
                    all_passed = False
                    first_error = f"Test case at index {i} is not a valid object."
                    break

                input_data = case.get("Input")
                expected_output = case.get("Output", "").strip()

                run = subprocess.run(
                    [sys.executable, temp_file_path],
                    input=input_data,
                    capture_output=True,
                    text=True,
                    timeout=5
                )

                output = run.stdout.strip()
                error = run.stderr.strip()

                # Save the output and error of the first test case to show the user
                if i == 0:
                    first_output = output
                    first_error = error

                if run.returncode != 0: # Code crashed
                    all_passed = False
                    break # Exit the loop on the first failure

                if output != expected_output: # Output did not match
                    all_passed = False
                    break # Exit the loop on the first failure
            
            # Return the overall result
            return Response({
                'output': first_output,
                'error': first_error,
                'passed': all_passed
            })

        except Exception as e:
            return Response(
                {'error': f'An unexpected error occurred: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        finally:
            if temp_file_path and os.path.exists(temp_file_path):
                os.remove(temp_file_path)


class SubmitExamView(APIView):
    permission_classes = [IsAuthenticated] # Ensures only logged-in users can submit

    def post(self, request, *args, **kwargs):
        serializer = ExamResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Exam results saved successfully.'}, status=status.HTTP_201_CREATED)
        
        # If the data is invalid, return the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AttendanceView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # request.user will be a StudentData or Faculty object because of our custom authentication.
        user = self.request.user
        
        # Ensure the user is a student before trying to fetch attendance.
        if isinstance(user, StudentData):
            # Filter the Attendance table to get records for this student's enrollment number.
            return Attendance.objects.filter(enrollment_no=user.enrollment_no)
        
        # If the user is not a student (e.g., a faculty member), return an empty list.
        return Attendance.objects.none()