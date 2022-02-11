from django.urls import path

from .views import (
    GetConversationListView,
    GetConversationDetailView,
    # GetOrCreateConversationView,
    CreateConversationView,
    SendNewMessageView
)


urlpatterns = [
    path('', GetConversationListView.as_view()),
    path('create/', CreateConversationView.as_view()),
    path('direct/<str:displayName>/', GetConversationDetailView.as_view()),
    path('send/', SendNewMessageView.as_view()),
]
