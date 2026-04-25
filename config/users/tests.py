from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpass123"
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, "testuser")
        self.assertEqual(self.user.email, "test@example.com")

    def test_user_role_default(self):
        self.assertEqual(self.user.role, "user")

    def test_user_str(self):
        self.assertEqual(str(self.user), "testuser")


class UserRegistrationTest(APITestCase):
    def test_register_user(self):
        url = reverse('register')
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpass123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)


class UserLoginTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpass123"
        )

    def test_login_user(self):
        url = reverse('token_obtain_pair')
        data = {
            "username": "testuser",
            "password": "testpass123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
