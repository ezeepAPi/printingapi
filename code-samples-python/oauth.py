_author__ = 'bdm4'

import requests, json


authorize_url = "https://account.ezeep.com/oauth/authorize"
token_url = "https://account.ezeep.com/oauth/access_token/"

#callback url specified when the application was defined
callback_uri = "https://www.ezeep.com"


#client (application) credentials
client_id = '<put your client_id here>'
client_secret = "<put your client_secret here>"
#step A - simulate a request from a browser on the authorize_url - will return an authorization code after the user is
# prompted for credentials.

authorization_redirect_url = authorize_url + '?response_type=code&client_id=' + client_id + '&redirect_uri=' + callback_uri


print("go to the following url on the browser and enter the code from the returned url: ")
print("---  " + authorization_redirect_url + "  ---")
authorization_code = input('code: ')

# step -turn the authorization code into a access token
data = {'grant_type': 'authorization_code', 'code': authorization_code}
print("requesting access token")
access_token_response = requests.post(token_url, data=data, auth=(client_id, client_secret))

print("response")
print(access_token_response.status_code)
print('body: ' + access_token_response.text)

# we can now use the access_token as much as we want to access protected resources.
tokens = json.loads(access_token_response.text)
access_token = tokens['access_token']
print("access token: " + access_token)

#now we will get refresh token because access token will expire after 1 hour
#instead of doing all of the above procedure just use refresh token code to  renew your access token

refresh_code=tokens["refresh_token"]

data = {'grant_type': 'refresh_token', 'refresh_token':refresh_code }
print("requesting access token")
refresh_token_response = requests.post(token_url, data=data, auth=(client_id, client_secret))

print("refresh response")
print(refresh_token_response.status_code)
print('body: ' + refresh_token_response.text)