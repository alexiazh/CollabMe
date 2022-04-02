from django.db import models

class Task(models.Model):
  title = models.CharField(max_length=200)
  subtask = models.CharField(max_length=200, null=True, blank=True)
  member = models.CharField(max_length=100, null=True, blank=True)
  email = models.EmailField(max_length=100, null=True, blank=True)
  description = models.TextField(null=True, blank=True)
  assigned = models.BooleanField(default=False)
  completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title