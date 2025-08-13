# api/views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import status
import jwt
import datetime
from rest_framework.permissions import AllowAny
import subprocess
import tempfile
import sys
import os
from datetime import date
from django.http import HttpResponse
# --- ADDED IMPORTS FOR THE NEW VIEW ---
from django.db.models import Sum, F, Window,Value
from django.db.models.functions import Rank, Coalesce
from .models import( StudentData, Faculty ,ExamPaper,ExamResult,Attendance, 
                    CurrentSemMarks,SubjectDetails, PastMarks, PracticalMarks, SubjectDetails, Notes)
# ------------------------------------
from .serializers import (
    CustomLoginSerializer,
    ExamPaperCreateSerializer,
    SubjectSerializer, 
    UserSerializer, 
    StudentDataSerializer, 
    FacultySerializer,
    ExamPaperSerializer,
    ExamResultSerializer,
    AttendanceSerializer,
    CurrentSemMarksSerializer,
    PastMarksSerializer,
    PracticalMarksSerializer,
    SubjectDetailsSerializer,
    NotesListSerializer,
    NotesUploadSerializer,
    StudentForAttendanceSerializer,
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


class ExamResultListView(generics.ListAPIView):
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer
    permission_classes = [IsAuthenticated]

class SubmitExamView(APIView):
    """
    This view receives the calculated exam scores and saves them to the ExamResult table.
    """
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

# --- ADDED THIS NEW VIEW AT THE BOTTOM OF THE FILE ---
class StudentDashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, enrollment_no, *args, **kwargs):
        try:
            student = StudentData.objects.get(enrollment_no=enrollment_no)
        except StudentData.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        department_rank = None
        
        # --- FINAL RANK CALCULATION (Ranks against all students in the semester) ---
        try:
            # 1. Get all students in the same SEMESTER (ignoring branch)
            students_in_semester = StudentData.objects.filter(
                semester=student.semester
            )

            # 2. Get all marks for those students
            marks_data = CurrentSemMarks.objects.filter(
                enrollment_number__in=students_in_semester.values_list('enrollment_no', flat=True)
            )

            # 3. Calculate total marks for each student, initializing all with 0
            student_totals = {s.enrollment_no: 0 for s in students_in_semester}
            for mark in marks_data:
                total = mark.t1_marks + mark.t2_marks + mark.t3_marks
                student_totals[mark.enrollment_number] = student_totals.get(mark.enrollment_number, 0) + total

            # 4. Create a sorted list of all students in the semester by their total marks
            sorted_students = sorted(student_totals.items(), key=lambda item: item[1], reverse=True)

            # 5. Determine the rank, handling ties correctly
            rank_map = {}
            current_rank = 0
            last_score = -1
            for i, (enroll_no, total) in enumerate(sorted_students):
                if total != last_score:
                    current_rank = i + 1
                rank_map[enroll_no] = current_rank
                last_score = total
            
            department_rank = rank_map.get(student.enrollment_no)

        except Exception as e:
            print(f"Could not calculate rank for student {enrollment_no}: {e}")

        # --- Calculate Overall Attendance (no changes here) ---
        attendance_agg = Attendance.objects.filter(
            enrollment_no=student.enrollment_no
        ).aggregate(
            total_attended=Sum('total_attended'),
            total_lectures=Sum('total_lectures')
        )
        
        overall_attendance = 0
        if attendance_agg.get('total_lectures') and attendance_agg['total_lectures'] > 0:
            overall_attendance = round((attendance_agg['total_attended'] / attendance_agg['total_lectures']) * 100)

        # --- Get Current Semester Subjects (no changes here) ---
        current_subjects = SubjectDetails.objects.filter(sem=student.semester).values('subject_name', 'subject_id')

        # --- Get Subjects with Low Attendance (no changes here) ---
        student_attendance_records = Attendance.objects.filter(enrollment_no=student.enrollment_no)
        low_attendance_subjects = []
        for record in student_attendance_records:
            if record.total_lectures > 0:
                percentage = (record.total_attended / record.total_lectures) * 100
                if percentage < 75:
                    low_attendance_subjects.append({
                        "name": record.subject_name,
                        "percentage": round(percentage)
                    })

        # --- Prepare the final data payload ---
        data = {
            "department_rank": department_rank,
            "overall_attendance": overall_attendance,
            "current_subjects": list(current_subjects), 
            "low_attendance_subjects": low_attendance_subjects,
            "pending_assignments": 3, # Static for now
            "upcoming_exams": 2, # Static for now
        }
        
        return Response(data)

