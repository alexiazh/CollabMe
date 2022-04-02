from rest_framework import serializers
from worklog.models import Worklog

class WorklogSerializer(serializers.ModelSerializer):
  class Meta:
    model = Worklog
    fields = '__all__'