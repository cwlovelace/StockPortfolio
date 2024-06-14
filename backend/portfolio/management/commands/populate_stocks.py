# backend/portfolio/management/commands/populate_stocks.py

from django.core.management.base import BaseCommand
from portfolio.models import Stock
import yfinance as yf

class Command(BaseCommand):
    help = 'Populate the database with stock information'

    def handle(self, *args, **options):
        stocks = [
            "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", 
            "FB", "NVDA", "BRK-B", "JPM", "JNJ"
        ]

        for symbol in stocks:
            try:
                stock_info = yf.Ticker(symbol).info
                name = stock_info.get('shortName', 'N/A')
                price = stock_info.get('regularMarketPrice', 0.0)

                # If the market is closed and regularMarketPrice is not available, use the previous close
                if not price or price == 0.0:
                    price = stock_info.get('previousClose', 0.0)

                stock, created = Stock.objects.update_or_create(
                    symbol=symbol,
                    defaults={'name': name, 'price': price}
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(f'Successfully created stock: {name} ({symbol})'))
                else:
                    self.stdout.write(self.style.SUCCESS(f'Successfully updated stock: {name} ({symbol})'))

            except KeyError as e:
                self.stderr.write(f"Error fetching data for {symbol}: {e}")
            except Exception as e:
                self.stderr.write(f"An error occurred for {symbol}: {e}")

