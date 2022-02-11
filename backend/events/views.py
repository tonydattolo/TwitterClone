from django.shortcuts import render

from .serializers import EventsSerializer, NotificationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import Events, Notifications
# Create your views here.

class CreateEventView(APIView):

    permissions=[permissions.AllowAny]
    def post(self,request):
        try:
            serializer=EventsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"Data Posted"},status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)


class UpdateEventsView(APIView):

    permissions=[permissions.AllowAny]

    def put(self,request,eventName):
        try: 
            # print(eventName)
            event = Events.objects.get(eventName=eventName)
            serializer = EventsSerializer(event,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"Full/PUT Update Successfull"},status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

    def patch(self,request,eventName):
        try:
            # print(pageName)
            event = Events.objects.get(eventName=eventName)
            # print(page)
            serializer = EventsSerializer(event,data=request.data,partial=True)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response({"msg":"Partial/PATCH Update Successfull"},status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

class DeleteEventView(APIView):
    permissions=[permissions.AllowAny]
    def delete(self,request,eventName):
        try: 
            event = Events.objects.get(eventName=eventName)
            if event:
                event.delete()
                return Response({"msg":"Record Deleted Successfully"},status=status.HTTP_200_OK)
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)


class GetEventDetails(APIView):
    permissions=[permissions.AllowAny]
    def get(self,request,eventName):
        try: 
            # print(pageName)
            event = Events.objects.get(eventName=eventName)
            # print(page)
            serializer = EventsSerializer(event)
            # print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
            # return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

class GetEventDetailsByAuthorPage(APIView):
    permissions=[permissions.AllowAny]
    def get(self,request,authorPage):
        try: 
            # print(authorPage)
            events = Events.objects.filter(authorPage=authorPage).order_by('-created_at')
            # print(page)
            serializer = EventsSerializer(events, many=True)
            # print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
            # return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)



# Views for Notifications
class PostEventNotification(APIView):
    permissions=[permissions.AllowAny]

    def post(self,request):
        try:
            # print(request.data.get("pageName"))
            pageName = request.data.get("pageName")
            # print(request.data.get("eventName"))
            eventName = request.data.get("eventName")

            for itm in request.data.get("userIDs"):
                userID = itm["user_id"]
                # print(userID)
                obj = {
                    "userID":userID,
                    "pageName":pageName,
                    "eventName":eventName
                }
                # print(obj)
                serializer=NotificationSerializer(data=obj)
                if serializer.is_valid():
                    serializer.save()
                # newNotificationObj = Notifications.objects.create(
                #     userID=itm["user_id"],
                #     eventName=eventName,
                #     pageName=pageName,
                # )
                # newNotificationObj.save()

            return Response({"msg":"Data Posted"},status=status.HTTP_201_CREATED)
            # serializer=NotificationSerializer(data=request.data)
            # if serializer.is_valid():
            #     serializer.save()
            #     return Response({"msg":"Data Posted"},status=status.HTTP_201_CREATED)
            # return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)


class GetEventNofiticationsByUser(APIView):
    permissions=[permissions.AllowAny]
    def get(self,request,pk):
        try: 
            # print(pk)
            # import pdb
            # pdb.set_trace()
            notifications = Notifications.objects.filter(userID=pk).order_by('-created_at')
            # print(notifications)
            serializer = NotificationSerializer(notifications, many=True)
            # print(serializer)
            return Response(serializer.data,status=status.HTTP_200_OK)
            # return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)


class UpdateNotification(APIView):

    permissions=[permissions.AllowAny]

    def patch(self,request,eventName):
        try:
            # print("URL",eventName)
            # print("Body",request.data.get("eventName"))
            # import pdb
            # pdb.set_trace()
            notification = Notifications.objects.filter(eventName=eventName).update(eventName=request.data.get("eventName"))
            # print("notification objects:",notification)
            # print("after Notifications")
          
            # notification = Notifications.objects.get(eventName=request.data.get("eventName"),many=True)
            # serializer = NotificationSerializer(notification,data=newdata,many=True,partial=True)
            # print(serializer)
            # if serializer.is_valid():
            #     serializer.save()
            #     return Response({"msg":"Partial/PATCH Update Successfull"},status=status.HTTP_200_OK)

            return Response({"msg":"Partial/Full PATCH Update Successfull"},status=status.HTTP_200_OK)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

class DeleteNotifications(APIView):
    permissions=[permissions.AllowAny]

    def delete(self,request,eventName):
        try:
            print(eventName)
            notification = Notifications.objects.filter(eventName=eventName).delete()
            
            return Response({"msg":"Partial/Full PATCH Update Successfull"},status=status.HTTP_200_OK)
        except:
            return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
