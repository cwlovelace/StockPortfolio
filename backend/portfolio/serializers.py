# portfolio/serializers.py

from rest_framework import serializers
from .models import Portfolio, Stock, PortfolioStock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class PortfolioStockSerializer(serializers.ModelSerializer):
    stock = StockSerializer()

    class Meta:
        model = PortfolioStock
        fields = ['stock', 'quantity']

class PortfolioSerializer(serializers.ModelSerializer):
    stocks = PortfolioStockSerializer(source='portfoliostock_set', many=True)

    class Meta:
        model = Portfolio
        fields = '__all__'
