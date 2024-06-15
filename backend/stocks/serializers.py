# backend/stocks/serializers.py

from rest_framework import serializers
from .models import Stock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'symbol', 'name', 'price']

class StockListSerializer(serializers.Serializer):
    stocks = StockSerializer(many=True)