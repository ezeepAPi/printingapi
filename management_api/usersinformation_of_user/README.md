# Information

- udpate information of a user
- Resent Invitation to a user

## udpate information of a user

Information that client can only change are _first name_, _last name_ ,_email_ and _role_ . To

```shell
PATCH 'https://account.ezeep.com/v1/users/<user_id>/
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |
|  Data  |  first_name   |       first name        |
|  Data  |   last_name   |        last name        |
|  Data  |     email     |     email of a user     |
|  Data  |     roles     |    [admin] or [user]    |

<br>
Example Request

```shell
curl  -X PATCH 'https://account.ezeep.com/v1/users/cbe182e3-d726-4055-9459-f23bd0a73d78/' \
      -H "Authorization:Bearer <Access Token>" \
      -D {
          "last_name": "falak",
          "roles" : "user"
          }
```

<br>
Example Response

```json
{
  "id": "cbe182e3-d726-4055-9459-f23bd0a73d78",
  "email": "falakmuhammadahmad@gmail.com",
  "first_name": "ahmad",
  "last_name": "falak",
  "display_name": "ahmad falak",
  "date_joined": "2021-06-22T14:15:16.343893Z",
  "azure_profile": null,
  "id_profile": null,
  "user_invitations": [
    {
      "id": "6016428a-0185-4639-9aef-4ccf4e1718a3",
      "updated": "2021-06-22T14:15:16.364398Z",
      "email": "falakmuhammadahmad@gmail.com",
      "expire_date": "2021-07-22T15:15:33Z",
      "delivery_status": "SENT",
      "invitation_status": "OPEN"
    }
  ],
  "roles": ["user"],
  "is_verified": false
}
```

## Resent Invitation to a user

when client send a invitation to any user it generate a unique _user_invitations id_ which is totally different from _user unique id_ .To resend the invitation client need the the [user_invitation id](README.md/##-Get-the-info-of-specific-user)

```shell
PATCH 'https://account.ezeep.com/v1/userinvitations/<user_id>/
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X PATCH 'https://account.ezeep.com/v1/userinvitations/6016428a-0185-4639-9aef-4ccf4e1718a3/' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
{ "id": "6016428a-0185-4639-9aef-4ccf4e1718a3" }
```
