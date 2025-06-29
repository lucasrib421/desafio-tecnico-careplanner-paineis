from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('kanban.api_urls')),  # só a API aqui
    path('', include('kanban.urls')),  
]
