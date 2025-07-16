from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('faculty', 'Faculty'),
        ('admin', 'Admin'),
    )

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='student')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name', 'role']