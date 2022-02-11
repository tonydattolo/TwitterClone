1 - make app
2 - make user model
3 - add profile to settings.py of main backend api
4 - makemigrations
5 - migrate


Step 1: create a model inside profile->model.py
this model will actually create a db

Step 2:  whatever view we added inside url.py we need to create that view now 
go to <code><profiles-> views.py/code>


6 - make urls.py in profiles
and add url for a profile view


When you have added the url to url in profiles.py include these urls inside backendapi

Now we need to create template for out profile.
But this template will be inside BASE_DIR
so go to <br/>
<pre>
    1 - <code>settings.py (of main backendAPI)</code>
    2 - search for template.
    3 - there is a field named **DIR**
    4 - update this with the path to our templates, which will be basedir/templates.
    5 - Now whenever we want to add any template related to a module, we will create a folder for it and will then add a template
    6 - so now we add a folder for profile
    7 - we create a base which will be base of bootstrap
    8 - this profile template will extend the base
</pre>

once we have this template running, all we need to do is, 
from inside views.py when we get a username
we need to check if username is valid or not.
if its invalid, then we simply return 404 page
but if this user is valid then we need to show its info.

Now if we do this, we get profile not found everytime,
this is because, it is looking inside profile database, but its not necessary that every user has a profile created

Now we will use signals to create a profile for user.

Now we have worked till the point where everytime we create a user his/her profile is being created.
 
 Now we are creating profile forms.
 profile-> forms.py

 First we create a form to update data,
 then we add a view to show these forms

 once we have a view ready, we actually create this view in our frontend 
 i.e. we create such a view in templates->profile->form.html

 then add this thing inside profile-> url.py