# Generated by Django 5.2.4 on 2025-07-16 14:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_full_name_user_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='full_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='role',
        ),
    ]
