from django.contrib import admin
from .models import Conversation, Message

# Register your models here.

# Django admin registration for the Conversation model and message model
admin.site.register(Conversation)
admin.site.register(Message)
