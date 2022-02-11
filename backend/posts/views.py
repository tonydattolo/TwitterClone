from django.db.models.query_utils import Q
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime

from .models import Posts
from rest_framework import generics, status, permissions
from .serializers import PostsSerializer

from profiles.models import Profile
from profiles.serializer import ProfileSerializer

from .permissions import IsAuthorOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication


class CreatePostView(APIView):
    '''Create a post'''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            try:
                profile = Profile.objects.get(user__email=request.user)
            except Profile.DoesNotExist:
                return Response(
                    {'error':'profile not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                Posts.objects.create(postAuthor=profile, postText=request.data['post_text'])
                return Response(
                    {'success':'post created'},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                print(f'{e=}')
                return Response(
                    {'error':'problem creating post object'},
                    status=status.HTTP_406_NOT_ACCEPTABLE
                )
        except:
            return Response(
                {"error": "catchall error triggered on create post view"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


class AllPostsListView(APIView):
    '''Get all posts'''
    permission_classes = [permissions.AllowAny,]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,]

    def get(self, request):
        try:
            posts = Posts.objects.all().order_by('-created_at')
            # print(f'{posts=}')
            serializer = PostsSerializer(posts, many=True)
            return Response(
                {'posts': serializer.data},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'message': 'Something went wrong loading all posts'},
                status=status.HTTP_404_NOT_FOUND)

class PostsListViewByAuthor(APIView):
    '''Get all posts by author'''
    permission_classes = [permissions.AllowAny]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,]

    def get(self, request, email, format=None, *args, **kwargs):
        try:
            wantedUser = email
            if Posts.objects.filter(postAuthor__user__email=wantedUser).exists():
                posts = Posts.objects.filter(postAuthor__user__email=wantedUser).order_by('-created_at')
                serializer = PostsSerializer(posts, many=True)
                return Response(
                    {'posts': serializer.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'message': 'No posts found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {'message': 'error loading posts by author'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class PostDetailView(generics.RetrieveAPIView):
    '''Get the details of a particular post'''
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,]
    def get(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = PostsSerializer(post)
        return Response(serializer.data)

class PostUpdateView(generics.UpdateAPIView):
    '''Update a post'''
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = (IsAuthorOrReadOnly,)

# class PostDeleteView(generics.DestroyAPIView):
#     '''Delete a post'''
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#     permission_classes = (IsAuthorOrReadOnly,)

class PostDeleteView(APIView):
    '''Delete a post'''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def delete(self, request, id):
        try:
            # Posts.objects.delete(id=id)
            post = Posts.objects.get(pk=id)
            if post.postAuthor.user == request.user:
                post.delete()
                return Response(
                    {'message': 'Post deleted'},
                    status=status.HTTP_200_OK
                )
        except:
            return Response(
                {'message': 'post not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class GetTodaysPosts(APIView):
    '''Get all posts for today'''
    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        try:
            today = datetime.date.today()
            posts = Posts.objects.filter(created_at__date=today).order_by('-created_at')
            serializer = PostsSerializer(posts, many=True)
            return Response(
                {'posts': serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'message': f'Something went wrong loading todays posts: {e=}'},
                status=status.HTTP_404_NOT_FOUND
            )