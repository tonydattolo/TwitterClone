from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models.query_utils import Q

from profiles.models import Profile

from django.contrib.auth import get_user_model
USER = get_user_model()

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

# Create your views here.
class GetConversationListView(APIView):
    """
    Get all conversations
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]

    def get(self, request):
        print(f'{request.user=}')
        try:
            # user = Profile.objects.get(user=request.user)
            user = request.user
            # conversations = Conversation.objects.filter(
            #     Q(user1=user.pk) | Q(user2=user.pk)
            # ).values('user1', 'user2').distinct()
            conversations = Conversation.objects.filter(
                Q(user1=user.pk) | Q(user2=user.pk)
            )
            print(f'{conversations=}')
            serializer = ConversationSerializer(conversations, many=True)
            # serializer.save()
            print(f'{serializer=}')
            # print(f'{serializer.data=}')
            return Response(
                {"conversations": serializer.data},
                status=status.HTTP_200_OK)
        except Exception as e:
            print(f'{e=}')
            return Response(
                {"message": "Something went wrong"},
                status=status.HTTP_400_BAD_REQUEST)

class CreateConversationView(APIView):
    """
    Create a new conversation
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]

    def post(self, request):
        
        print(f'{request.user=}')
        # print(f'{request.data=}')
        print(f'{request.data["receiver"]=}')
        # print(f'{request.data["message"]=}')
        
        try:
            user1 = request.user
            user2 = USER.objects.get(email=request.data['receiver'])
            print(f'{user2=}')
            newMessage = request.data['message']
            
            # add logic here to send message using existing conversation
            if Conversation.objects.filter(
                Q(user1=user1, user2=user2) | Q(user1=user2, user2=user1)
                ).exists():
                conversation = Conversation.objects.get(
                    Q(user1=user1, user2=user2) | Q(user1=user2, user2=user1)
                )
                message = Message(
                    conversation=conversation,
                    sender=user1,
                    receiver=user2,
                    message=newMessage
                )
                message.save()
                conversation.add_message(message)
                conversation.save()
                return Response(
                    {"message": "Conversation already exists, message added to convo"},
                    status=status.HTTP_201_CREATED
                )
                # return Response(
                #     {"message": "Conversation already exists"},
                #     status=status.HTTP_409_CONFLICT
                # )
            
            try:
                conversation = Conversation.objects.create(
                    user1=user1,
                    user2=user2
                )
                message = Message.objects.create(message=newMessage, conversation=conversation, sender=user1, receiver=user2)
                message.save()
                conversation.add_message(message)
                # conversation.messages.add(message)
                conversation.save()
            except Exception as e:
                print(f'{e=}')
                return Response(
                    {"error": "error creating conversation and message models"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
        except Exception as e:
            print(f'{e=}')
            return Response(
                {"error": f"error creating new message{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
            
            
class GetConversationDetailView(APIView):
    """
    Get conversation detail between two users
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]

    def get(self, request, displayName):
        try:
            try:
                user = request.user
                # need to fix frontend logic to render username instead of email
                # otherUser = USER.objects.get(profile__display_name=displayName)
                otherUser = USER.objects.get(email=displayName)
            except Exception as e:
                return Response(
                    {"error": f"error loading users {e=}"},
                    status=status.HTTP_404_NOT_FOUND)
            
            try:
                conversation = Conversation.objects.filter(
                    Q(user1=user) & Q(user2=otherUser) |
                    Q(user1=otherUser) & Q(user2=user)
                ).first()
                messages = Message.objects.filter(conversation=conversation).order_by('created_at')
            except Exception as e:
                return Response(
                    {"error": f"error loading conversation:  {e=}"},
                    status=status.HTTP_404_NOT_FOUND)
            # except Conversation.DoesNotExist:
            #     conversation = Conversation.objects.create(
            #         user1=user, user2=otherUser
            #     )
            #     return Response(
            #         {"message": "Conversation does not exist"},
            #         status=status.HTTP_404_NOT_FOUND)
        
            conversationSerializer = ConversationSerializer(conversation)
            messageSerializer = MessageSerializer(messages, many=True)
            return Response(
                {"conversation": conversationSerializer.data,
                 "messages": messageSerializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": f'{e=}'},
                status=status.HTTP_400_BAD_REQUEST)

class SendNewMessageView(APIView):
    """
    Send a new message to a conversation
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]

    def post(self, request):
        user = request.user
        message = request.data['message']
        conversation_id = request.data['conversation_id']
        receiver = request.data['receiver']
        receiverUser = USER.objects.get(email=receiver)
        
        # NOTE: there is a weird bug where it gives integrity error when
        #       sending a new message and it says there's no receiver_id.
        #       I'm not sure why this is happening, but it works as intended
        
        try:
            conversation = Conversation.objects.get(pk=conversation_id)
            message = Message.objects.create(
                conversation=conversation,
                message=message,
                sender=user,
                receiver=receiverUser
            )
            message.save()
            conversation.add_message(message)
            conversation.save()
            return Response(
                {"message": "Message sent"},
                status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"error": f'issue sending message:  {e=}'},
                status=status.HTTP_400_BAD_REQUEST)
        