from django.urls import path

from .views import CreatePageView,UpdatePageView, DeletePageView, PageDetailsView,PageFollower,GetPageFollowers,GetPagesByUser, GetAllPagesDetails

urlpatterns = [
    
    path('create/',CreatePageView.as_view(),name='create-page'),
    path('<str:pageName>/',PageDetailsView.as_view(),name='page-details'),
    path('<str:pageName>/update/',UpdatePageView.as_view(),name='update-page'),
    path('<str:pageName>/delete/',DeletePageView.as_view(),name='delete-page'),
    path('<int:pk>',GetPagesByUser.as_view(),name='get-pages-by-user'),
    path('',GetAllPagesDetails.as_view(),name='get-all-pages-details'),

    # Followers
    path('<str:pageName>/followers/',GetPageFollowers.as_view(),name='page-follower'),
    path('<str:pageName>/<int:pk>/',PageFollower.as_view(),name='page-follower'),
    # path('<str:pageName>/<int:pk>/',DeletePageFollower.as_view(),name='page-follower'),
    
]
