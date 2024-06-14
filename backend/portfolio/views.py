# portfolio/views.py
from django.shortcuts import render
from rest_framework import generics, permissions
from .serializers import PortfolioSerializer, StockSerializer
from .models import Portfolio, PortfolioStock, Stock

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

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
