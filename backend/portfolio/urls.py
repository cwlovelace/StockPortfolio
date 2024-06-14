from django.urls import path
from rest_framework import generics
from . import views

urlpatterns = [
    path('portfolios/', views.PortfolioListCreate.as_view(), name='portfolio-list-create'),
    path('portfolios/<int:pk>/', views.PortfolioDetailUpdateDelete.as_view(), name='portfolio-detail-update-delete'),
    path('portfolios/<int:portfolio_id>/add_stock/', views.PortfolioStockCreate.as_view(), name='portfolio-add-stock'),
    path('portfolios/<int:portfolio_id>/update_stock/<int:pk>/', views.PortfolioStockUpdate.as_view(), name='portfolio-update-stock'),
    path('portfolios/<int:portfolio_id>/delete_stock/<int:pk>/', views.PortfolioStockDelete.as_view(), name='portfolio-delete-stock'),
]
