from rest_framework import serializers
from .models import Posts


class PostsSerializer(serializers.ModelSerializer):
    postAuthorDisplayName = serializers.CharField(source='postAuthor.display_name', read_only=True)
    postAuthorEmail = serializers.CharField(source='postAuthor.user.email', read_only=True)
    class Meta:
        model = Posts
        # fields = '__all__'
        fields = (
            'id',
            'postAuthor',
            'postText',
            'created_at',
            'postAuthorDisplayName',
            'postAuthorEmail',
            'postLikes'
            )