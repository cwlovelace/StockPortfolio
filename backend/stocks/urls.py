# backend/stocks/urls.py

from django.urls import path
from .views import StockList, test_stocks

urlpatterns = [
    path('stocks/', StockList.as_view(), name='stock-list'),
    path('test_stocks/', test_stocks, name='test-stocks'),
]



