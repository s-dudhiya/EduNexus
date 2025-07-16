from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'full_name', 'role')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super().validate(attrs)
        
        # Get the role from the request context
        request_role = self.context['request'].data.get('role')
        
        # Check if the user's role matches the requested role
        if self.user.role != request_role:
            raise serializers.ValidationError({
                'detail': f"You are not authorized to log in as a {request_role}."
            })
            
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['role'] = user.role

        return token
