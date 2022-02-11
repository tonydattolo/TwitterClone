
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions # new
from drf_yasg.views import get_schema_view # new
from drf_yasg import openapi # new

# from .views import profile_update_view
from .views import UserProfileView, UpdateUserDetails, GetAllProfiles

# from .views import profile_detail_view

urlpatterns = [
    # path('edit',profile_update_view),
    path('<str:email>', UserProfileView.as_view()),
    path('edit/<str:email>', UpdateUserDetails.as_view(), name="profile_update"),
    path('all/all/', GetAllProfiles.as_view(), name="profile_all"),
    
]
