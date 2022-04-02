from rest_framework import serializers
from schedule.models import Events

class EventsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Events
    fields = '__all__'