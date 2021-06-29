# Printers

## Get the printers associated to user

Printer is connected to a group and user can be a part of multiple groups. To check the printer accesibility by a user,first all of the [groups in which user is a part of](groups.md/##-Get-total-register-groups-with-a-user) should be noted.

- In example request user*id(\_cbe182e3-d726-4055-9459-f23bd0a73d78*) is a part of two groups, that's why user can use all of the printer which are associated with both groups.

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/assignments/?group=<group_id>'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/assignments/?group=8228b289-2926-4813-8267-c61c767e55f0' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "printer_id": "b5e91fac-88a2-42fb-83d3-e0f0e7990364",
      "printer_name": "ZDesigner GK420t 234",
      "assignments": [
        {
          "settings": null,
          "groups": [
            {
              "group_id": "8228b289-2926-4813-8267-c61c767e55f0",
              "group_name": "free",
              "group_foreign_id": null,
              "force_chosen": false
            }
          ]
        }
      ]
    },
    {
      "printer_id": "30dbc200-f01e-4c59-9922-e5b02ee281cd",
      "printer_name": "Canon MG3600 series",
      "assignments": [
        {
          "settings": null,
          "groups": [
            {
              "group_id": "359bf1fb-eb55-40e4-b7e4-8c637f5f549c",
              "group_name": "test2",
              "group_foreign_id": null,
              "force_chosen": false
            },
            {
              "group_id": "bd63ffd9-6904-46ec-b271-b258a59f07a5",
              "group_name": "test",
              "group_foreign_id": null,
              "force_chosen": false
            },
            {
              "group_id": "8228b289-2926-4813-8267-c61c767e55f0",
              "group_name": "free",
              "group_foreign_id": null,
              "force_chosen": false
            }
          ]
        }
      ]
    },
    {
      "printer_id": "5a3deccc-8334-4512-9162-0bdfe8cc3552",
      "printer_name": "Canon MG3600 series Printer",
      "assignments": [
        {
          "settings": null,
          "groups": [
            {
              "group_id": "8228b289-2926-4813-8267-c61c767e55f0",
              "group_name": "free",
              "group_foreign_id": null,
              "force_chosen": false
            }
          ]
        }
      ]
    },
    {
      "printer_id": "4d7901a5-dcc6-4fd9-aa64-e3fe0604d53d",
      "printer_name": "TSC TE210x",
      "assignments": [
        {
          "settings": null,
          "groups": [
            {
              "group_id": "8228b289-2926-4813-8267-c61c767e55f0",
              "group_name": "free",
              "group_foreign_id": null,
              "force_chosen": false
            }
          ]
        }
      ]
    },
    {
      "printer_id": "15abe3b7-7711-401e-9dec-1add57eb888e",
      "printer_name": "TSC TE210",
      "assignments": [
        {
          "settings": null,
          "groups": [
            {
              "group_id": "8228b289-2926-4813-8267-c61c767e55f0",
              "group_name": "free",
              "group_foreign_id": null,
              "force_chosen": false
            }
          ]
        }
      ]
    },
    {
      "printer_id": "176f7433-48b1-43c0-bf5f-637c0d831bdd",
      "printer_name": "Canon Generic UFR II Driver",
      "assignments": [
        {
          "settings": null,
          "groups": [
            {
              "group_id": "8228b289-2926-4813-8267-c61c767e55f0",
              "group_name": "free",
              "group_foreign_id": null,
              "force_chosen": false
            }
          ]
        }
      ]
    }
  ]
}
```

- user can use all those 6 printers from this group and same request can be send for other group by changing the `group_id`.
