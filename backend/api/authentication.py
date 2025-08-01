# api/authentication.py

import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from .models import StudentData, Faculty

# This is our custom authenticator that understands your token.
class CustomJWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = authentication.get_authorization_header(request).decode('utf-8')

        if not auth_header or not auth_header.startswith('Bearer '):
            return None  # No token provided.

        token = auth_header.split(' ')[1]

        try:
            # Decode the token using the same secret key from your login view.
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            user_id = payload.get('id')
            role = payload.get('role')

            if not user_id or not role:
                raise exceptions.AuthenticationFailed('Invalid token payload.')

            # Based on the role in the token, fetch the correct user object.
            if role == 'student':
                user = StudentData.objects.get(enrollment_no=user_id)
            elif role == 'faculty':
                user = Faculty.objects.get(fac_id=user_id)
            else:
                raise exceptions.AuthenticationFailed('Invalid role in token.')

            # --- FIX: Add the is_authenticated property that DRF expects ---
            # This tells the permission checker that the user is valid.
            user.is_authenticated = True

            # This attaches the user object to request.user for protected views.
            return (user, token)

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired.')
        except (jwt.InvalidTokenError, StudentData.DoesNotExist, Faculty.DoesNotExist):
            raise exceptions.AuthenticationFailed('Invalid token or user not found.')

        return None
