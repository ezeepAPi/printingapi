# Printer Drivers

Drivers act as traslator between hardware and the applications that use it.Printers connected to the hub further calimed to ezeep blue with conncectors and after important step is to attach particular drivers with the printer.

- Get all vendor lists
- Get available drivers from specific vendor
- Add driver into the printers

## Get all vendor lists

Total 79 vendors are available in the ezeep blue,to use the printer important is to add correct drivers.If any vendor is not available in the response then client can send email to <helpdesk@ezeep.com> for help.
To get the all list of vendors run the give example request:

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/drivers/vendors/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/drivers/vendors/' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

```json
[
  "206ci",
  "2550ci",
  "256ci",
  "256i",
  "306i",
  "Apollo",
  "Avery",
  "BIXOLON",
  "Boca",
  "Brother",
  "cab",
  "Canon",
  "Casio",
  "Citizen",
  "Cognitive",
  "D-O",
  "Datamax-O'Neil",
  "Dell",
  "DYMO",
  "ELGIN",
  "Epson",
  "Foobar",
  "Fuji Xerox",
  "Fujitsu",
  "Generic",
  "Gestetner",
  "Honywell",
  "HP",
  "IBM",
  "Imagio",
  "InfoPrint",
  "infotec",
  "Infotech",
  "KIP",
  "KONICA",
  "Kyocera",
  "Lanier",
  "Lenovo",
  "Lexmark",
  "LG",
  "Microsoft",
  "Multi-model",
  "Munbyn",
  "NEC",
  "NRG",
  "OCE",
  "OKI",
  "Other",
  "P-4030D",
  "P-4030DN",
  "P-4530DN",
  "P-5030DN",
  "P-6030DN",
  "P-C4580DN",
  "P-C5580DN",
  "P-C8600DN",
  "Panasonic",
  "Panduit",
  "Pantum",
  "PCL6",
  "Printronix",
  "Ricoh",
  "Samsung",
  "Savin",
  "Sharp",
  "Smart",
  "Sony",
  "Star",
  "Tally",
  "Tektronix",
  "Toshiba",
  "Triumph Adler",
  "TSC",
  "TYPE",
  "UTAX",
  "UTAX_TA",
  "WiPro",
  "Xerox",
  "ZDesigner",
  "Zebra"
]
```

## Get available drivers from specific vendor

For one vendor exist alot of drivers e.g. for dell it gives 16 types of drivers. Client should have to find exact driver for the printer and then add that driver to the printer. In response client get the _driver_id_ for all of the drivers which further can be use to add that into printer.

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/drivers/?vendor=<vendor_name>'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/drivers/?vendor=Lenovo' \
      -H "Authorization:Bearer <Access Token>"