class StudentResultsView(APIView):
    """
    This view gathers all marks (current, past, practical) and a list of all subjects
    for the authenticated student and returns them in a single response.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        if not isinstance(user, StudentData):
            return Response({"error": "User is not a student."}, status=status.HTTP_403_FORBIDDEN)

        # Fetch all three types of marks
        current_marks = CurrentSemMarks.objects.filter(enrollment_number=user.enrollment_no)
        past_marks = PastMarks.objects.filter(enrollment_no=user.enrollment_no)
        practical_marks = PracticalMarks.objects.filter(enrollment_no=user.enrollment_no)
        
        # --- FIX: Fetch all subjects ---
        all_subjects = SubjectDetails.objects.all()

        # Serialize the data
        current_marks_data = CurrentSemMarksSerializer(current_marks, many=True).data
        past_marks_data = PastMarksSerializer(past_marks, many=True).data
        practical_marks_data = PracticalMarksSerializer(practical_marks, many=True).data
        subjects_data = SubjectDetailsSerializer(all_subjects, many=True).data

        # Combine into a single response object
        data = {
            "current_marks": current_marks_data,
            "past_marks": past_marks_data,
            "practical_marks": practical_marks_data,
            "subjects": subjects_data # <-- Add the subjects list to the response
        }

        return Response(data)

class NotesView(APIView):
    """
    This view handles listing notes for students (GET) and uploading notes for faculty (POST).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        # Only students can view notes this way.
        if not isinstance(user, StudentData):
            return Response([], status=status.HTTP_200_OK)

        # 1. Find the subjects for the student's current semester.
        student_semester = user.semester
        relevant_subjects = SubjectDetails.objects.filter(sem=student_semester).values_list('subject_name', flat=True)

        # 2. Filter the notes to only include those subjects.
        notes = Notes.objects.filter(subject_name__in=list(relevant_subjects))
        
        serializer = NotesListSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user = self.request.user

        # Only faculty can upload notes.
        if not isinstance(user, Faculty):
            return Response({"error": "Only faculty can upload notes."}, status=status.HTTP_403_FORBIDDEN)

        # We need to handle the file data manually for BinaryField.
        file_obj = request.FILES.get('doc')
        if not file_obj:
            return Response({"error": "No document provided."}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            "uploader_id": user.fac_id,
            "uploader_name": user.fac_name,
            "subject_name": request.data.get('subject_name'),
            "desc": request.data.get('desc'),
            "doc": file_obj.read() # Read the file content into binary
        }
        
        serializer = NotesUploadSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteDownloadView(APIView):
    """
    This view handles downloading a specific note document.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            note = Notes.objects.get(pk=pk)
            # Create an HTTP response with the binary data and appropriate headers.
            response = HttpResponse(note.doc, content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{note.subject_name}_notes.pdf"' # Assuming PDF, can be made dynamic
            return response
        except Notes.DoesNotExist:
            return Response({"error": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

class SubjectListView(APIView):
    """
    Provides a list of subjects filtered by the logged-in faculty's semester.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        # Ensure the user is a faculty member
        if not isinstance(user, Faculty):
            return Response({"error": "User is not a faculty member."}, status=status.HTTP_403_FORBIDDEN)

        # Filter subjects based on the faculty's assigned semester
        faculty_semester = user.sem
        subjects = SubjectDetails.objects.filter(sem=faculty_semester)
        
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)

class ExamPaperCreateView(APIView):
    """
    Handles the creation of a new exam paper from the faculty dashboard.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ExamPaperCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BranchListView(APIView):
    """
    Provides a unique list of all student branches for the faculty's semester.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = self.request.user
        if not isinstance(user, Faculty):
            return Response({"error": "User is not a faculty member."}, status=status.HTTP_403_FORBIDDEN)
        
        branches = StudentData.objects.filter(semester=user.sem).order_by('branch').values_list('branch', flat=True).distinct()
        return Response(list(branches))

class SubjectListView(APIView):
    """
    Provides a list of subjects filtered by the logged-in faculty's semester.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = self.request.user
        if not isinstance(user, Faculty):
            return Response({"error": "User is not a faculty member."}, status=status.HTTP_403_FORBIDDEN)
        
        subjects = SubjectDetails.objects.filter(sem=user.sem)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)

class StudentByBranchView(APIView):
    """
    Provides a list of students filtered by branch and the faculty's semester.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request, branch, *args, **kwargs):
        user = self.request.user
        if not isinstance(user, Faculty):
            return Response({"error": "User is not a faculty member."}, status=status.HTTP_403_FORBIDDEN)
        
        students = StudentData.objects.filter(branch=branch, semester=user.sem)
        serializer = StudentForAttendanceSerializer(students, many=True)
        return Response(serializer.data)

class MarkAttendanceView(APIView):
    """
    Receives and saves attendance data. Enforces the "once per day per subject" rule.
    """
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        subject_id = request.data.get('subject_id')
        attendance_data = request.data.get('attendance')
        user = self.request.user

        if not subject_id or not attendance_data:
            return Response({"error": "Subject and attendance data are required."}, status=status.HTTP_400_BAD_REQUEST)

        today = date.today()
        
        enrollment_numbers = [item['enrollment_no'] for item in attendance_data]
        existing_attendance = Attendance.objects.filter(
            subject_id=subject_id,
            enrollment_no__in=enrollment_numbers,
            attd_date=today
        )

        if existing_attendance.exists():
            return Response({"error": "Attendance has already been marked for this subject today."}, status=status.HTTP_400_BAD_REQUEST)

        for item in attendance_data:
            enrollment_no = item['enrollment_no']
            status = item['status']
            
            try:
                student = StudentData.objects.get(enrollment_no=enrollment_no)
                subject = SubjectDetails.objects.get(subject_id=subject_id)
            except (StudentData.DoesNotExist, SubjectDetails.DoesNotExist):
                continue

            att_record, created = Attendance.objects.get_or_create(
                enrollment_no=enrollment_no,
                subject_id=subject_id,
                semester=student.semester,
                subject_name=subject.subject_name,
                defaults={'total_lectures': 0, 'total_attended': 0}
            )
            
            att_record.total_lectures += 1
            if status == 'present':
                att_record.total_attended += 1
            
            att_record.attd_date = today
            att_record.save()
            
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)
