from django.db.models import fields
from .models import Followers, Pages
from rest_framework import serializers

class PagesSerialzer(serializers.ModelSerializer):
    ownerEmail = serializers.ReadOnlyField(source='pageAuthor.email')
    ownerUsername = serializers.ReadOnlyField(source='pageAuthor.display_name')
    class Meta:
        model = Pages
        # fields = '__all__'
        fields = ['pageName', 'pageAuthor','pageDescription', 'pageEmail',
                  'ownerEmail', 'ownerUsername', # custom defined serializers
                #   'pageImage', 'pageUrl', #not implemented yet
                  ]

class FollowersSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Followers
        fields = '__all__'