```

<br>
Example Response

In example response it is given that two types of drivers are availaible for the vendor _Lenovo_.

```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "cc204437-ddda-4e70-a335-845a646f682e",
      "name": "Lenovo LJ3800DN",
      "readable_name": "Lenovo LJ3800DN",
      "vendor": "Lenovo",
      "os": "Windows",
      "arch": "x64",
      "printers_using_driver": 1,
      "blob_capabilities": {
        "options": 2,
        "count": 6,
        "capabilities": "H4sIAAAAAAACC41V224TQQz1p+wjVEXanZm9zGMaWombhAT9gKiEgtQ2UikIfizfx/GxZ5JNQkVWm/WOx8f2scd7JqOcy0J+ypNspJFPspY73Dd4F+mg+yyPspI/kEWC9DJh7YN8xN6iEUlcW8kDcFaw11/GWoBVi0ulDE8tfSXZ4g6Q7T9gvQOyShOuBOsz+g5cN6QRT/XzHtE94VrD+zHOyD2BvjJw+hlKxLOXwVFuGesW73GGESlFrIzMWhnqGJfFNODStUv5TaaUu+/yC/Icq6O9xaO8BTLaUZPw3s4YWmCP2rd79rFmbwwJ9M/ZN8hrgyrcQrqUL3iu/wPT6qI4vUsFfQHbuX1mJQ0n0zoyQ8118Ih6j+jiREYD7XRXoh8hnxN12f1b9Vrf/w65vHBtA8Yb1zdyj+vlkYfJIwzkqncPuxq2rjv2oNriYXjGw8hoLNNdDtlzsGw0xngih3EvhzjzEGc57HotMYeOesuusGx1eytvcGqbf7CdK9tTjdTqFWq1S+UujqrdcV92rNERSrcksmqV1OiW6L17eUXdPKNco44848L8Db/Mh+DSa/TwYc+NdZoUviePKVTrTGl5goVUWQiMWnt2JO7kXGT2vs4wPT0rTJYb+XaQw+STo9RAvMPOyV9wTq0m0avcH2AMPH2W9+R1TQcTSrtG914hljvMlc0zEyqweuIdVyZsqlwusGfryKWjJvJh78Zm57h9jX7wc7LrrXTAqlY97c1UY3V/Tie8d4xMZ63Nose9aIL391hz09ztGzOcZPVafhCjQY+s5Su4eSDy/CugiOOMYyGnLb8qg0udc6S/xm/h+8Ra726bt1J5sgoJe9q8CXi2iun3xmK+IpLKLSesWWqnLbkyVF3y8yT1PIpPjkCvfwErgygWogcAAA=="
      }
    },
    {
      "id": "5c7c7372-8d32-4a23-9490-67328264e7a1",
      "name": "Lenovo LJ3700D",
      "readable_name": "Lenovo LJ3700D",
      "vendor": "Lenovo",
      "os": "Windows",
      "arch": "x64",
      "printers_using_driver": 0,
      "blob_capabilities": {
        "options": 2,
        "count": 6,
        "capabilities": "H4sIAAAAAAACC41V224TQQz1p+wjVEXanZm9zGMaWombhAT9gKiEgtQ2UikIfizfx/GxZ5JNQkVWm/WOx8f2scd7JqOcy0J+ypNspJFPspY73Dd4F+mg+yyPspI/kEWC9DJh7YN8xN6iEUlcW8kDcFaw11/GWoBVi0ulDE8tfSXZ4g6Q7T9gvQOyShOuBOsz+g5cN6QRT/XzHtE94VrD+zHOyD2BvjJw+hlKxLOXwVFuGesW73GGESlFrIzMWhnqGJfFNODStUv5TaaUu+/yC/Icq6O9xaO8BTLaUZPw3s4YWmCP2rd79rFmbwwJ9M/ZN8hrgyrcQrqUL3iu/wPT6qI4vUsFfQHbuX1mJQ0n0zoyQ8118Ih6j+jiREYD7XRXoh8hnxN12f1b9Vrf/w65vHBtA8Yb1zdyj+vlkYfJIwzkqncPuxq2rjv2oNriYXjGw8hoLNNdDtlzsGw0xngih3EvhzjzEGc57HotMYeOesuusGx1eytvcGqbf7CdK9tTjdTqFWq1S+UujqrdcV92rNERSrcksmqV1OiW6L17eUXdPKNco44848L8Db/Mh+DSa/TwYc+NdZoUviePKVTrTGl5goVUWQiMWnt2JO7kXGT2vs4wPT0rTJYb+XaQw+STo9RAvMPOyV9wTq0m0avcH2AMPH2W9+R1TQcTSrtG914hljvMlc0zEyqweuIdVyZsqlwusGfryKWjJvJh78Zm57h9jX7wc7LrrXTAqlY97c1UY3V/Tie8d4xMZ63Nose9aIL391hz09ztGzOcZPVafhCjQY+s5Su4eSDy/CugiOOMYyGnLb8qg0udc6S/xm/h+8Ra726bt1J5sgoJe9q8CXi2iun3xmK+IpLKLSesWWqnLbkyVF3y8yT1PIpPjkCvfwErgygWogcAAA=="
      }
    }
  ]
}
```

## Add driver to the printers

To add drivers into the printers, five things required `printer_id`,`connector_id`,`name`,`status` of the printer and `driver_id` .[Here](../connectors/README.md) we describe how to get the information of any printer connected to the hub and in example respone client will get the connector_id and printer_id. In above example request it is given how to get driver_id.

<br>

```shell
GET 'https://api2.ezeep.com/printing/v1/printers/420309d2-0ae4-46ac-a7c6-61d5878fda93/'
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |
|  Data  |     name      |   name of the printer   |
|  Data  |    status     |         online          |
|  Data  | connector_id  |     <connector_id>      |
|  Data  |   driver_id   |       <driver_id>       |

