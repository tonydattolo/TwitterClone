from django.db import models
from django.db.models.deletion import CASCADE
from pages.models import Pages
from profiles.models import Profile
import uuid
from django.utils import timezone
from datetime import datetime


# Create your models here.

class Events(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    eventName = models.CharField(max_length=40, blank=False)
    authorPage = models.ForeignKey(Pages, on_delete=CASCADE)
    eventDescription = models.CharField(max_length=200,blank=True)
    location = models.CharField(max_length=50, blank=False)
    eventDate = models.DateField(blank=False)
    eventTime = models.TimeField(blank=False)
    created_at = models.DateTimeField(default=timezone.now)
    
class Notifications(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userID = models.ForeignKey(Profile, on_delete=CASCADE, db_column="userID")
    eventName = models.CharField(max_length=40, blank=False, db_column="eventName")
    pageName = models.ForeignKey(Pages, on_delete=CASCADE, db_column="pageName")
    created_at = models.DateTimeField(default=timezone.now)
    



