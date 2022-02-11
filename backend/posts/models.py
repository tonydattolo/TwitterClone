from django.db import models
import uuid
from django.utils import timezone
from django.db.models.deletion import CASCADE
from profiles.models import Profile


# Create your models here.

class Posts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # on_delete=CASCADE --> This will delete data from all this table when the user is deleted
    postAuthor = models.ForeignKey(Profile, on_delete=CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    postText = models.CharField(max_length=140, blank=False)
    # postImage = models.ImageField(upload_to='posts/', blank=True)
    postComments = models.ManyToManyField(
        Profile, related_name='comments', blank=True)
    postReposts = models.ManyToManyField(
        Profile, related_name='retweets', blank=True)
    postLikes = models.ManyToManyField(
        Profile, related_name='likes', blank=True)


class PostLikes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(Profile, on_delete=CASCADE)
    post_identifier = models.ForeignKey(Posts, on_delete=CASCADE)
