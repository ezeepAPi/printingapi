# Members

1. Get all memebers
2. Add user into the groups
3. Remove user from a group
4. Get total register groups with a user

## Get all memebers

To read about all of the users information and from which group _user_ belong. All information for a specific user can be read and check which settings are enabled for a specific user.

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
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
{
  "count": 4,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "99e3ca15-fafc-4e37-a741-842e1ae4ad07",
      "local_printing_enabled": false,
      "self_service_enabled": true,
      "myprinters_enabled": true,
      "groups": [{ "group_id": "e882245a-9619-4de8-87e4-28ccf25435cf" }]
    },
    {
      "id": "9f2e2cc1-58ee-4426-998f-62644895f162",
      "local_printing_enabled": false,
      "self_service_enabled": true,
      "myprinters_enabled": true,
      "groups": [{ "group_id": "8228b289-2926-4813-8267-c61c767e55f0" }]
    },
    {
      "id": "a83b3e13-d69f-4e62-9073-cccae4e35bd9",
      "local_printing_enabled": false,
      "self_service_enabled": true,
      "myprinters_enabled": true,
      "groups": []
    },
    {
      "id": "cbe182e3-d726-4055-9459-f23bd0a73d78",
      "local_printing_enabled": false,
      "self_service_enabled": true,
      "myprinters_enabled": true,
      "groups": [{ "group_id": "8228b289-2926-4813-8267-c61c767e55f0" }]
    }
  ]
}
```

## Get all groups information

All of the existing groups can be listed,in case client didn't remeber the specific group _id_ .After getting all of the group_id, clinet can add user into specific group.

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
  "count": 2,
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
      "num_members": 3,
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
    }
  ]
}
```

## Add user into the groups

User can be a part of multiple groups.To do that need [user_id](README.md/##-Get-all-users-info) and [group_id](##-Get-all-groups-information).

- If user is already part of a _group(A)_, and client want to add user into another _group(B)_ then client should add both _groups_id(A,B)_ in the data. Otherwise if client passing only _second \_group_id(B)_ in data,then user will be removed from _group(A)_ and only be a part of _group(B)_ .

<br>

```shell
PUT 'https://api2.ezeep.com/printing/v1/users/<user_id>/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |
| groups |    groups     |      [{group_id}]       |

<br>
Example Request

```shell
curl  -X PUT 'https://api2.ezeep.com/printing/v1/users/cbe182e3-d726-4055-9459-f23bd0a73d78/' \
      -H "Authorization:Bearer <Access Token>"
      -D {
          "groups":[
              {"group_id":"8228b289-2926-4813-8267-c61c767e55f0"},{"group_id":"bd63ffd9-6904-46ec-b271-b258a59f07a5"}
              ]
        }
```

<br>
Example Response

```json
{
  "id": "cbe182e3-d726-4055-9459-f23bd0a73d78",
  "local_printing_enabled": false,
  "self_service_enabled": true,
  "myprinters_enabled": true,
  "groups": [
    {
      "group_id": "bd63ffd9-6904-46ec-b271-b258a59f07a5"
    },
    {
      "group_id": "8228b289-2926-4813-8267-c61c767e55f0"
    }
  ]
}
```

## Remove user from a group

From the above example if client want to remove user from a group whose id is `8228b289-2926-4813-8267-c61c767e55f0`.In request pass only group_ids in which client want user to a part of,from all of the groups user will be removed.

<br>

```shell
PUT 'https://api2.ezeep.com/printing/v1/users/<user_id>/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |
| groups |    groups     |      [{group_id}]       |

<br>
Example Request

```shell
curl  -X PUT 'https://api2.ezeep.com/printing/v1/users/cbe182e3-d726-4055-9459-f23bd0a73d78/' \
      -H "Authorization:Bearer <Access Token>"
      -D {
          "groups":[
              {"group_id":"8228b289-2926-4813-8267-c61c767e55f0"}
              ]
        }
```

<br>
Example Response

```json
{
  "id": "cbe182e3-d726-4055-9459-f23bd0a73d78",
  "local_printing_enabled": false,
  "self_service_enabled": true,
  "myprinters_enabled": true,
  "groups": [
    {
      "group_id": "8228b289-2926-4813-8267-c61c767e55f0"
    }
  ]
}
```

## Get total register groups with a user

Each user have his own _id_ ,which is associated to the specific group. User can be a part of more than one group.

- To check with how may groups, user is associated

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
      -H "Authorization:Bearer <Access Token>"
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
