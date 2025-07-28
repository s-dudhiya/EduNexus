# api/views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from django.conf import settings
import jwt
import datetime

from .models import StudentData, Faculty
from .serializers import (
    CustomLoginSerializer, 
    UserSerializer, 
    StudentDataSerializer, 
    FacultySerializer
)

# This is the new, improved view for your custom login logic.
class CustomLoginView(APIView):
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
