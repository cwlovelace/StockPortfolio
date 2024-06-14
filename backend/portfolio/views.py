## backend/portfolio/views.py

from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Portfolio, PortfolioStock, Stock
from .serializers import PortfolioSerializer, PortfolioStockSerializer, StockSerializer

class PortfolioListCreate(generics.ListCreateAPIView):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PortfolioDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user)

class PortfolioStockCreate(generics.CreateAPIView):
    serializer_class = PortfolioStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        portfolio_id = self.kwargs['portfolio_id']
        try:
            portfolio = Portfolio.objects.get(id=portfolio_id, user=self.request.user)
        except Portfolio.DoesNotExist:
            return Response({'error': 'Portfolio not found or does not belong to you.'}, status=404)
        
        stock_id = serializer.validated_data.get('stock_id')  # Changed 'stock' to 'stock_id'
        try:
            stock = Stock.objects.get(id=stock_id.id)  # Added '.id'
        except Stock.DoesNotExist:
            return Response({'error': 'Stock not found.'}, status=404)
        
        quantity = serializer.validated_data.get('quantity')
        
        PortfolioStock.objects.create(portfolio=portfolio, stock=stock, quantity=quantity)
        return Response({'status': 'stock added'}, status=201)  # Added response

class PortfolioStockUpdate(generics.UpdateAPIView):
    serializer_class = PortfolioStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioStock.objects.filter(portfolio__user=self.request.user)

class PortfolioStockDelete(generics.DestroyAPIView):
    serializer_class = PortfolioStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioStock.objects.filter(portfolio__user=self.request.user)

