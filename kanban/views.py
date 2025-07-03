from rest_framework import viewsets
from .models import Bucket, Card
from .serializers import BucketSerializer, CardSerializer
#from rest_framework.permissions import AllowAny
# Usar como camada de segurança para alterações apenas com usuário
from rest_framework.permissions import IsAuthenticated


class BucketViewSet(viewsets.ModelViewSet):
    queryset = Bucket.objects.all()
    serializer_class = BucketSerializer
    #permission_classes = [AllowAny] 
    # Usar como camada de segurança para alterações apenas com usuário
    permission_classes = [IsAuthenticated]

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    #permission_classes = [AllowAny]  
    # Usar como camada de segurança para alterações apenas com usuário
    permission_classes = [IsAuthenticated]

from django.shortcuts import render

def index(request):
    return render(request, 'kanban/index.html')
