from django.urls import path

from .views import (
  api_customer,
  api_customers,
  api_sale,
  api_sales,
  api_salesperson,
  api_salespeople,
)


urlpatterns = [
  path(
    "customers/",
    api_customers,
    name="api_customers",
  ),
  path(
    "customers/<int:id>/",
    api_customer,
    name="api_customer",
  ),
  path(
    "sales/",
    api_sales,
    name="api_sales",
  ),
  path(
    "sales/<int:id>/",
    api_sale,
    name="api_sale",
  ),
  path(
    "salespeople/:<int:id>/",
    api_salesperson,
    name="api_salesperson",
  ),
  path(
    "salespeople/",
    api_salespeople,
    name="api_salespeople",
  ),
]
