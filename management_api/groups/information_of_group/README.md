# Information of Group

1. update group information
2. Delete a group

## Updade gorup information

Each group get a specific _id_ ,user can delete that specific group by using this _id_

<br>

```shell
PATCH 'https://api2.ezeep.com/printing/v1/groups/<id>/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |
|  Data  |     name      | str(name of the group)  |
|  Data  |  description  | str(group description)  |

<br>
Example Request

```shell
curl  -X Patch 'https://api2.ezeep.com/printing/v1/groups/bd63ffd9-6904-46ec-b271-b258a59f07a5/' \
      -H "Authorization:Bearer <Access Token>" \
      -D {
          "name" : "test-2",
          "description" : "this is test group"
       }
```

<br>
Example Response

```shell

    {
        "id":"bd63ffd9-6904-46ec-b271-b258a59f07a5","name":"test-2","description":"this is test group","local_printing_enabled":false,"myprinters_enabled":false,"origin":{"provider":"Ezeep"},"organization_id":"4f0277fc-a336-4621-81f9-bea114e6fa2c","num_members":1,"num_printers":1
    }

```

## delete a group

Each group get a specific _id_ ,user can delete that specific group by using this _id_

<br>

```shell
DELETE 'https://api2.ezeep.com/printing/v1/groups/<id>/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X DELETE 'https://api2.ezeep.com/printing/v1/groups/d16eeaa2-97ba-464a-b12a-f0ed66cc6078/' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```shell

{
    204
}
```
