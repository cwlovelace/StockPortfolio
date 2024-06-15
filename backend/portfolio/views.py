# backend/portfolio/views.py

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

        stock_symbol = serializer.validated_data.get('stock_symbol')
        try:
            stock = Stock.objects.get(symbol=stock_symbol)
        except Stock.DoesNotExist:
            return Response({'error': 'Stock not found.'}, status=404)

        quantity = serializer.validated_data.get('quantity')

        portfolio_stock = PortfolioStock.objects.create(portfolio=portfolio, stock=stock, quantity=quantity)
        return Response(PortfolioStockSerializer(portfolio_stock).data, status=201)

class PortfolioStockUpdate(generics.UpdateAPIView):
    serializer_class = PortfolioStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioStock.objects.filter(portfolio__user=self.request.user)

    def update(self, request, *args, **kwargs):
        print(f"Request data: {request.data}")  # Debugging statement
        print(f"URL kwargs: {kwargs}")  # Debugging statement
        
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        stock_symbol = request.data.get('stock_symbol', instance.stock.symbol)
        quantity = request.data.get('quantity', instance.quantity)

        try:
            stock = Stock.objects.get(symbol=stock_symbol)
        except Stock.DoesNotExist:
            return Response({'error': 'Stock not found.'}, status=404)

        data = {'stock_symbol': stock_symbol, 'quantity': quantity}
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class PortfolioStockDelete(generics.DestroyAPIView):
    serializer_class = PortfolioStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioStock.objects.filter(portfolio__user=self.request.user)







