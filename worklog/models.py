from django.db import models

class Worklog(models.Model):
  username = models.CharField(max_length=100)
  email = models.EmailField(max_length=100, null=True, blank=True)
  contact = models.TextField(null=True, blank=True)
  title = models.CharField(max_length=200, null=True, blank=True)
  task = models.CharField(max_length=200, null=True, blank=True)
  notes = models.TextField(null=True, blank=True)
  progress = models.CharField(max_length=100, null=True, blank=True)
  completed = models.BooleanField(default=False)
  start = models.DateTimeField(null=True, blank=True)
  end = models.DateTimeField(null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)