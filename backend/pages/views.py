from django.shortcuts import render
from .serializers import PagesSerialzer, FollowersSerialzer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .models import Pages, Followers

from profiles.models import Profile
import json




# Create your views here.
class CreatePageView(APIView):
    """
    Create new page
    """
    permissions=[permissions.AllowAny]
    

    def post(self,request):
        try:
            print(request.data)
            
            try:
                newPage = Pages.objects.create(
                    pageName=request.data['pageName'],
                    pageEmail=request.data['pageEmail'],
                    pageAuthor=request.data['pageAuthor'],
                    # pageAuthor=request.user,
                    pageDescription=request.data['pageDescription'],
                )
                newPage.save()
            except Exception as e:
                print(f'{e=}')
                return Response({"message": "error creating new page"}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = PagesSerialzer(newPage)
            return Response(
                {"message": "page created successfully",
                 "data": serializer.data},
                status=status.HTTP_201_CREATED)
             
        except Exception as e:
            print(f'{e=}')
            return Response(
                {"message": "error creating new page"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

    

class UpdatePageView(APIView):

    permissions=[permissions.AllowAny]

    def put(self,request,pageName):
        try: 
            # print(pageName)
            page = Pages.objects.get(pageName=pageName)
            serializer = PagesSerialzer(page,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"Full/PUT Update Successfull"},status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

    def patch(self,request,pageName):
        try:
            # print(pageName)
            page = Pages.objects.get(pageName=pageName)
            # print(page)
            serializer = PagesSerialzer(page,data=request.data,partial=True)
            # print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"Partial/PATCH Update Successfull"},status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

class DeletePageView(APIView):
    permissions=[permissions.AllowAny]
    def delete(self,request,pageName):
        try: 
            page = Pages.objects.get(pageName=pageName)
            if page:
                page.delete()
                return Response({"msg":"Record Deleted Successfully"},status=status.HTTP_200_OK)
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

class PageDetailsView(APIView):
    permissions=[permissions.AllowAny]
    def get(self,request,pageName):
        try: 
            # print(pageName)
            page = Pages.objects.get(pageName=pageName)
            # print(page)
            serializer = PagesSerialzer(page)
            # print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
            # return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

class GetPagesByUser(APIView):
    permissions=[permissions.AllowAny]
    def get(self,request,pk):
        try: 
            # print(pageName)
            pages = Pages.objects.filter(pageAuthor=pk).order_by('-created_at')
            # print(page)
            serializer = PagesSerialzer(pages,many=True)
            # print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
            # return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)


class GetAllPagesDetails(APIView):
    permissions=[permissions.AllowAny]
    def get(self,request):
        try: 
            # print(pageName)
            pages = Pages.objects.all().order_by('-created_at')
            # print(page)
            serializer = PagesSerialzer(pages,many=True)
            # print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
            # return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)


""" Page Followers related views """
class GetPageFollowers(APIView):

    def get(self,request,pageName):
        
        try: 
            # print(pageName)
            # import pdb
            # pdb.set_trace()
            follower_objs = Followers.objects.filter(pageName=pageName)
            # print(follower_objs)
            serializer = FollowersSerialzer(follower_objs,many=True)
            # print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
            # return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)


class PageFollower(APIView):
    permissions=[permissions.AllowAny]
    def post(self,request,pageName,pk):
        # print("*"*10)
        # print(pageName)
        # print(request.data)
        # print(pk)
        try:
            data = {
                "pageName":pageName,
                "user_id":pk,
                "user_email":request.data.get('userEmail')
            }
            # print(data)
            serializer=FollowersSerialzer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"Follower Posted"},status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,pageName,pk):
        try: 
            follower_obj = Followers.objects.filter(pageName=pageName,user_id=pk)
            if follower_obj:
                follower_obj.delete()
                return Response({"msg": "Record Deleted"},status=status.HTTP_200_OK)
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

    def get(self,request,pageName,pk):
        try: 
            # print("Page Name: ",pageName)
            # print("User ID: ",pk)
            follower_obj = Followers.objects.filter(pageName=pageName,user_id=pk)
            data = {"isFollower": "True"}
            data2 = {"isFollower": "False"}
            if follower_obj:
                # follower_obj.delete()
                return Response({"isFollower": "True"},status=status.HTTP_200_OK)
            else:
                return Response({"isFollower": "False"},status=status.HTTP_200_OK)

        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)



          