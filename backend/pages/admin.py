from django.contrib import admin

from .models import Pages, Followers

# Register your models here.

class PagesAdmin(admin.ModelAdmin):
    list_display = ('pageName', 'pageEmail', 'pageAuthor', 'pageDescription','created_at')
    # list_filter = ('postAuthor',)
    # search_fields = ('title', 'postAuthor__email')

admin.site.register(Pages, PagesAdmin)

class FollowersAdmin(admin.ModelAdmin):
    list_display = ('identifier', 'pageName', 'user_id',"user_email")
    # list_filter = ('postAuthor',)
    # search_fields = ('title', 'postAuthor__email')

admin.site.register(Followers, FollowersAdmin)


