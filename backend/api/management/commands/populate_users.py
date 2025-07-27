from django.core.management.base import BaseCommand
from api.models import User, StudentData, Faculty
import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'edunexus.settings')

# Configure Django settings
django.setup()

class Command(BaseCommand):
    help = 'Creates user entries for existing students and faculty'

    def handle(self, *args, **options):
        self.stdout.write("Starting to populate users...")

        # --- Create users for Students ---
        students = StudentData.objects.all()
        self.stdout.write(f"Found {len(students)} students.")
        for student in students:
            if not User.objects.filter(username=student.email_id).exists():
                try:
                    user = User.objects.create_user(
                        username=student.email_id,
                        password=str(student.pin),
                        email=student.email_id,
                        full_name=student.name,
                        role='student'
                    )
                    self.stdout.write(self.style.SUCCESS(f'Successfully created user for student: {student.name}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Failed to create user for student {student.name}: {e}'))
            else:
                self.stdout.write(self.style.WARNING(f'User already exists for student: {student.name}'))

        # --- Create users for Faculty ---
        faculties = Faculty.objects.all()
        self.stdout.write(f"Found {len(faculties)} faculty members.")
        for faculty in faculties:
            if not User.objects.filter(username=faculty.fac_mail).exists():
                try:
                    user = User.objects.create_user(
                        username=faculty.fac_mail,
                        password=str(faculty.pin),
                        email=faculty.fac_mail,
                        full_name=faculty.fac_name,
                        role='faculty'
                    )
                    self.stdout.write(self.style.SUCCESS(f'Successfully created user for faculty: {faculty.fac_name}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Failed to create user for faculty {faculty.fac_name}: {e}'))
            else:
                self.stdout.write(self.style.WARNING(f'User already exists for faculty: {faculty.fac_name}'))
        
        self.stdout.write("Finished populating users.")