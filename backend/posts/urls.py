from django.urls import path

from .views import (
    AllPostsListView,
    PostDetailView,
    CreatePostView,
    PostUpdateView,
    PostDeleteView,
    PostsListViewByAuthor,
    GetTodaysPosts,
    )

urlpatterns = [
    path('', AllPostsListView.as_view(), name='all-posts'),
    path('<int:pk>/detail/', PostDetailView.as_view(), name='post-detail'),
    path('create/', CreatePostView.as_view(), name='create-post'),
    path('<int:pk>/update/', PostUpdateView.as_view(), name='update-post'),
    path('delete/<str:id>/', PostDeleteView.as_view(), name='delete-post'),
    path('<str:email>/', PostsListViewByAuthor.as_view(), name='posts-by-author'),
    path('hot/today/', GetTodaysPosts.as_view(), name='todays-posts')
]


