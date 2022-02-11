from django.db import models
from django.contrib.auth import get_user_model

from profiles.models import Profile
USER = get_user_model()



# Create your models here.
class Conversation(models.Model):
    """
    Model for conversations between two users that hold messages
    """
    user1 = models.ForeignKey(USER, related_name="user1", on_delete=models.CASCADE)
    user2 = models.ForeignKey(USER, related_name="user2", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # maybe deprecated?
        # unique_together = (("user1", "user2"),)
        constraints = [
            # https://stackoverflow.com/questions/2201598/how-to-define-two-fields-unique-as-couple
            models.UniqueConstraint(fields=['user1', 'user2'], name='unique_conversation')
        ]

    def __str__(self):
        return f"{self.user1} - {self.user2}"

    def get_messages(self):
        """
        Get all messages in a conversation
        """
        return self.message_set.all()
    
    def add_message(self, message):
        """
        Add a message to a conversation
        """
        self.message_set.create(message=message)

class Message(models.Model):
    """
    Model for messages in a conversation
    """
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.ForeignKey(USER, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(USER, related_name='receiver', on_delete=models.CASCADE)
    message = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.message