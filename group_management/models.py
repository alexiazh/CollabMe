from django.db import models

class Group(models.Model):
  username = models.CharField(max_length=100)
  first_name = models.CharField(max_length=100, null=True, blank=True)
  last_name = models.CharField(max_length=100, null=True, blank=True)
  email = models.EmailField(max_length=100, null=True, blank=True)
  contact = models.TextField(null=True, blank=True)
  task = models.CharField(max_length=200, null=True, blank=True)
  notes = models.TextField(null=True, blank=True)
  progress = models.CharField(max_length=100, null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)