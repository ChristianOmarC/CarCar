from django.urls import path
from .views import (
    api_list_technicians, 
    api_list_appointents, 
    api_technician, 
    api_delete_appoinment,
    api_cancel_appointment,
    api_finish_appointment)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
    path("appointments/", api_list_appointents, name="api_list_appointents"),
    path("appointments/<int:pk>/", api_delete_appoinment, name="api_delete_appointment"),
    path("appointments/<int:pk>/cancel/", api_cancel_appointment, name="api_appointment_status_cancel"),
    path("appointments/<int:pk>/finish/", api_finish_appointment, name="api_appointment_status_finish")
]