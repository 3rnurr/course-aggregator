from django.db import models
from django.conf import settings
from courses.models import Course

User = settings.AUTH_USER_MODEL

class Enrollment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)