import random as rn
import string

# from profiles.models import Profile

def generateRandomUnqiueUsername():
    """
    Generates a random username if the given username is already taken.
    """
    random_username = 'user-'

    # add 20 random uppercase letters, lowercase letters, and numbers to the username
    random_username += ''.join(rn.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(20))
    
    # Check if the random username is already taken
    # if Profile.objects.filter(display_name=random_username).exists():
    #     return generateRandomUnqiueUsername()
    # else:
    #     return random_username
    return random_username
    