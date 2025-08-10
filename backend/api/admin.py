from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.models import User
from .models import (
    StudentData,
    Faculty,
    SubjectDetails,
    CurrentSemMarks,
    ExamPaper,
    ExamResult,
    PastMarks,
    PracticalMarks,
    Attendance
)

# First, unregister the default User admin that Django provides.
admin.site.unregister(User)

# Now, we can register our own version. This is the standard pattern.
@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    # You can customize the user admin here in the future if you want.
    # For now, we'll just use the default settings.
    pass

admin.site.register(StudentData)
admin.site.register(Faculty)
admin.site.register(SubjectDetails)
admin.site.register(CurrentSemMarks)
admin.site.register(ExamPaper)
admin.site.register(ExamResult)
admin.site.register(PastMarks)
admin.site.register(PracticalMarks)
admin.site.register(Attendance)
