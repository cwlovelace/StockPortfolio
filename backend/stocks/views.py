# backend/stocks/views.py

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Stock
from .serializers import StockSerializer, StockListSerializer
import logging

logger = logging.getLogger(__name__)

class StockList(generics.ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        stocks = Stock.objects.all()
        logger.debug(f"Stocks from DB in StockList: {stocks}")
        data = {'stocks': stocks}
        serializer = StockListSerializer(data)
        logger.debug(f"Serialized response in StockList: {serializer.data}")
        return Response(serializer.data)

@api_view(['GET']) # used decorators to troubleshoot StockList not working with serializer. Gave up.
def test_stocks(request):
    stocks = Stock.objects.all()
    logger.debug(f"Stocks from DB in test_stocks: {stocks}")
    data = {'stocks': stocks}
    serializer = StockListSerializer(data)
    logger.debug(f"Serialized response in test_stocks: {serializer.data}")
    return Response(serializer.data)
