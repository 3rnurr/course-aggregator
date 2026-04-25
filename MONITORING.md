# Competence Booster - Monitoring & Logging Configuration

## Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'django-app'
    static_configs:
      - targets: ['backend:8000']
  
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
```

## Logging Configuration

```python
# config/logging.py
import logging
import sys
from logging.handlers import RotatingFileHandler

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'logs/app.log',
            'maxBytes': 1024 * 1024 * 10,  # 10MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
```

## Health Check Endpoint

```python
# config/config/health.py
from django.http import JsonResponse
from django.views.decorators.http import require_GET

@require_GET
def health_check(request):
    return JsonResponse({
        'status': 'healthy',
        'version': '1.0.0',
    })
```

Add to urls.py:
```python
path('health/', health_check, name='health'),
```