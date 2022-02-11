from django.contrib import admin

# Register your models here.

# TO verify that profiles are being created when a user is created, do this
from .models import Profile

class ProfileAdminView(admin.ModelAdmin):
    list_display = ('user','first_name','last_name')  # Custom view inside admin panel

    
    # In this we are using user__email because user is a different database and we wanna say 
    # it to go inside that database and search on basis of email
    search_fields = ["user__email","first_name","last_name","bio"]  # Search inside admin panel
    
    
    list_per_page = 5                                 # Pagination inside admin panel


admin.site.register(Profile,ProfileAdminView)  
