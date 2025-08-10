# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import StudentData, Faculty, ExamPaper,ExamResult, Attendance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class StudentDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentData
        fields = ('enrollment_no', 'name', 'gender', 'branch', 'semester', 'contact_no', 'email_id')

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ('fac_id', 'fac_name', 'fac_mail')

class CustomLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    pin = serializers.CharField(style={'input_type': 'password'})
    role = serializers.ChoiceField(choices=['student', 'faculty'])

class ExamPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamPaper
        fields = '__all__' # This will include all fields from your ExamPaper model
class ExamResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamResult
        # These fields match the columns in your api_examresult table
        fields = ['enrollment_no', 'subject_id', 'code_marks', 'mcq_marks', 'test_name']
        
class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        # This will include all fields from your Attendance model
        fields = '__all__'