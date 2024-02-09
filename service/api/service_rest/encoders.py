from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

class AutomobileVODetailEncoder(ModelEncoder):
    model=AutomobileVO
    properties = ["vin", "sold"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "first_name", "last_name", "employee_id"]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "is_VIP", "date_time", "reason", "status", "vin", "customer", "technician"]
    encoder= {
        "technician": TechnicianListEncoder(),
    
    }
    def get_extra_data(self, o):
        return {
            "technician": {
                "first_name": o.technician.first_name,
                "last_name": o.technician.last_name,
                }
            }