<br>
Example Request

```shell
curl  -X GET 'https://api2.ezeep.com/printing/v1/printers/420309d2-0ae4-46ac-a7c6-61d5878fda93/' \
      -H "Authorization:Bearer <Access Token>"
      -d {
           "name":"HP Color LaserJet MFP M477fdn",
           "status":"Online",
           "connector_id":"534fcfcf-0dbc-4d14-844b-cba482e20b06",
           "driver_id":"cc204437-ddda-4e70-a335-845a646f682e"
      }
```

<br>
Example Response

In the examle response give that driver of printer changed before it was drivers from dell and Lenovo drivers are added.

```json
{
  "id": "420309d2-0ae4-46ac-a7c6-61d5878fda93",
  "name": "HP Color LaserJet MFP M477fdn",
  "tp_id": 1,
  "status": "Online",
  "vendor_name": "",
  "model_name": "HP Color LaserJet MFP M477fdn",
  "location": "",
  "connector_id": "534fcfcf-0dbc-4d14-844b-cba482e20b06",
  "driver_id": null,
  "manual_driver_id": "cc204437-ddda-4e70-a335-845a646f682e",
  "supported_formats": [],
  "blob_capabilities": {
    "Options": 2,
    "Count": 6,
    "Capabilities": "H4sIAAAAAAACC41V224TQQz1p+wjVEXanZm9zGMaWombhAT9gKiEgtQ2UikIfizfx/GxZ5JNQkVWm/WOx8f2scd7JqOcy0J+ypNspJFPspY73Dd4F+mg+yyPspI/kEWC9DJh7YN8xN6iEUlcW8kDcFaw11/GWoBVi0ulDE8tfSXZ4g6Q7T9gvQOyShOuBOsz+g5cN6QRT/XzHtE94VrD+zHOyD2BvjJw+hlKxLOXwVFuGesW73GGESlFrIzMWhnqGJfFNODStUv5TaaUu+/yC/Icq6O9xaO8BTLaUZPw3s4YWmCP2rd79rFmbwwJ9M/ZN8hrgyrcQrqUL3iu/wPT6qI4vUsFfQHbuX1mJQ0n0zoyQ8118Ih6j+jiREYD7XRXoh8hnxN12f1b9Vrf/w65vHBtA8Yb1zdyj+vlkYfJIwzkqncPuxq2rjv2oNriYXjGw8hoLNNdDtlzsGw0xngih3EvhzjzEGc57HotMYeOesuusGx1eytvcGqbf7CdK9tTjdTqFWq1S+UujqrdcV92rNERSrcksmqV1OiW6L17eUXdPKNco44848L8Db/Mh+DSa/TwYc+NdZoUviePKVTrTGl5goVUWQiMWnt2JO7kXGT2vs4wPT0rTJYb+XaQw+STo9RAvMPOyV9wTq0m0avcH2AMPH2W9+R1TQcTSrtG914hljvMlc0zEyqweuIdVyZsqlwusGfryKWjJvJh78Zm57h9jX7wc7LrrXTAqlY97c1UY3V/Tie8d4xMZ63Nose9aIL391hz09ztGzOcZPVafhCjQY+s5Su4eSDy/CugiOOMYyGnLb8qg0udc6S/xm/h+8Ra726bt1J5sgoJe9q8CXi2iun3xmK+IpLKLSesWWqnLbkyVF3y8yT1PIpPjkCvfwErgygWogcAAA=="
  },
  "pnp_id": "",
  "auto_driver_assignment_state": "SKIPPED",
  "can_modify_favorite": false,
  "is_favorite": false
}
```
