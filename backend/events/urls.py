from django.urls import path

from .views import CreateEventView, DeleteNotifications, GetEventNofiticationsByUser, UpdateEventsView, DeleteEventView,GetEventDetails, GetEventDetailsByAuthorPage, PostEventNotification, UpdateNotification, DeleteNotifications

urlpatterns = [

    path('create/',CreateEventView.as_view(),name='create-event'),
    path('<str:eventName>/update/',UpdateEventsView.as_view(),name='update-event'),
    path('<str:eventName>/delete/',DeleteEventView.as_view(),name='delete-event'),
    path('<str:eventName>/',GetEventDetails.as_view(),name='get-event-details'),
    path('<str:authorPage>/getall/',GetEventDetailsByAuthorPage.as_view(),name='get-event-details-by-authorPage'),

    #Notifications
    path('notifications/create/',PostEventNotification.as_view(),name='event-notification'),
    path('notifications/<int:pk>/get/',GetEventNofiticationsByUser.as_view(),name='get-event-notification'),
    path('notifications/<str:eventName>/update/',UpdateNotification.as_view(),name='update-event-notification'),
    path('notifications/<str:eventName>/delete/',DeleteNotifications.as_view(),name='delete-event-notification'),
]
