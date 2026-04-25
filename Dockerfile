
WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

<<<<<<< HEAD
WORKDIR /app/config

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:8000"]
=======
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
>>>>>>> 9232b5d0 (fix: update Dockerfile and requirements.txt)
FROM python:3.11

WORKDIR /app

COPY . .

# Install production dependencies
RUN pip install -r requirements.txt && pip install -r config/requirements-prod.txt

# Copy .env if present
COPY .env .env

WORKDIR /app/config

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:8000"]
