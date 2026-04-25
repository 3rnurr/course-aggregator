from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Course, Category
from django.contrib.auth import get_user_model

User = get_user_model()


class CourseModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Python")
        self.course = Course.objects.create(
            title="Test Course",
            description="Test Description",
            platform="Test Platform",
            url="https://example.com",
            category=self.category,
            rating=4.5
        )

    def test_course_creation(self):
        self.assertEqual(self.course.title, "Test Course")
        self.assertEqual(self.course.rating, 4.5)

    def test_course_str(self):
        self.assertEqual(str(self.course), "Test Course")


class CourseAPITest(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Python")
        self.course = Course.objects.create(
            title="Test Course",
            description="Test Description",
            platform="Test Platform",
            url="https://example.com",
            category=self.category,
            rating=4.5
        )

    def test_list_courses(self):
        url = reverse('course-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_course(self):
        url = reverse('course-list')
        data = {
            "title": "New Course",
            "description": "New Description",
            "platform": "New Platform",
            "url": "https://new-example.com",
            "category": self.category.id,
            "rating": 4.0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_search_courses(self):
        url = f"{reverse('course-list')}?search=Test"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_order_courses(self):
        url = f"{reverse('course-list')}?ordering=-rating"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
