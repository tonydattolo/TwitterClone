"""backendAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions # new
from drf_yasg.views import get_schema_view # new
from drf_yasg import openapi # new

schema_view = get_schema_view(  # new
    openapi.Info(
        title="koobecaf api",
        default_version="v1",
        description="koobecaf team13 api",
        terms_of_service="TBD",
        contact=openapi.Contact(email="team 13"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),
    # auth
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    # API GUIs/docs    
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # Profile
    path('profile/', include('profiles.urls')),
    # Posts
    path('posts/', include('posts.urls')),
    # Search
    path('search/', include('search.urls')),

    # Messages
    path('messages/', include('directmessages.urls')),
    # Pages
    path('pages/',include('pages.urls')),
    # Events
    path('events/',include('events.urls')),
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
