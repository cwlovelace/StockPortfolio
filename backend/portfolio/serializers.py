# backend/portfolio/serializers.py

from rest_framework import serializers
from .models import Portfolio, Stock, PortfolioStock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class PortfolioStockSerializer(serializers.ModelSerializer):
    stock = StockSerializer(read_only=True)
    stock_id = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all(), write_only=True)

    class Meta:
        model = PortfolioStock
        fields = ['stock_id', 'quantity', 'stock']  # Added 'stock' to fields

    def create(self, validated_data):
        stock_id = validated_data.pop('stock_id')  # Changed 'stock' to 'stock_id'
        stock = Stock.objects.get(id=stock_id.id)  # Added this line
        validated_data['stock'] = stock            # Modified this line
        return PortfolioStock.objects.create(**validated_data)

class PortfolioSerializer(serializers.ModelSerializer):
    stocks = PortfolioStockSerializer(source='portfoliostock_set', many=True, required=False)

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'stocks']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'symbol', 'name', 'price']
