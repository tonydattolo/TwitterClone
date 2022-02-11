from rest_framework import serializers

from .models import Message, Conversation


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source='sender.email')
    receiver = serializers.CharField(source='receiver.email')
    class Meta:
        model = Message
        fields = ('id', 'sender', 'receiver', 'message', 'created_at')
        # fields = ('id', 'message', 'user', 'created_at')
        read_only_fields = ('id', 'created_at')
        # extra_kwargs = {
        #     'user': {'write_only': True}
        # }
        
class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    user1 = serializers.CharField(source='user1.email')
    user2 = serializers.CharField(source='user2.email')
    
    # grab user1 and user2 display_name from the Profile model associated with the user
    user1_display_name = serializers.CharField(source='user1.profile.display_name')
    user2_display_name = serializers.CharField(source='user2.profile.display_name')
    
    class Meta:
        model = Conversation
        # fields = '__all__'
        fields = ('id', 'user1', 'user2', 'messages', 'user1_display_name', 'user2_display_name')