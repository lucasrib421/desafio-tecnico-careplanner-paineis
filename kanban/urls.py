from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BucketViewSet, CardViewSet, index  

router = DefaultRouter()
router.register(r'buckets', BucketViewSet)
router.register(r'cards', CardViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)), # Modificação da versão anterior
]
