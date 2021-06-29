# Users Homepage

- Get all users info
- Get the info of specific user
- invite a user
- Get Total invitation send requests

## Get all users info

In this request client can get the all information of a user.Some of the information are following

`id` : This is the unique id for every user

`email` : email of the user

`roles` : role of each user e.g admin or user

`First and last name` : name of the users

`invitation_status` : when inviting a user, admin can set the expiry date for each user.Here client can see if date is expired or not

`date joined` : at which date user joined

<br>

```shell
GET 'https://account.ezeep.com/v1/users'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://account.ezeep.com/v1/users' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "99e3ca15-fafc-4e37-a741-842e1ae4ad07",
      "email": "wattoorocx@gmail.com",
      "first_name": "Muhammad Ahmad",
      "last_name": "Falak",
      "display_name": "Muhammad Ahmad Falak",
      "date_joined": "2021-05-21T11:32:27.796675Z",
      "azure_profile": null,
      "id_profile": null,
      "user_invitations": [
        {
          "id": "e142a76f-0179-4afd-818c-663a821c2e2e",
          "updated": "2021-05-21T11:32:27.817491Z",
          "email": "wattoorocx@gmail.com",
          "expire_date": "2021-06-20T13:32:20.642000Z",
          "delivery_status": "SENT",
          "invitation_status": "EXPIRED"
        }
      ],
      "roles": ["user"],
      "is_verified": false
    },
    {
      "id": "9f2e2cc1-58ee-4426-998f-62644895f162",
      "email": "lisasskateboards@mailinator.com",
      "first_name": "Gav",
      "last_name": "Justin",
      "display_name": "Gav Justin",
      "date_joined": "2021-04-06T20:01:43.481259Z",
      "azure_profile": null,
      "id_profile": {
        "oid": "64064f74-024d-4a47-9915-742320cf63c9",
        "preferred_username": "lisasskateboards@mailinator.com",
        "name": ""
      },
      "user_invitations": null,
      "roles": ["admin"],
      "is_verified": true
    }
  ]
}
```

## Get the info of specific user

To get the details of the specific user, client can a send a request with the user `id`

<br>

```shell
GET 'https://account.ezeep.com/v1/users/<id>'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://account.ezeep.com/v1/users/99e3ca15-fafc-4e37-a741-842e1ae4ad07' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
{
  "id": "99e3ca15-fafc-4e37-a741-842e1ae4ad07",
  "email": "wattoorocx@gmail.com",
  "first_name": "Muhammad Ahmad",
  "last_name": "Falak",
  "display_name": "Muhammad Ahmad Falak",
  "date_joined": "2021-05-21T11:32:27.796675Z",
  "azure_profile": null,
  "id_profile": null,
  "user_invitations": [
    {
      "id": "e142a76f-0179-4afd-818c-663a821c2e2e",
      "updated": "2021-05-21T11:32:27.817491Z",
      "email": "wattoorocx@gmail.com",
      "expire_date": "2021-06-20T13:32:20.642000Z",
      "delivery_status": "SENT",
      "invitation_status": "EXPIRED"
    }
  ],
  "roles": ["user"],
  "is_verified": false
}
```

## invite a user

To invite a user client have to sent request and then request will be accepted by a user.

<br>

```shell
POST 'https://account.ezeep.com/v1/users/userinvitations
```

|  Type  |      Key      |           Value            |
| :----: | :-----------: | :------------------------: |
| Header | Authorization |  Bearer {{Access Token}}   |
|  Data  |     email     |         user_email         |
|  Data  |  expire_date  | year-month-dayThrs:min:sec |

<br>
Example Request

```shell
curl  -X POST 'https://account.ezeep.com/v1/userinvitations/' \
      -H "Authorization:Bearer <Access Token>" /
      -D {
          "email": "wattoorocx1@gmail.com",
          "expire_date": "2021-07-22T15:15:33"
        }
```

<br>
Example Response

```json
{
  "id": "9c056c16-47db-4972-a132-39d14216c3e2",
  "updated": "2021-06-22T14:07:20.922318Z",
  "email": "wattoorocx1@gmail.com",
  "expire_date": "2021-07-22T15:15:33.761000Z",
  "delivery_status": "SENT",
  "invitation_status": "OPEN"
}
```

## Check Total invitation send requests

To check in total how many requests had been sent from this account

<br>

```shell
GET 'https://account.ezeep.com/v1/users/userinvitations
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://account.ezeep.com/v1/userinvitations' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "1a130f47-04ca-4bd9-aab8-1bdab5ba3447",
      "updated": "2021-06-22T13:17:15.565108Z",
      "email": "muhammad@ezeep.com",
      "expire_date": "2021-07-22T15:15:33.761000Z",
      "delivery_status": "SENT",
      "invitation_status": "ACCEPTED"
    },
    {
      "id": "074bf6b1-28b6-415b-826c-7d4480cde685",
      "updated": "2021-05-21T11:35:30.149403Z",
      "email": "gavnewton87@gmail.com",
      "expire_date": "2021-06-20T13:35:17.892000Z",
      "delivery_status": "SENT",
      "invitation_status": "EXPIRED"
    },
    {
      "id": "e142a76f-0179-4afd-818c-663a821c2e2e",
      "updated": "2021-05-21T11:32:27.817491Z",
      "email": "wattoorocx@gmail.com",
      "expire_date": "2021-06-20T13:32:20.642000Z",
      "delivery_status": "SENT",
      "invitation_status": "EXPIRED"
    }
  ]
}
```
