from django.contrib import admin

from .models import Events, Notifications

# Register your models here.
class EventsAdmin(admin.ModelAdmin):
    list_display = ('id', 'eventName', 'authorPage', 'eventDescription', 'location','eventDate','eventTime','created_at')
    # list_filter = ('postAuthor',)
    # search_fields = ('title', 'postAuthor__email')

admin.site.register(Events, EventsAdmin)

class NotificationsAdmin(admin.ModelAdmin):
    list_display = ('id','userID','eventName','pageName')

admin.site.register(Notifications, NotificationsAdmin)