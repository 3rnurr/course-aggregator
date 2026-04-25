from django.urls import path
from .views import RegisterView, UserProfileView, AddFavoriteView, RemoveFavoriteView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    path("profile/", UserProfileView.as_view()),
    path("favorites/add/", AddFavoriteView.as_view()),
    path("favorites/remove/", RemoveFavoriteView.as_view()),
]