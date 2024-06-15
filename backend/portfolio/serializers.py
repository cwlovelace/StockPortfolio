# backend/portfolio/serializers.py

from rest_framework import serializers
from .models import Portfolio, Stock, PortfolioStock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'symbol', 'name', 'price']

class PortfolioStockSerializer(serializers.ModelSerializer):
    stock = StockSerializer(read_only=True)
    stock_symbol = serializers.CharField(write_only=True)

    class Meta:
        model = PortfolioStock
        fields = ['id', 'stock_symbol', 'quantity', 'stock']

    def create(self, validated_data):
        stock_symbol = validated_data.pop('stock_symbol')
        stock = Stock.objects.get(symbol=stock_symbol)
        portfolio_stock = PortfolioStock.objects.create(stock=stock, **validated_data)
        return portfolio_stock

    def update(self, instance, validated_data):
        if 'stock_symbol' in validated_data:
            stock_symbol = validated_data.pop('stock_symbol')
            stock = Stock.objects.get(symbol=stock_symbol)
            instance.stock = stock
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance

class PortfolioSerializer(serializers.ModelSerializer):
    stocks = PortfolioStockSerializer(source='portfoliostock_set', many=True, required=False)

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'stocks']

