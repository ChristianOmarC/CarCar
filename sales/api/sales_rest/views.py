from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Salesperson, Customer, Sale, AutomobileVO
from .encoders import (
  SalespersonEncoder,
  CustomerEncoder,
  SaleEncoder,
  AutomobileVOEncoder,
)
import json

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_salespeople(request):
  if request.method == "GET":
    salespeople = Salesperson.objects.all()
    return JsonResponse(
      {"salespeople": salespeople},
      encoder=SalespersonEncoder,
    )
  else:
    try:
      content = json.loads(request.body)
      first_name = content["first_name"]
      last_name = content["last_name"]
      employee_id = content["employee_id"]
      salesperson = Salesperson.objects.create(first_name=first_name, last_name=last_name, employee_id=employee_id)
      salesperson = Salesperson.objects.create(**content)
      return JsonResponse(
        salesperson,
        encoder=SalespersonEncoder,
        safe=False
      )
    except:
      response = JsonResponse({"message": "Does not exist"})
      response.status_code = 400
      return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_salesperson(request, pk):
  if request.method == "GET":
    try:
      salesperson = Salesperson.objects.get(id=pk)
      return JsonResponse(
        salesperson,
        encoder=SalespersonEncoder,
        safe=False
      )
    except Salesperson.DoesNotExist:
      response = JsonResponse({"message": "Does not exist"})
      response.status_code = 404
      return response
  elif request.method == "DELETE":
    try:
      salesperson = Salesperson.objects.get(id=pk)
      salesperson.delete()
      return JsonResponse(
        salesperson,
        encoder=SalespersonEncoder,
        safe=False,
      )
    except Salesperson.DoesNotExist:
      return JsonResponse({"message": "Does not exist"})
  else:
    try:
      content = json.loads(request.body)
      salesperson = Salesperson.objects.get(id=pk)
      props = ["first_name", "last_name", "employee_id"]
      for prop in props:
        if prop in content:
          setattr(salesperson, prop, content[prop])
      salesperson.save()
      return JsonResponse(
        salesperson,
        encoder=SalespersonEncoder,
        safe=False,
      )
    except Salesperson.DoesNotExist:
      response = JsonResponse({"message": "Does not exist"})
      response.status_code = 404
      return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
  if request.method == "GET":
    customers = Customer.objects.all()
    return JsonResponse(
      {"customers": customers},
      encoder=CustomerEncoder,
    )
  else:
    content = json.loads(request.body)
    try:
      customer = Customer.objects.create(**content)
      return JsonResponse(
        customer,
        encoder=CustomerEncoder,
        safe=False
      )
    except Customer.DoesNotExist:
      return JsonResponse({"message": "Does not exist"}, status=400)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_customer(request, pk):
  if request.method == "GET":
    try:
      customer = Customer.objects.get(id=pk)
      return JsonResponse(
        customer,
        encoder=CustomerEncoder,
        safe=False
      )
    except Customer.DoesNotExist:
      response = JsonResponse({"message": "Does not exist"})
      response.status_code = 404
      return response
  elif request.method == "DELETE":
      count, _ = Customer.objects.filter(id=pk).delete()
      return JsonResponse({"deleted": count > 0})
  else:

    try:
      content = json.loads(request.body)
      customer = Customer.objects.get(id=pk)
      props = ["name", "address", "phone_number"]
      for prop in props:
        if prop in content:
          setattr(customer, prop, content[prop])
      customer.save()
      return JsonResponse(
        customer,
        encoder=CustomerEncoder,
        safe=False
      )
    except Customer.DoesNotExist:
      response = JsonResponse({"message": "Does not exist"})
      response.status_code = 404
      return response

@require_http_methods(["GET", "POST"])
def api_sales(request):
  if request.method == "GET":
    sales = Sale.objects.all()
    return JsonResponse(
      {"sales": sales},
      encoder=SaleEncoder,
    )
  else:
    content = json.loads(request.body)
    try:
      sales = Sale.objects.create(**content)
      return JsonResponse(
        sales,
        encoder=SaleEncoder,
        safe=False
      )
    except Customer.DoesNotExist:
      return JsonResponse({"message": "Does not exist"}, status=400)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_sale(request, pk):
  if request.method == "GET":
    try:
      sale = Sale.objects.get(id=pk)
      return JsonResponse(
        sale,
        encoder=SaleEncoder,
        safe=False
      )
    except Sale.DoesNotExist:
      response = JsonResponse({"message": "Does not exist"})
      response.status_code = 404
      return response
  elif request.method == "DELETE":
    try:
      sale = Sale.objects.get(id=pk)
      sale.delete()
      return JsonResponse(
        sale,
        encoder=SaleEncoder,
        safe=False,
      )
    except Sale.DoesNotExist:
      return JsonResponse({"message": "Does not exist"})
  else:
      try:
        content = json.loads(request.body)
        sale = Sale.objects.get(id=pk)
        props = ["salesperson", "customer", "automobile", "price"]
        for prop in props:
          if prop in content:
            setattr(sale, prop, content[prop])
        sale.save()
        return JsonResponse(
          sale,
          encoder=SaleEncoder,
          safe=False,
        )
      except Sale.DoesNotExist:
        response = JsonResponse({"message": "Does not exist"})
        response.status_code = 404
        return response


@require_http_methods(["GET", "POST"])
def api_automobiles(request, pk):
  if request.method == "GET":
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
      {"automobiles": automobiles},
      encoder=AutomobileVOEncoder,
    )
  else:
    try:
      content = json.loads(request.body)
      vin = AutomobileVO.objects.get(vin=vin)
      sold = Sale.objects.filter(id=pk)
      content["sold"] = sold
      automobile = AutomobileVO.objects.create(**content)
      return JsonResponse(
        automobile,
        encoder=AutomobileVOEncoder,
        safe=False
      )
    except:
      response = JsonResponse({"message": "Does not exist"})
      response.status_code = 400
      return response

@require_http_methods(["GET", "POST"])
def api_salesperson_history(request, pk):
  if request.method == "GET":
    salesperson_history = Salesperson.objects.get(id=pk).salesperson_history.all()
