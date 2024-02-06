from django.db import models

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.PositiveSmallIntegerField()

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Appoinment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField()
    status = models.BooleanField(default=False)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=50)

    technician = models.ForeignKey(
        Technician,
        related_name=""
    )