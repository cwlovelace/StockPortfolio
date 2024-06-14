# backend/portfolio/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('portfolios/', views.PortfolioListCreate.as_view(), name='portfolio-list-create'),
    path('portfolios/<int:pk>/', views.PortfolioDetailUpdateDelete.as_view(), name='portfolio-detail-update-delete'),
]

