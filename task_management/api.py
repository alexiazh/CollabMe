from task_management.models import Task
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
  queryset = Task.objects.all()
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = TaskSerializer