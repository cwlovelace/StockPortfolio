from django.contrib import admin
from .models import Portfolio, Stock, PortfolioStock

# Register your models here.
admin.site.register(Portfolio)
admin.site.register(Stock)
admin.site.register(PortfolioStock)

