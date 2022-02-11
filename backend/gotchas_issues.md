Table of Contents:

- [Project Gotchas](#project-gotchas)
    - [setting up environment](#setting-up-environment)
    - [Setting up API Schema](#setting-up-api-schema)
- [Potential Issues to Look out for:](#potential-issues-to-look-out-for)
    - [Outdated Packages or Package Dependencies](#outdated-packages-or-package-dependencies)
# Project Gotchas

### setting up environment

installing pipenv:
```bash
pip install pipenv
```

To setup pipenv in local directory:
```bash
export PIPENV_VENV_IN_PROJECT="enabled"
```

installing python 3.9.x on ubuntu:
```bash
sudo apt install python3.9
```

creating pipenv virutal environment using specific python version 3.9.x:
```bash
pipenv install --python 3.9
```

activate virtual env:
```bash
pipenv shell
```
*note: at this point you should see in your termianl a .venv decorator along with the specific python version installed for the project. in this case, 3.9.5*

install django and necessary packages:
pipenv install django djangorestframework djangorestframework-simplejwt

installing psycopg2 for using postgres in django:
*note: you need to install pre-reqs system wide in order to build from source for use in production. explained here: https://stackoverflow.com/questions/5420789/how-to-install-psycopg2-with-pip-on-python*
```bash
sudo apt install libpq-dev python3-dev
pipenv install psycopg2
```

selecting python interpreter path for local virtual environment:
CTRL + SHIFT + P, Python: Select Interpreter OR click the python env in lower left hand corner of vs code
the path to enter will be the absolute path of wherever the .venv/bin/python is located.
For example, `/home/tony/REPOs/web3Social/backend/.venv/bin/python`

pipenv --where

creating django project:
`django-admin startproject <projectName> .`

creating apps within django project:
`python manage.py startapp <appName>`

running django project:
`python manage.py runserver`

running tests:
`python manage.py test <appName>`

### Setting up API Schema

install drf-yasg, add necessary paths to urls.py
```bash
pipenv install drf-yasg
```


# Potential Issues to Look out for:

### Outdated Packages or Package Dependencies

  - PyJWT had some breaking changes during the upgrade to 2.0.0. It *MAY* have been fixed on 2.1.0 upgrade, but if not see below
  - https://github.com/PureStorage-OpenConnect/py-pure-client/issues/5

  - PyJWT module has error `AttributeError: 'str' object has no attribute 'decode'` when working with djoser jwt for /jwt/create/ endpoint. Need to downgrade to PyJWT==1.7.1 to fi
  - [source](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiBjc7iwcnvAhVHOs0KHSJaDeYQFjAAegQIAhAD&url=https%3A%2F%2Fgithub.com%2Fjazzband%2Fdjango-rest-framework-simplejwt%2Fissues%2F326&usg=AOvVaw2W_DOKeurCvbIbumD5AasK)

  - If you get an error when using social authentication that says "ModuleNotFoundError: No module named 'django.utils.six", then do the following:
    - Open the file "venv/lib/python3.X/site-packages/djoser/social/token/jwt.py"
    - Change the line "from django.utils.six import text_type" to "from six import text_type"
    - With this change you should be able to log in using Google and Facebook OAuth2
    - relative path `parkapp-backend/.venv/lib/python3.8/site-packages/djoser/social/token/jwt.py`

