# backend/stocks/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.StockList.as_view(), name='stock-list'),
]


