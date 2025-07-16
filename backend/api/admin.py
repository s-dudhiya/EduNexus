from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    # Add custom fields to the list view in the admin
    list_display = ('email', 'username', 'full_name', 'role', 'is_staff')
    
    # Add custom fields to the fieldsets for the add/edit forms
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('full_name', 'role')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('full_name', 'role')}),
    )

admin.site.register(User, CustomUserAdmin)
