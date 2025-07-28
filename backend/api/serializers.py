# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User # <-- FIX: Import the default User model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# This serializer is for getting user details after login.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # These are the standard fields on the default User model.
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

# This is the standard serializer for logging in with username and password.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # You can add custom claims to the token here if you need them later.
        token['username'] = user.username
        return token
