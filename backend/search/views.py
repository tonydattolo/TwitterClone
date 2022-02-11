from django.db.models.query_utils import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from posts.models import Posts
from posts.serializers import PostsSerializer

from profiles.models import Profile
from profiles.serializer import ProfileSerializer


# Create your views here.

class SearchProfilesAndPostsView(APIView):
    '''Search for a post'''
    permission_classes = [permissions.AllowAny]

    def get(self, request, searchTerm, *args, **kwargs):
        try:
            search_term = searchTerm
            profiles = Profile.objects.filter(
                Q(user__email__icontains=search_term) | Q(locations__icontains=searchTerm) |
                Q(display_name__icontains=search_term) | Q(bio__icontains=searchTerm) | Q(
                    first_name__icontains=searchTerm) | Q(last_name__contains=searchTerm)
            )
            profilesSerializer = ProfileSerializer(profiles, many=True)
            posts = Posts.objects.filter(Q(postAuthor__user__email__icontains=searchTerm) | Q(postText__icontains=searchTerm))
            postsSerializer = PostsSerializer(posts, many=True)
            return Response(
                {
                    'posts': postsSerializer.data,
                    'profiles': profilesSerializer.data
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'message': 'error searching for post'},
                status=status.HTTP_404_NOT_FOUND
            )
