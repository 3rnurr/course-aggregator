# Агрегатор онлайн-курсов (Django + React)

Full-stack веб-приложение для агрегации и управления онлайн-курсами.

Backend реализован на **Django REST Framework**, а frontend — на **React**.
Приложение позволяет пользователям авторизоваться, просматривать курсы, добавлять новые курсы, редактировать и удалять их, а также выполнять поиск и фильтрацию.

---

# Возможности системы

* Аутентификация пользователей с помощью **JWT**
* Управление курсами (**CRUD операции**)
* Категории курсов
* Поиск курсов
* Фильтрация и сортировка
* Пагинация
* React интерфейс
* REST API

---

# Используемые технологии

## Backend

* Python
* Django
* Django REST Framework
* SQLite
* JWT (SimpleJWT)

## Frontend

* React
* Axios
* React Router

---

# Структура проекта

```text
competence-booster/
│
├── config/                # настройки Django проекта
│
├── courses/               # приложение управления курсами
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│
├── users/                 # управление пользователями
│
├── enrollments/           # записи пользователей на курсы
│
├── frontend/              # React приложение
│   └── src/
│       ├── Login.js
│       ├── Courses.js
│       ├── api.js
│
└── manage.py
```

---

# Установка и запуск

## 1. Клонирование репозитория

```bash
git clone https://github.com/your-username/course-aggregator.git
cd course-aggregator
```

---

## 2. Настройка backend

Создать виртуальное окружение:

```bash
python -m venv venv
```

Активировать:

Windows

```bash
venv\Scripts\activate
```

Установить зависимости:

```bash
pip install -r requirements.txt
```

Применить миграции:

```bash
python manage.py migrate
```

Создать администратора:

```bash
python manage.py createsuperuser
```

Запустить сервер:

```bash
python manage.py runserver
```

Backend будет доступен по адресу:

```
http://127.0.0.1:8000
```

---

## 3. Настройка frontend

Перейти в папку frontend:

```bash
cd frontend
```

Установить зависимости:

```bash
npm install
```

Запустить React приложение:

```bash
npm start
```

Frontend будет доступен по адресу:

```
http://localhost:3000
```

---

# API endpoints

## Аутентификация

Вход пользователя:

```
POST /api/users/login/
```

Ответ содержит:

* access token
* refresh token

---

## Курсы

Получить список курсов:

```
GET /api/courses/
```

Создать курс:

```
POST /api/courses/
```

Обновить курс:

```
PATCH /api/courses/{id}/
```

Удалить курс:

```
DELETE /api/courses/{id}/
```

---

# Поиск, фильтрация и сортировка

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
