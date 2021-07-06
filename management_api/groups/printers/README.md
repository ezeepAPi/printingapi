# Printers

1. get all available printer
2. get printer connected with a specific group
3. add printers into a group
4. remove a printer from a group

## get all available printer

To add printers in a group we need `printer_id` and this request will get you all printers available.

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/assignments'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/assignments' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
{
  "count": 37,
  "next": "http://api2.ezeep.com/printing/v1/assignments/?limit=20&offset=20",
  "previous": null,
  "results": [
    {
      "printer_id": "64cd9c03-9749-4dc5-b5f2-dcc651adb5b5",
      "printer_name": "Microsoft XPS Document Writer",
      "assignments": []
    },
    {
      "printer_id": "b00f8e38-b347-46e9-b51d-d9bcaab54c2b",
      "printer_name": "AnyDesk Printer",
      "assignments": []
    },
    {
      "printer_id": "a2af8a4c-ea54-4a2c-8881-3b75b141be09",
      "printer_name": "Samsung M2070 Series",
      "assignments": []
    },
    {
      "printer_id": "dc6ddec3-2685-49a4-bdb7-b60ebd4635a9",
      "printer_name": "Invia a OneNote 2010",
      "assignments": []
    },
    {
      "printer_id": "643e8e5b-2c47-4367-bf97-5ffccab11c95",
      "printer_name": "OneNote (Desktop)",
      "assignments": []
    },
    {
      "printer_id": "845f5c81-ba14-49a4-acd8-fa1d633418a2",
      "printer_name": "OneNote for Windows 10",
      "assignments": []
    }
  ]
}
```

## get printer connected with a specific group

Client can also check the number of printers associated with a group. For that clent need [group_id](README.md) to pass it in the request.

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
    }
  ]
}
```

## add printers into a group

Client can add printers into the group by passing the `printer_id` in url and in data pass the `group_id` to do the job.

```shell
PUT 'https://api2.ezeep.com/printing/v1/assignments/<printer_id>/'
```

|  Type  |      Key      |                   Value                   |
| :----: | :-----------: | :---------------------------------------: |
| Header | Authorization |          Bearer {{Access Token}}          |
|  Data  |  assignment   | [{"groups":[{"group_id": "<group_id>"}]}] |

<br>
Example Request

```shell
curl  -X 'PUT https://api2.ezeep.com/printing/v1/assignments/15abe3b7-7711-401e-9dec-1add57eb888e/' \
      -H "Authorization:Bearer <Access Token>" \
      -D {
          "assignment":
          [{"groups":[{"group_id": "8228b289-2926-4813-8267-c61c767e55f0"}]}]
          }
```

<br>
Example Response

```json
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
}
```

## remove a printer from a group

This request is to remove any printer from the group. If we want to remove printer_id `15abe3b7-7711-401e-9dec-1add57eb888e` from the group_id `8228b289-2926-4813-8267-c61c767e55f0` , use following method

```shell
DELETE 'https://api2.ezeep.com/printing/v1/assignments/<printer_id>/'
```

|  Type  |      Key      |                   Value                   |
| :----: | :-----------: | :---------------------------------------: |
| Header | Authorization |          Bearer {{Access Token}}          |
|  Data  |  assignment   | [{"groups":[{"group_id": "<group_id>"}]}] |

<br>
Example Request

```shell
curl  -X 'DELETE https://api2.ezeep.com/printing/v1/assignments/15abe3b7-7711-401e-9dec-1add57eb888e/' \
      -H "Authorization:Bearer <Access Token>" \
      -D {
          "assignment":
          [{"groups":[{"group_id": "8228b289-2926-4813-8267-c61c767e55f0"}]}]
          }
```

<br>
Example Response

```shell
204
```
