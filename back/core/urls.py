from rest_framework.routers import DefaultRouter
from core import viewsets

router = DefaultRouter()

router.register('users', viewsets.UserViewSet)
router.register('material', viewsets.MaterialViewSet)
router.register('stage', viewsets.StageViewSet)
router.register('traceability', viewsets.TraceabilityViewSet)

urlpatterns = router.urls
