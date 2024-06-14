# backend/stocks/views.py

from rest_framework import generics
from .models import Stock
from .serializers import StockSerializer

class StockList(generics.ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


