from rest_framework import viewsets
from core import models, serializers
from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserModelSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = models.Material.objects.all()
    serializer_class = serializers.MaterialModelSerializer

class StageViewSet(viewsets.ModelViewSet):
    queryset = models.Stage.objects.all()
    serializer_class = serializers.StageModelSerializer  # Corrigido

class TraceabilityViewSet(viewsets.ModelViewSet):
    queryset = models.Traceability.objects.all()
    serializer_class = serializers.TraceabilityModelSerializer

