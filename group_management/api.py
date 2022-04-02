from group_management.models import Group
from rest_framework import viewsets, permissions
from .serializers import GroupSerializer

class GroupViewSet(viewsets.ModelViewSet):
  queryset = Group.objects.all()
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = GroupSerializer