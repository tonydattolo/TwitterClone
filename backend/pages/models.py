
from django.db import models
from django.db.models.deletion import CASCADE
from profiles.models import Profile
from django.conf import settings
import uuid
from django.utils import timezone
# Create your models here.
from django.contrib.auth import get_user_model

USER = get_user_model()


class Pages(models.Model):

    pageName = models.CharField(primary_key=True, max_length=20)
    pageEmail = models.EmailField()
    # pageAuthor = models.ForeignKey(USER, on_delete=CASCADE)
    pageAuthor = models.CharField(USER, blank=True, null=True, max_length=255)
    pageDescription = models.TextField(max_length=200,blank=True,null=True)
    created_at = models.DateTimeField(default=timezone.now)


class Followers(models.Model):
    identifier = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    pageName = models.ForeignKey(Pages,on_delete=CASCADE,db_column='pageName')
    user_id = models.ForeignKey(Profile,on_delete=CASCADE,db_column='user_id')
    user_email = models.CharField(max_length=255,blank=True, null=True)





