# Writing an ezeep integration

- Create a group
- Read a specific group by _id_
- Read all group
- Delete a group
- Read all users
- Read users from a specific group
- Read a specific user by _id_
- Add users into the group

## Getting an access token using OAuth2s client credentials grant:

Check the [RFC spec](<[OAuth2](https://tools.ietf.org/html/rfc6749#section-4.1)>) for a detailed flow description.

1. Request authorization code. To do that, you should redirect the user to the `/oauth/authorize` page with the following query parameters:

```shell
https://account.ezeep.com/oauth/authorize?response_type=code&client_id=B6zDgZi9YCyIKufRXGt1Q8RD97jsdCQNRWYFf9xK&redirect_uri=https://www.ezeep.com
```

2. Returns an authorization code as a URL parameter to the redirect URI

- `<your redirect_uri>/?code=<authorization_code>`

```shell
https://www.ezeep.com/?code=UWvSbESYQ2SirrvPCoasSRVYK6jDDD
```

- The `Authorization_code` is valid indefinitely but can only be used once

Required query parameters:

| Attribute     | required | description                                                                        |
| :------------ | :------: | :--------------------------------------------------------------------------------- |
| response_type |   yes    | defines the OAuth2 grant, `code` is preferred as authorization grant               |
| client_id     |   yes    | the Client ID you received from ezeep                                              |
| redirect_uri  |   yes    | Must match one of the redirect URIs you provided when you requested your Client ID |
| social        |    no    | `azure` to automatically redirect to Microsoft for authentication                  |
| prompt        |    no    | `none` to prevent Microsoft from showing the account selection prompt              |
| scope         |    no    | `printing`                                                                         |
| state         |    no    | can be used to maintain state after redirecting the user agent                     |

## Request access token

Now that you have an Authorization Code, you must exchange it for tokens. Using the extracted Authorization Code (code) from the previous step.

```shell
POST 'https://account.ezeep.com/oauth/access_token'
```

|  Type  |      Key      |                Value                |
| :----: | :-----------: | :---------------------------------: |
| Header | Authorization | Basic {{base_64_encoded_client_id}} |
|  Data  |  grant_type   |         authorization_code          |
|  Data  |     scope     |              printing               |
|  Data  |     code      |       {{authorization_code}}        |
|  Data  | redirect_uri  |       registered redirect_uri       |

<br>
Example Request<br>

```shell
curl  -X POST 'https://account.ezeep.com/oauth/access_token/' \
      -H "Authorization:Basic QjZ6RGdaaTlZQ3lJS3VmUlhHdDFROFJEOTdqc2RDUU5SV1lGZjl4Szo="  \
      -d "{
           'grant_type':'authorization_code',
           'scope' :'printing',
           'code':'<authorization_code>'
           'redirect_uri' : '<registered redirect_uri>'
         }"
```

Example Response

```json
{
  "access_token": "eyJ0eXAiO...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "printing",
  "refresh_token": "erliDdAb..."
}
```

`Access_token` will be valid for 3600 seconds(1 hour) and after that duration you have to request new access token using the **refresh token** that you received in the access token response.

## Use refresh token

You can use the Refresh Token to get a new Access Token. Usually, a user will need a new Access Token only after the previous one expires or when gaining access to a new resource for the first time. It's bad practice to call the endpoint to get a new Access Token every time you call an API.

To refresh your token, make a POST request to the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`

```shell
curl -X POST 'https://account.ezeep.com/oauth/access_token/'
```

|  Type  |      Key      |                Value                |
| :----: | :-----------: | :---------------------------------: |
| Header | Authorization | Basic {{base_64_encoded_client_id}} |
| Header | Content-Type  |  application/x-www-from-urlencoded  |
|  Data  |  grant_type   |            refresh_token            |
|  Data  |     scope     |              printing               |
|  Data  | refresh_token |          {{refresh_token}}          |

Example request:

```shell
curl -X POST 'https://account.ezeep.com/oauth/access_token/' \
     -H 'Authorization:Basic QjZ6RGdaaTlZQ3lJS3VmUlhHdDFROFJEOTdqc2RDUU5SV1lGZjl4Szo=' \
     -d "{
          'grant_type':'refresh_token',
          'scope':'printing'
          'refresh_token':'<refresh_token>'
        }"
```

Example Response

```json
{
  "access_token": "eyJ0eXAiOiJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "",
  "refresh_token": "vT5GTKk8..."
}
```

``refresh_token` You can use the refresh token once to generate a new access token and refresh token,it will also valid for 3600 seconds(1 hour).

You will need to replace and store the new refresh token securely from the response for future usage.

# Groups

## Base Url

```
"https://api2.ezeep.com/printing/v1/groups/"
```

## Requirements

- Authorization

### 1. access token

For authorization you need access token.Please refer to [oauth](efa-quick-guide.md) documentation for getting access token.

## create a group

to create a group required data is _name_ and _organization_id_ as mentiond in [parameters](##-Parameters).

- In example requests only required `data` is used but you can also use other [data](##-Parameters) according to your requirements.

<br>

```shell
POST 'https://api2.ezeep.com/printing/v1/groups/'
```

|  Type  |       Key       |          Value          |
| :----: | :-------------: | :---------------------: |
| Header |  Authorization  | Bearer {{Access Token}} |
|  Data  |      name       |         string          |
|  Data  | organization_id |      string($uuid)      |

<br>
Example Request

```shell
curl  -X POST 'https://api2.ezeep.com/printing/v1/groups/' \
      -H "Authorization:Bearer <Access Token>"  \
      -d "{
           'name':'test'
           'organization_id':'3fa85f64-5717-4562-b3fc-2c963f66afsd'
         }"
```

<br>
Example Response

```json
{
  "id": "d16eeaa2-97ba-464a-b12a-f0ed66cc6078",
  "name": "Test",
  "description": "",
  "local_printing_enabled": false,
  "myprinters_enabled": false,
  "origin": { "provider": "Ezeep" },
  "organization_id": "54e3a324-cc89-4722-8338-c285d26bef15",
  "num_members": 0,
  "num_printers": 0
}
```

## read a specific group by _id_

Each group get a specific _id_ ,if you know the _id_ of the group then associated group will be in response.

- Also not necessary to pass anything in the `data` because group will be searched by _id_

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/groups/<id>'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/groups/dd8d4007-2522-42ab-ac2e-bf23d87defc3' \
      -H "Authorization:Bearer <Access Token>"  \
      -d "{

         }"
```

<br>
Example Response

```json
{
  "id": "dd8d4007-2522-42ab-ac2e-bf23d87defc3",
  "name": "Test",
  "description": "",
  "local_printing_enabled": false,
  "myprinters_enabled": false,
  "origin": { "provider": "Ezeep" },
  "organization_id": "54e3a324-cc89-4722-8338-c285d26bef15",
  "num_members": 0,
  "num_printers": 0
}
```

## read all groups

All of the existing groups can be listed,in case you dont remeber the specific group _id_ .

- Also not necessary to pass anything in the `data` because all of the groups will be listed

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/groups/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/groups/' \
      -H "Authorization:Bearer <Access Token>"  \
      -d "{

         }"
```

<br>
Example Response

```json

{
 "count":13,
 "next":null,
 "previous":null,
 "results":[{"id":"658a1b3b-173c-4f55-8150-42e16bd27f96",
            "name":"WVD Printers","description":"","local_printing_enabled":true,"myprinters_enabled":false,"origin":{"provider":"Azure","foreign_id":"9cb21a02-7985-47b5-82c0-d656e3830cc4"},"organization_id":"54e3a324-cc89-4722-8338-c285d26bef15","num_members":8,"num_printers":0},{"id":"9e05c98e-77b0-4915-8143-0dfc77a54d65","name":"ezeep Blue","description":"","local_printing_enabled":true,"myprinters_enabled":false,"origin":{"provider":"Azure","foreign_id":"3f3aa500-8d21-44a6-98c7-e14e407c482c"},"organization_id":"54e3a324-cc89-4722-8338-c285d26bef15","num_members":54,"num_printers":0},
            .
            .
            .
            .
            .
            {"id":"19b5963a-35eb-416c-9ca4-a4c2950385fb","name":"EfA Printer","description":"","local_printing_enabled":true,"myprinters_enabled":false,"origin":{"provider":"Azure","foreign_id":"a7c28afe-251f-46cd-9bf8-30432df6d416"},"organization_id":"54e3a324-cc89-4722-8338-c285d26bef15","num_members":119,"num_printers":5},{"id":"dd8d4007-2522-42ab-ac2e-bf23d87defc3","name":"Test","description":"","local_printing_enabled":false,"myprinters_enabled":false,"origin":{"provider":"Ezeep"},"organization_id":"54e3a324-cc89-4722-8338-c285d26bef15","num_members":0,"num_printers":0}]

}
```

## delete a group

Each group get a specific _id_ ,user can delete that specific group by using this _id_

- Also not necessary to pass anything in the `data` because group will be searched by _id_

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/groups/<id>'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X DELETE 'https://api2.ezeep.com/printing/v1/groups/d16eeaa2-97ba-464a-b12a-f0ed66cc6078' \
      -H "Authorization:Bearer <Access Token>"  \
      -d "{

         }"
```

<br>
Example Response

```shell

{
    204
}
```

## read a users

To read about all of the users information and from which group _user_ belong. All information for a specific user can be read and check which settings are enabled for a specific user.

- Also not necessary to pass anything in the `data` because group will be searched by _id_

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/users/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET "https://api2.ezeep.com/printing/v1/users/" \
      -H "Authorization:Bearer <Access Token>"  \
      -d "{

         }"
```

<br>
Example Response

```json
{
  "count": 134,
  "next": "http://api2.ezeep.com/printing/v1/users/?limit=20&offset=20",
  "previous": null,
  "results": [
    {
      "id": "0050a068-cc7b-4490-951a-06920a610ee5",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "0545f81c-0eca-4c24-b4c1-fe7fcdb1b4fb",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" },
        { "group_id": "9e05c98e-77b0-4915-8143-0dfc77a54d65" }
      ]
    },
    {
      "id": "063f87e3-5254-443a-a65e-8239ede3fbc6",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" },
        { "group_id": "9e05c98e-77b0-4915-8143-0dfc77a54d65" }
      ]
    },
    {
      "id": "06d402a2-bf6a-426a-a489-62a0027a6a18",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "9e05c98e-77b0-4915-8143-0dfc77a54d65" },
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }
      ]
    },
    {
      "id": "073ccebb-ff38-4e46-ac6e-7a07b4d03906",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "08083be9-75f7-4658-8832-32e2280cbdd7",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "0810f57c-6ce6-4ef0-badc-dcd121576b84",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "084d7404-efe3-4df6-853e-0727610c262e",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" },
        { "group_id": "9e05c98e-77b0-4915-8143-0dfc77a54d65" }
      ]
    },
    {
      "id": "0a9bc9fc-778a-46c6-8a3c-805d38acdf96",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "6e936a85-24fe-4d69-9b0c-505918b2a179" },
        { "group_id": "ee6bc9ca-b4c8-4141-b6f7-a776e43a76d9" },
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }
      ]
    },
    {
      "id": "0bc65240-322b-411f-b417-51493db1fae4",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "0e971e4f-250f-455b-bdfa-94d98c6a265b",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "11976bee-41e5-4dc0-af9a-b6e41066b7bf",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "1415e537-feef-44a5-a2a3-7d969d9614f9",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "1515cee3-2216-4da4-89ab-808e598cc0f2",
      "local_printing_enabled": false,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": []
    },
    {
      "id": "17b582c2-e85e-415f-8543-b1d6bc1b0e0b",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" },
        { "group_id": "9e05c98e-77b0-4915-8143-0dfc77a54d65" }
      ]
    },
    {
      "id": "1bc49eee-b955-4aa1-9b30-7dca85d9d003",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
    },
    {
      "id": "1be0e1eb-7946-4c95-9d7d-f18f3400cb64",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "94bfe7e4-8886-4e98-904c-203d323ebb21" },
        { "group_id": "d9219223-5856-45c1-8f94-e8e889f5e711" },
        { "group_id": "7d115501-a16f-493c-9130-8372bcc642fd" },
        { "group_id": "e2a4a00d-32ba-4f60-a1e2-3feae9ed0cb0" },
        { "group_id": "9e05c98e-77b0-4915-8143-0dfc77a54d65" },
        { "group_id": "658a1b3b-173c-4f55-8150-42e16bd27f96" }
      ]
    },
    {
      "id": "1dade49c-d960-4ddd-a55b-864bcce8dae1",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "ee6bc9ca-b4c8-4141-b6f7-a776e43a76d9" },
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }
      ]
    },
    {
      "id": "1dffceb4-aef9-4899-ad78-07e2d6496651",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" },
        { "group_id": "9e05c98e-77b0-4915-8143-0dfc77a54d65" }
      ]
    },
    {
      "id": "2240b921-964c-4e79-a6e6-144a7a89b944",
      "local_printing_enabled": true,
      "self_service_enabled": true,
      "myprinters_enabled": false,
      "groups": [
        { "group_id": "ee6bc9ca-b4c8-4141-b6f7-a776e43a76d9" },
        { "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }
      ]
    }
  ]
}
```

## Read users from a specific group

To read all users from a specific group

- Also not necessary to pass anything in the `data` because group will be searched by _id_

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/users'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |
|  Data  |    Groups     |   [{group_id : <id>}]   |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/users' \
      -H "Authorization:Bearer <Access Token>"  \
      -d "{
           "groups" :[{"group_id":"8228b289-2926-4813-8267-c61c767e55f0"}]
         }"
