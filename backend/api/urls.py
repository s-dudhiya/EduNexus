from django.urls import path
from .views import UserDetail, CustomLoginView, VerifyTokenView 

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='custom_login'),
      path('verify-token/', VerifyTokenView.as_view(), name='verify_token'),
    path('user/<int:pk>/', UserDetail.as_view(), name='user_detail'),
]
