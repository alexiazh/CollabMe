from rest_framework import routers
from .api import GroupViewSet

router = routers.DefaultRouter()
router.register('api/group', GroupViewSet, 'group')

urlpatterns = router.urls