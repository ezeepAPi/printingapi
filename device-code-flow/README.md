# Introduction
Getting an  access token from the  pairing device flow method consist of 3 steps.

1. Getting pairing code.
2. Logging in to ezeep using the autoritzation url.
3. Getting  the access token with the pairing code.


![Flow diagram of device code flow ](flow_diagram.png) 

## Getting Pairing code

* _**base64 encoded_id**_ : If your client id is g34ibgu2fhon and your client secret is                  jisow35ysdlalx35s2avnks43223jdhjsdk you need to base64-encode it as g34ibgu2fhon:jisow35ysdlalx35s2avnks43223jdhjsdk which results in ZzM0aWJndTJmaG9uOmppc293MzV5c2RsYWx4MzVzMmF2bmtzNDMyMjNqZGhqc2RrCg==. You can use a online [base64](https://www.base64encode.org/) encoding tool.

```shell
POST 'https://account.ezeep.com/oauth/pair'
```

|Type    |Key               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header      | Authorization| Basic {{base_64_encoded_id}} |
|   Data      |mode | device |
|  Data       |scope | printing |


<br>
Example Request


```shell
curl  -X POST 'https://account.ezeep.com/oauth/pair/' \
      -H "Authorization:Basic QjZ6RGdaaTlZQ3lJS3VmUlhHdDFROFJEOTdqc2RDUU5SV1lGdjl4Szo3d3JIUzFJUHdXS3JJQW5XejRFTkRBM2dHOGVHeVQ0UmdxUnNaZWhHVTVKTTVCaUlRWUlNZ0g1V0Z3ZU9SaDFIYklqeWRTVThjc3JyZDZXenZS1kfT1NDMTNtU2psZHpGQWtMVUc1a3NUaklEclpHWTNBWXBsNW1kbzhFZm0wZw=="  \
      -d "{
           'scope' :'printing',
           'mode':'device'
         }" 
```

<br>
Example Response

```json
 
{
    "pairing_code": "uafdHUwAs7", 
    "auth_url": "https://account.ezeep.com/auth/signin/?next=%2Foauth%2Fauthorize%2Fpairing%2F%3Fpairing_code%3DuafdHUwAs7&device=generic"

}
```

_pairing_code_ :  is the unique code for the device. When the user goes to the auth_url in their browser-based device, this code will be bound to their session.

_auth_url_ : contains the URL the user should visit to authorize the device.


## login into authorization url

* after getting the  _auth_url_ in the  previous step, click on the link it will redirect you to the sign in page

*_**auth_url**_ : "https://account.ezeep.com/auth/signin/?next=%2Foauth%2Fauthorize%2Fpairing%2F%3Fpairing_code%3DuafdHUwAs7&device=generic"

<br>

![signing in to your account](signin.png) 

* sign in to your account, you will be redirected to the successful login page

<br>

![successful  sign in  into your account](login_successful.png) 


## getting access token from pairing code

* _**base64 encoded_id**_ : If your client id is g34ibgu2fhon and your client secret is                  jisow35ysdlalx35s2avnks43223jdhjsdk you need to base64-encode it as g34ibgu2fhon:jisow35ysdlalx35s2avnks43223jdhjsdk which results in ZzM0aWJndTJmaG9uOmppc293MzV5c2RsYWx4MzVzMmF2bmtzNDMyMjNqZGhqc2RrCg==. You can use a online [base64](https://www.base64encode.org/) encoding tool.

* _**content_type**_ : application/x-www-form-urlencoded

```shell
POST 'https://account.ezeep.com/oauth/access_token'
```

|Type    |Key               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header      | Authorization| Basic {{base_64_encoded_id}} |
|   Data      |grant_type | pairing_code |
|  Data       |scope | printing |
|  Data       |pairing_code | <pairing_code_from_first_step_Response> |


<br>
Example Request


```shell
curl  -X POST 'https://account.ezeep.com/access_token/' \
      -H "Authorization:Basic QjZ6RGdaaTlZQ3lJS3VmUlhHdDFROFJEOTdqc2RDUU5SV1lGdjl4Szo3d3JIUzFJUHdXS3JJQW5XejRFTkRBM2dHOGVHeVQ0UmdxUnNaZWhHVTVKTTVCaUlRWUlNZ0g1V0Z3ZU9SaDFIYklqeWRTVThjc3JyZDZXenZS1kfT1NDMTNtU2psZHpGQWtMVUc1a3NUaklEclpHWTNBWXBsNW1kbzhFZm0wZw=="  \
      -H 'content-type:application/x-www-form-urlencoded' \
      -d 'grant_type':'pairing_code' \
      -d 'scope' :'printing' \
      -d 'pairing_code':'KjUdZTDpiX' 
```

<br>
Example Response

```json
{
   "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY291bnQuZXplZXAuY29tIiwiZXhwIjoxNjE4OTM1NDA5LCJpYXQiOjE2MTg5MzE4MDksInNjb3BlcyI6InByaW50aW5nIiwic3ViIjoiMTY4NTFkOTUtYmNiNi00YTJjLWJkMzEtNmY0ZGY5NDM0Zjg2Iiwib3JnIjoiYTkxNDgwZDItMTA1Yi00OWYyLWI2ZTctNDE4MWM4NjM4MjkxIiwicHR5IjoiZGV2In0.UVq4Q41l0TzWoyZtThVyyMGpJrPNb8Q5QyR_PAxGZiuZmqnDCbT4_10CuoBJTCB9qU4LiIuF72UZDsyC-TqOtxONas1jGeFcT7izNNS0vhXFFhKnPOGMNZCvncGppUVVuNYtcF7IQzXMNsLdTEIRFdw209zekY6-CFawEgHQfK4q1JjJy2tohKUg5aPVomifL_kIjdvqp9xRh7step5UXW28iPLfvJi02yCLxM6e6ZDTP0wOewZpW_B5XGzpE0ynaprU8MUHG_sKEhq1LIPojom2D362mEA6e3E_tDxPwI1Jf6u0oEBY34y2Im39-l6PtCEHXor3xEpnBKAOPh72QQ",
   "token_type": "Bearer",
   "expires_in": 3600,
   "scope": "printing",
   "refresh_token": "F2UuSALr3gDwv8xnbjTycbsUzrhg15MA"

}
```
