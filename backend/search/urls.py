from django.urls import path
from .views import (
    SearchProfilesAndPostsView,
)

urlpatterns = [
    path('<str:searchTerm>/', SearchProfilesAndPostsView.as_view(), name='search-main')
]
