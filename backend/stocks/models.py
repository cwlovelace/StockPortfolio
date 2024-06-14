# backend/stocks/models.py

from django.db import models

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100, null=True)
    price = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.name} ({self.symbol})"

