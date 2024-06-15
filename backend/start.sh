#!/bin/bash

# Migrate the pythons like the geese
python manage.py migrate

# Create a superuser - didn't like setting one up each time I did docker-compose up.
if [ ! -z "$DJANGO_SUPERUSER_USERNAME" ] && [ ! -z "$DJANGO_SUPERUSER_EMAIL" ] && [ ! -z "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creating superuser..."
    python manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL || true
fi

# Populate the stocks
python manage.py populate_stocks

# Start the server
python manage.py runserver 0.0.0.0:8000

