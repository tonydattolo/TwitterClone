# custom user creation form

from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import UserAccount

class UserAccountCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = UserAccount
        # fields = UserCreationForm.Meta.fields + ('age',) #overides default by adding age
        fields = ('email',)

class UserAccountChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = UserAccount
        fields = UserChangeForm.Meta.fields
        
        # fields = UserChangeForm.Meta.fields + ('display_name','bio','profilePic','phone_number','age','address1','address2','zip_code','city',)
        # fields = ('email','display_name','bio','profilePic','phone_number','age','address1','address2','zip_code','city',)
        # fields = UserChangeForm.Meta.fields += ['bio',]
        # fields = ('email','display_name',)
        # fields = '__all__'