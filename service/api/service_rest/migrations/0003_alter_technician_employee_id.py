# Generated by Django 4.0.3 on 2024-02-07 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_rename_appoinment_appointment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='employee_id',
            field=models.CharField(max_length=50),
        ),
    ]
