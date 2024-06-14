## backend/portfolio/admin.py

from django.contrib import admin
from .models import Portfolio, Stock, PortfolioStock

class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user')

class StockAdmin(admin.ModelAdmin):
    list_display = ('id', 'symbol', 'name', 'price')

class PortfolioStockAdmin(admin.ModelAdmin):
    list_display = ('id', 'portfolio', 'stock', 'quantity')

admin.site.register(Portfolio, PortfolioAdmin)
admin.site.register(Stock, StockAdmin)
admin.site.register(PortfolioStock, PortfolioStockAdmin)


