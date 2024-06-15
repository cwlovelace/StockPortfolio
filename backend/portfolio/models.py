# backend/portfolio/models.py

from django.db import models
from django.contrib.auth.models import User

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100, null=True)
    price = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.name} ({self.symbol})"

class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='portfolios')
    name = models.CharField(max_length=255)
    stocks = models.ManyToManyField(Stock, through='PortfolioStock')
    # created_at = models.DateTimeField(auto_now_add=True) <-- removed due to time constraints

    def __str__(self):
        return f"Portfolio of {self.user.username} - {self.name}"

class PortfolioStock(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    class Meta:
        unique_together = ('portfolio', 'stock')


