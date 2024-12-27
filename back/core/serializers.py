from rest_framework import serializers
from core import models

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'

class MaterialModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Material
        fields = ['name', 'type', 'expiration_date', 'serial']

class StageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stage
        fields = '__all__'

class TraceabilityModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Traceability
        fields = '__all__'