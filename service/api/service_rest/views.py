from django.shortcuts import render
from .models import Technician, AutomobileVO, Appointment
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .encoders import TechnicianListEncoder, AppointmentListEncoder, AutomobileVODetailEncoder

# Create your views here.

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianListEncoder,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
            {"message": "Technicians do not exist"},
            status=400
            )
    else:
        content = json.loads(request.body)

    technician = Technician.objects.create(**content)
    return JsonResponse(
        technician,
        encoder=TechnicianListEncoder,
        safe=False,
    )

@require_http_methods(["DELETE"])
def api_technician(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})
    

@require_http_methods(["GET", "POST"])
def api_list_appointents(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician_id = content['technician']
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
            {"message": "Technician does not exist"},
            status=400
            )
    #set VIP status
        
    content["is_VIP"] = AutomobileVO.objects.filter(vin=content["vin"]).exists()

    appointment = Appointment.objects.create(**content)
    return JsonResponse(
        appointment,
        encoder=AppointmentListEncoder,
        safe=False,
    )

@require_http_methods(["DELETE"])
def api_delete_appoinment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})

@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
        try:
            Appointment.objects.filter(id=pk).update(status="canceled")
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=400
            )

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        Appointment.objects.filter(id=pk).update(status="finished")
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment does not exist"},
            status=400
        )