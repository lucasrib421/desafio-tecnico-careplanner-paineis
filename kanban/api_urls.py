# kanban/api_urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import BucketViewSet, CardViewSet

router = DefaultRouter()
router.register(r'buckets', BucketViewSet)
router.register(r'cards', CardViewSet)

urlpatterns = router.urls
