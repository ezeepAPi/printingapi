## Introduction

Ezeep Blue Printing supports the formaiton of groups. In groups you can limit the users and also describe the purpose of the groups and much more.Following methods can be be done on groups

- Create a group
- Read a specific group by _id_
- Read all group
- Delete a group


## Preconditions

To get access to the API,given client credential can be used for authorization.

client_id : “B6zDgZi9YCyIKufRXGt1Q8RD97jsdCQNRWYFf9xK”

redirect_uri : 1. “https://www.ezeep.com” 2."http://localhost:3000/code"

We use the OAuth2 client credentials grant to let clients authorize against a set of
protected resources (e.g., organizations) that are under control of your client.

You must ensure client credentials are kept secret and not used by an application that is
incapable of maintaining their confidentiality.

More information can be found in the OAuth2 RFC 6749.

## Step-by-step

The following describes the procedure of using the ezeep REST API to create an organization, activate an azure connection,
import azure groups to ezeep to allow printing, and eventually delete the organization.

![Sequence diagram](../../quick-guides/images/integration_t.png)

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
DELETE 'https://api2.ezeep.com/printing/v1/groups/<id>'
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
