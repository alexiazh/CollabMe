from schedule.models import Events
from rest_framework import viewsets, permissions
from .serializers import EventsSerializer

class EventsViewSet(viewsets.ModelViewSet):
  queryset = Events.objects.all()
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = EventsSerializer

  # def get_queryset(self):
  #   return self.request.user.user.all()
  
  # def perform_create(self, serializer):
  #   serializer.save(owner=self.request.user) 