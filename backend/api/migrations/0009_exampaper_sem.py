
import django.db.models.deletion

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_notes_sem'),
    ]

    operations = [
        migrations.AddField(
            model_name='exampaper',
            name='sem',
            field=models.IntegerField(default=7),
            preserve_default=False,
        ),
    ]
