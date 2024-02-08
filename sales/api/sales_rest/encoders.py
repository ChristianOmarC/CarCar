from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO


class SalespersonEncoder(ModelEncoder):
  model = Salesperson
  properties = [
    "id",
    "name",
  ]

class CustomerEncoder(ModelEncoder):
  model = Customer
  properties = [
    "id",
    "name",
    "address",
    "phone_number",
  ]


class SaleEncoder(ModelEncoder):
  model = Sale
  properties =  [
    "id",
    "price",
    "automobile",
  ]
  encoders = {
    "salesperson": SalespersonEncoder(),
    "customer": CustomerEncoder(),
  }

class AutomobileVO(ModelEncoder):
  model = AutomobileVO
  properties = [
    "vin",
    "sold",
  ]
