# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import StudentData, Faculty, ExamPaper,ExamResult, Attendance, CurrentSemMarks, PastMarks, PracticalMarks ,SubjectDetails, Notes

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
        fields = ('fac_id', 'fac_name', 'fac_mail','sem')

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

class CurrentSemMarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentSemMarks
        fields = '__all__'

class PastMarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastMarks
        fields = '__all__' # Use all fields directly from the model

class PracticalMarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticalMarks
        fields = '__all__' # Use all fields directly from the model

class SubjectDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectDetails
        fields = '__all__'


class NotesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        # We exclude 'doc' so we don't send large files in the list view.
        fields = ['id', 'uploader_id', 'uploader_name', 'subject_name', 'desc', 'upload_date']

# This serializer is for UPLOADING notes. It includes all fields.
class NotesUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'
        
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectDetails
        fields = ['subject_id', 'subject_name', 'sem']

# This serializer will validate and create a new ExamPaper instance from the form data.
class ExamPaperCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamPaper
        # These fields match your updated ExamPaper model
        fields = ['subject_id', 'sem', 'code_question', 'test_output_1', 'test_output_2', 'mcq_ques']

class StudentForAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentData
        fields = ['enrollment_no', 'name']
        
# This serializer is for UPLOADING notes. It includes all fields.
class NotesUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'