from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import RegisterSerializer, UserProfileSerializer, UserUpdateSerializer
from courses.models import Course


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserProfileSerializer
        return UserUpdateSerializer

    def get_object(self):
        return self.request.user


class AddFavoriteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        course_id = request.data.get('course_id')
        try:
            course = Course.objects.get(id=course_id)
            user = request.user
            user.favorites.add(course)
            return Response({"status": "added to favorites"}, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)


class RemoveFavoriteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        course_id = request.data.get('course_id')
        try:
            course = Course.objects.get(id=course_id)
            user = request.user
            user.favorites.remove(course)
            return Response({"status": "removed from favorites"}, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)