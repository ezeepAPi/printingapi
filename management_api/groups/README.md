# Homepage

- Create a group
- Get all groups
- Get a specific group

## create a group

to create a group required data is _name_ and _organization_id_ as mentiond in [parameters](../README.md/##-Parameters).

- In example requests only required `data` is used but you can also use other [data](../README.md/##-Parameters).
  according to your requirements.

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
      -H "Authorization:Bearer <Access Token>"
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
      "id": "8228b289-2926-4813-8267-c61c767e55f0",
      "name": "free",
      "description": "free",
      "local_printing_enabled": true,
      "myprinters_enabled": false,
      "origin": { "provider": "Ezeep" },
      "organization_id": "4f0277fc-a336-4621-81f9-bea114e6fa2c",
      "num_members": 2,
      "num_printers": 6
    },
    {
      "id": "bd63ffd9-6904-46ec-b271-b258a59f07a5",
      "name": "test",
      "description": "",
      "local_printing_enabled": false,
      "myprinters_enabled": false,
      "origin": { "provider": "Ezeep" },
      "organization_id": "4f0277fc-a336-4621-81f9-bea114e6fa2c",
      "num_members": 1,
      "num_printers": 1
    },
    {
      "id": "e882245a-9619-4de8-87e4-28ccf25435cf",
      "name": "Premium",
      "description": "extar costs",
      "local_printing_enabled": false,
      "myprinters_enabled": false,
      "origin": { "provider": "Ezeep" },
      "organization_id": "4f0277fc-a336-4621-81f9-bea114e6fa2c",
      "num_members": 0,
      "num_printers": 0
    }
  ]
}
```
