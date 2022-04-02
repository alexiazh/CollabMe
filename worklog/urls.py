from rest_framework import routers
from .api import WorklogViewSet

router = routers.DefaultRouter()
router.register('api/worklog', WorklogViewSet, 'worklog')

urlpatterns = router.urls