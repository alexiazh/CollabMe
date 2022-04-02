from rest_framework import routers
from .api import EventsViewSet

router = routers.DefaultRouter()
router.register('api/events', EventsViewSet, 'events')

urlpatterns = router.urls