FROM python:3.11

WORKDIR /app/config

COPY . .

RUN pip install -r requirements.txt

CMD ["gunicorn", "config.config.wsgi:application", "--bind", "0.0.0.0:8000"]
