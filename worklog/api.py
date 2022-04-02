from worklog.models import Worklog
from rest_framework import viewsets, permissions
from .serializers import WorklogSerializer

class WorklogViewSet(viewsets.ModelViewSet):
  queryset = Worklog.objects.all()
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = WorklogSerializer