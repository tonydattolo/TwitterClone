from django.contrib import admin
from .models import Posts, PostLikes

# Register your models here.

class PostsAdmin(admin.ModelAdmin):
    list_display = ('id', 'postAuthor', 'created_at', 'updated_at')
    list_filter = ('postAuthor',)
    search_fields = ('title', 'postAuthor__email')

admin.site.register(Posts, PostsAdmin)

