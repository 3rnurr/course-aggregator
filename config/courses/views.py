from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from .models import Course, Category
from .serializers import CourseSerializer


class CoursePagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50


class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = CoursePagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'category__name']
    ordering_fields = ['title', 'rating', 'created_at']
    ordering = ['-created_at']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)