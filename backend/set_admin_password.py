from django.contrib.auth import get_user_model

User = get_user_model()
u = User.objects.get(username='admin')
u.set_password('admin')
u.save()
