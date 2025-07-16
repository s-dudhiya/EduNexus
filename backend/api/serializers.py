from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'full_name', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], # Use email as username for AbstractUser
            email=validated_data['email'],
            full_name=validated_data.get('full_name', ''),
            role=validated_data.get('role', 'student'),
            password=validated_data['password']
        )
        return user
