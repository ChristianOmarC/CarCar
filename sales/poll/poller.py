import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin=automobile["vin"],
            defaults={"sold":automobile["sold"]},
        )

def poll():
    while True:
        print('Sale poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(20)
# remember to change this back 60 before submission!

if __name__ == "__main__":
    poll()
