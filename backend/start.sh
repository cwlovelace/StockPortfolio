#!/bin/bash

# Run migrations
python manage.py migrate

# Create a superuser if it doesn't exist
if [ ! -z "$DJANGO_SUPERUSER_USERNAME" ] && [ ! -z "$DJANGO_SUPERUSER_EMAIL" ] && [ ! -z "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creating superuser..."
    python manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL || true
fi

# Run the populate_stocks command
python manage.py populate_stocks

# Start the server
python manage.py runserver 0.0.0.0:8000

