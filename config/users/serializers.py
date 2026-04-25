from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    favorites = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "role", "favorites")
        read_only_fields = ("id", "role")
    
    def get_favorites(self, obj):
        from courses.serializers import CourseSerializer
        return CourseSerializer(obj.favorites.all(), many=True).data


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "first_name", "last_name")