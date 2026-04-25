FROM python:3.11

WORKDIR /app/config

COPY . .

RUN pip install -r requirements.txt

CMD ["sh", "-c", "python config/manage.py migrate && python config/manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:8000"]
