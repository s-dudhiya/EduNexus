# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import StudentData, Faculty

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

