from .models import Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from django.contrib.auth.models import User
from .serializer import ProfileSerializer

class UserProfileView(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.AllowAny,]

    def get(self, request, email, format=None):
        """
        Returns the wanted user by email id.
        """
        try:
            data = email
            wantedProfile = data
            
            if Profile.objects.filter(user__email=wantedProfile).exists():
                profile = Profile.objects.filter(user__email=wantedProfile).first()
                profilejson = ProfileSerializer(profile)
                return Response(
                    {'profile': profilejson.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(

                    {'error': 'user profile not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except:
            return Response(

                {'error': 'data not found or loaded properly in request'},
                status=status.HTTP_400_BAD_REQUEST
            )

from django.contrib.auth import get_user_model # new
from rest_framework import generics 
# from .permissions import IsAuthorOrReadOnly
from .permissions import IsAuthorOrReadOnly
from .serializer import ProfileSerializer # new

class UpdateUserDetails(generics.UpdateAPIView):
        
    permission_classes = [IsAuthorOrReadOnly]
    serializer_class = ProfileSerializer

    def patch(self, request, email = None):
        if not email:
            return Response(

                    {'error': 'Could not update'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        currProfile = Profile.objects.filter(user__email = email)
        if(not currProfile):
            return Response(

                    {'error': 'Prof not tonjsgnkjhnfsknklnNot found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        currProfile = currProfile.first()

        if currProfile:
            
            currProfile.first_name = request.data['first_name']
            currProfile.last_name = request.data['last_name']
            currProfile.display_name = request.data['display_name']
            currProfile.locations = request.data['locations']
            currProfile.bio = request.data['bio']
            currProfile.save()
            # if(currProfile.save()):
            return Response({'Success':'Saved'}, status=status.HTTP_200_OK)
            # else:
                # return Response({'Error':'Not saving'}, status=status.HTTP_304_NOT_MODIFIED)

class GetAllProfiles(APIView):
    """
    Get all user profiles in a list.
    """
    permission_classes = [permissions.AllowAny,]

    def get(self, request, format=None):
        try:
            profiles = Profile.objects.filter(user__is_superuser=False)
            serializer = ProfileSerializer(profiles, many=True)
            return Response(
                {'profiles': serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(

                {'error': f'couldnt grab all profiles: {e=}'},
                status=status.HTTP_400_BAD_REQUEST
            )
    