
from django.db.models import fields
from .models import Events, Notifications
from rest_framework import serializers

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notifications
        fields = '__all__'

