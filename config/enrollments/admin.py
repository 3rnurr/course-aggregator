from django.contrib import admin
from .models import Enrollment

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'created_at')
    list_filter = ('created_at', 'course')
    search_fields = ('user__username', 'course__title')
