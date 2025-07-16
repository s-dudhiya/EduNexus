from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .serializers import MyTokenObtainPairSerializer, UserSerializer
from .models import User

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