```

<br>
Example Response

```json
{
  "count":3,
  "next":null,
  "previous":null,
      "results":
      [{"id":"9f2e2cc1-58ee-4426-998f-62644895f162","local_printing_enabled":true,"self_service_enabled":false,"myprinters_enabled":true,"groups":[{"group_id":"8228b289-2926-4813-8267-c61c767e55f0"}]}
      {"id":"99e3ca15-fafc-4e37-a741-842e1ae4ad07","local_printing_enabled":true,"self_service_enabled":false,"myprinters_enabled":true,"groups":[{"group_id":"8228b289-2926-4813-8267-c61c767e55f0"}]},{"id":"45f9c5f0-2408-4980-bbf0-f091884340ed","local_printing_enabled":true,"self_service_enabled":false,"myprinters_enabled":true,"groups":[{"group_id":"8228b289-2926-4813-8267-c61c767e55f0"}]}]}

}
```

## read a specific user by _id_

Each user have his own _id_ ,which is associated to the specific group. User can be a part of more than one group.

- Also not necessary to pass anything in the `data` because group will be searched by _id_

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/users/<id>'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/users/0050a068-cc7b-4490-951a-06920a610ee5' \
      -H "Authorization:Bearer <Access Token>"  \
      -d "{

         }"
```

<br>
Example Response

```json
{
  "id": "0050a068-cc7b-4490-951a-06920a610ee5",
  "local_printing_enabled": true,
  "self_service_enabled": true,
  "myprinters_enabled": false,
  "groups": [{ "group_id": "19b5963a-35eb-416c-9ca4-a4c2950385fb" }]
}
```

## Add users into the group
