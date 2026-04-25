FROM python:3.11

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

WORKDIR /app/backend

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:8000"]
