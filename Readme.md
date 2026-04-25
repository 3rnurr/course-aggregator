# Competence Booster - Агрегатор онлайн-курсов

Full-stack веб-приложение для агрегации и управления онлайн-курсами с полным функционалом DevOps.

---

## 📋 Мазмұны

1. [Жоба сипаттамасы](#жоба-сипаттамасы)
2. [Мүмкіндіктер](#мүмкіндіктер)
3. [Қолданылған технологиялар](#қолданылған-технологиялар)
4. [Жоба құрылымы](#жоба-құрылымы)
5. [Орнату нұсқаулықтары](#орнату-нұсқаулықтары)
6. [API Құжаттамасы](#api-құжаттамасы)
7. [Пайдаланушы нұсқаулығы](#пайдаланушы-нұсқаулығы)
8. [Docker қолдану](#docker-қолдану)
9. [CI/CD](#cicd)
10. [Тестілеу](#тестілеу)
11. [Мониторинг](#мониторинг)

---

## Жоба сипаттамасы

**Competence Booster** — бұл онлайн-курстарды біріктіретін жүйе. Пайдаланушылар тіркеліп, кіріп, курстарды көріп, іздеп, сүзгілеп, сатып ала алады.

- **Backend**: Django REST Framework
- **Frontend**: React
- **Дерекқор**: SQLite (дайын) / PostgreSQL (production)
- **Аутентификация**: JWT (SimpleJWT)

---

## Мүмкіндіктер

### Негізгі мүмкіндіктер
- ✅ Пайдаланушы аутентификациясы (тіркелу, кіру, шығу)
- ✅ Пайдаланушы рөлдері: қарапайым пайдаланушы және әкімші
- ✅ Курс басқару (CRUD)
- ✅ Категориялар
- ✅ Іздеу және сүзгілеу
- ✅ Сұрыптау және пагинация
- ✅ Админ-панель
- ✅ Адаптивті интерфейс

### DevOps мүмкіндіктер
- ✅ Docker контейнеризация
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Автоматтандырылған тестілеу
- ✅ Жүктемелік тестілеу (k6)
- ✅ Мониторинг конфигурациясы

---

## Қолданылған технологиялар

### Backend
| Технология | Сипаттама |
|------------|-----------|
| Python 3.13 | Бағдарламалау тілі |
| Django 6.0 | Веб-фреймворк |
| DRF | REST API |
| SimpleJWT | JWT токендер |
| SQLite | Дерекқор (дайын) |
| PostgreSQL | Дерекқор (production) |

### Frontend
| Технология | Сипаттама |
|------------|-----------|
| React 19 | UI фреймворк |
| Axios | HTTP клиент |
| React Router | Маршрутизация |

### DevOps
| Технология | Сипаттама |
|------------|-----------|
| Docker | Контейнеризация |
| GitHub Actions | CI/CD |
| k6 | Жүктемелік тест |

---

## Жоба құрылымы

```
competence-booster/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # CI/CD pipeline
│
├── config/                     # Django конфигурациясы
│   ├── manage.py
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── courses/               # Курс қосымшасы
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── tests.py
│   ├── users/                 # Пайдаланушы қосымшасы
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── tests.py
│   └── enrollments/           # Тіркелу қосымшасы
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Courses.js
│   │   │   └── Profile.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── CourseCard.js
│   │   └── Login.js
│   └── package.json
│
├── Dockerfile                  # Backend Docker
├── docker-compose.yml          # Docker Compose
├── requirements.txt            # Python dependencies
├── load-test.js                # k6 жүктемелік тест
├── MONITORING.md               # Мониторинг конфигурациясы
└── README.md                   # Бұл файл
```

---

## Орнату нұсқаулықтары

### 1. Жүйелік талаптар

- Python 3.13+
- Node.js 20+
- Git

### 2. Backend орнату

```bash
# 1. Репозиторийді клондау
cd d:\lab backend\competence-booster

# 2. Virtual environment құру (міндетті емес)
python -m venv venv
venv\Scripts\activate

# 3. Dependencies орнату
pip install -r requirements.txt

# 4. Миграциялар
cd config
python manage.py migrate

# 5. Сервер іске қосу
python manage.py runserver
```

### 3. Frontend орнату

```bash
# 1. Dependencies орнату
cd frontend
npm install

# 2. Сервер іске қосу
npm start
```

### 4. Docker арқылы іске қосу

```bash
# Docker Compose іске қосу
docker-compose up --build
```

---

## API Құжаттамасы

### Эндпоинттер тізімі

| Әдіс | URL | Сипаттама |
|------|-----|-----------|
| POST | `/api/register/` | Пайдаланушы тіркеу |
| POST | `/api/login/` | JWT токен алу |
| POST | `/api/token/refresh/` | Токен жаңарту |
| GET | `/api/courses/` | Курс тізімі |
| POST | `/api/courses/` | Курс құру (тек әкімші) |
| GET | `/api/courses/{id}/` | Курс мәліметтері |
| PUT | `/api/courses/{id}/` | Курс өзгерту (тек әкімші) |
| DELETE | `/api/courses/{id}/` | Курс жою (тек іздеу) |

### Параметрлер

| Параметр | Тип | Сипаттама |
|----------|-----|-----------|
| `search` | string | Іздеу сөзі |
| `ordering` | string | Сұрыптау (title, -rating, created_at) |
| `page` | int | Бет нөмірі |
| `page_size` | int | Беттегі элемент саны |

### Мысалдар

```bash
# Курс тізімі
GET /api/courses/

# Іздеу
GET /api/courses/?search=python

# Сұрыптау
GET /api/courses/?ordering=-rating

# Пагинация
GET /api/courses/?page=2&page_size=10
```

---

## Пайдаланушы нұсқаулығы

### 1. Тіркелу

1. `/register/` бетіне өтіңіз
2. Пайдаланушы аты, email, құпиясөз енгізіңіз
3. "Тіркелу" түймесін басыңыз

### 2. Кіру

1. `/login/` бетіне өтіңіз
2. Пайдаланушы аты мен құпиясөзді енгізіңіз
3. "Кіру" түймесін басыңыз
4. JWT токен сақталады

### 3. Курстарды көру

1. Негізгі беттен "Курстар" бөліміне өтіңіз
2. Іздеу, сүзгілеу, сұрыптау қолданыңыз
3. Пагинация арқылы беттер арасында ауысыңыз

### 4. Әкімші ретінде

1. `/admin/` бетіне өтіңіз
2. Django админ-панель арқылы:
   - Курс қосу/өзгерту/жою
   - Пайдаланушыларды басқару
   - Тіркелулерді көру

---

## Docker қолдану

### Dockerfile (Backend)

```dockerfile
FROM python:3.13-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY config/ ./config/
EXPOSE 8000
CMD ["python", "config/manage.py", "runserver", "0.0.0.0:8000"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: competence_booster
      POSTGRES_USER: dbuser
      POSTGRES_PASSWORD: dbpassword
    ports:
      - "5432:5432"

  backend:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

### Іске қосу

```bash
# Барлық контейнерлерді іске қосу
docker-compose up --build

# Фонда іске қосу
docker-compose up -d

# Тоқтату
docker-compose down
```

---

## CI/CD

### GitHub Actions workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.13'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: python manage.py test

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v5
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

---

## Тестілеу

### Backend тесттер

```bash
cd config
python manage.py test
```

### Frontend тесттер

```bash
cd frontend
npm test
```

### Жүктемелік тест (k6)

```bash
# k6 орнату
k6 load-test.js

# Нәтижелер
k6 run load-test.js
```

---

## Мониторинг

### Health Check

```bash
GET /api/health/
```

Жауап:
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Логирование

Django логтары `logs/app.log` файлында сақталады.

### Мониторинг құралдары

- **Prometheus** - метрикалар жинау
- **Grafana** - визуализация
- **ELK Stack** - логирование

---

## Қолдау

Сұрақтарыңыз болса, issue құрыңыз немесе email арқылы хабарласыңыз.

---

## Лицензия

MIT License

Поиск курса:

```
/api/courses/?search=python
```

Фильтрация по платформе:

```
/api/courses/?platform=Coursera
```

Сортировка:

```
/api/courses/?ordering=rating
```

---

# Функциональность интерфейса

React интерфейс позволяет:

* авторизоваться пользователю
* просматривать список курсов
* добавлять курсы
* редактировать курсы
* удалять курсы
* переходить на страницу курса

---

# Автор

Учебный проект по разработке веб-приложений.

Используемые технологии:

* Django REST Framework
* React
* JWT аутентификация
