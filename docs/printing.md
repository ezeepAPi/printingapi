# Print API reference

To print using the ezeep print api first you will need to work through the Authentication process and have a valid access token. You can now use this token to work through the following steps of the printing process.

- Get printer
- Prepare an upload
- Upload a file
- Print

## Base URL

```shell
https://printapi.ezeep.com/

```

## Get Configuration

With this request, you can retreive details of the currently authenticated user and related system configuration parameters . It is used to determine which filetypes are supported for printing (_System:FILEEXT_)

```shell
Get https://printapi.ezeep.com/sfapi/GetConfiguration/
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

Example Request:

```shell
curl -X Get 'https://printapi.ezeep.com/sfapi/GetConfiguration/' \
     -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhb...."
```

Example response:

The response contains a list of available printers

```json
{
    "Drivers": {
        "PrinterDynamic": "0e651413e003e36de6781cfe227a9cc2",
        "PrinterStatic": "ee527381ab6ab5d4aba89f8ec2fd5d2c"
    },
    "Folders": [
        {
            "export": "",
            "id": 1,
            "op": 3
        }

    ],
    "SFForms": {
        "$Count": 0
    },
    "Shell": [],
    "System": {
        "BW": 0,
        "CONNECT": ":4001",
        "CONNECTEX": ":4001",
        "DocProvUplInterval": 60,
        "FILEEXT": "bmp;csv;doc;docm;docx;dot;dotm;dotx;eml;gif;htm;html;jpeg;jpg;log;mht;mhtml;odf;odg;odm;odp;odt;otg;oth;otp;ott;pdf;png;pot;potm;potx;pps;ppsx;ppt;pptm;pptx;rtf;scp;sda;sdd;sds;sdw;sgl;smf;sti;stw;sxd;sxg;sxi;sxm;sxw;tif;tiff;tpf;txt;vor;wtx;xls;xlsb;xlsm;xlsx;xlt;xltm;xltx;xml;xps;",
        "HOST": "https://vm-mfkym5000000:443",
        "HOSTEX": "https://vm-mfkym5000000:443",
        "MaxLocalPreviewFileSize": 16777216,

    },

}...........
```

| Section   | Attribute  | Type   | Description                                     |
| --------- | ---------- | ------ | ----------------------------------------------- |
| `System ` | `FILEEXT ` | string | list of supported file formats (file extension) |

## Get Printer

Requests a list of printers available to the user

```shell
  GET  https://printapi.ezeep.com/sfapi/GetPrinter/
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

Example Request:

The response contains a list of available printers:

```shell
curl -X GET 'https://printapi.ezeep.com/sfapi/GetPrinter/'  \
     -H "Authorization:Bearer <access_token>"
```

Example Response:

```json
[
  {
    "id": "2fd4f571-7c2e-4042-8fc5-1d736f532e88",
    "location": "Parallel Universe 2b-α-3187",
    "name": "printer 6"
  },
  {
    "id": "9620e656-b39b-49ba-a653-a3f168575ec2",
    "location": "",
    "name": "printer01"
  }
]
```

## Get Printer Properties

Returns further properties of the printer by printer id.

```
 GET https://printapi.ezeep.com/sfapi/GetPrinterProperties/
```

| Attribute       | Type   | Required | Description                                                                                            |
| --------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| `Authorization` | Header | yes      | Bearer {{Access Token}}                                                                                |
| `printer`       | string | no       | The name of the printer. If it is empty, printerproperties of all available printers will be returned. |
| `id`            | string | no       | The id of the printer. If it is empty, printerproperties of all available printers will be returned.   |

Specify either printer_name or printer_id. ezeep is following Microsofts DEVMODE for printer properties. You can find a [detailed specification here](https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)

Example Request:

```shell
curl -X GET \
     "https://printapi.ezeep.com/sfapi/GetPrinterProperties/?id=016bc036-2498-431e-84c6-14552639f515" \
     -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9."

```

Example response:

```json
[
  {
    "Collate": true,
    "Color": false,
    "Driver": "",
    "DuplexMode": 0,
    "DuplexSupported": false,
    "Id": "9620e656-b39b-49ba-a653-a3f168575ec2",
    "Location": "",
    "MaxXExtent": 0,
    "MaxYExtent": 0,
    "Name": "printer01",
    "OrientationsSupported": ["portrait", "landscape"],
    "OrientationsSupportedId": [1, 2]
  }
]
```

```json
[
  {'Collate': True,
  'Color': True,
   'Driver': 'HP Color LaserJet Pro MFP M477 PCL 6',
   'DuplexMode': 2,
    'DuplexSupported': True,
     'Id': '016bc036-2498-431e-84c6-14552639f515',
      'Location': '',
       'MediaSupported': ['Auto', 'Letter', 'Legal', 'Executive', 'Oficio 8.5 x 13', '4x6', '5x8', 'A4', 'A5', 'A6', 'B5 (JIS)', 'B6 (JIS)', '10x15cm', 'Oficio 216x340 mm', '16K 195x270 mm', '16K 184x260 mm', '16K 197x273 mm', 'Japanese Postcard', 'Double Japan Postcard Rotated', 'Envelope #10', 'Envelope Monarch', 'Envelope B5', 'Envelope C5', 'Envelope DL', 'Youkei 3', 'Youkei 4', 'Youchoukei 3', None], 'MediaSupportedId': [0, 1, 5, 7, 41, 511, 510, 9, 11, 70, 13, 88, 509, 508, 507, 506, 505, 43, 82, 20, 37, 34, 28, 27, 448, 449, 450, 0],
        'Name': 'HP MFP M477 (91 6.OG)',
         'OrientationsSupported': ['portrait', 'landscape'],
         'OrientationsSupportedId': [1, 2],
         'PaperFormats': [{'Id': 0, 'Name': 'Auto', 'XRes': 0, 'YRes': 0}, {'Id': 1, 'Name': 'Letter', 'XRes': 2159, 'YRes': 2794}, {'Id': 5, 'Name': 'Legal', 'XRes': 2159, 'YRes': 3556}, {'Id': 7, 'Name': 'Executive', 'XRes': 1842, 'YRes': 2667}, {'Id': 41, 'Name': 'Oficio 8.5 x 13', 'XRes': 2159, 'YRes': 3302}, {'Id': 511, 'Name': '4x6', 'XRes': 1016, 'YRes': 1524}, {'Id': 510, 'Name': '5x8', 'XRes': 1270, 'YRes': 2032}, {'Id': 9, 'Name': 'A4', 'XRes': 2100, 'YRes': 2970}, {'Id': 11, 'Name': 'A5', 'XRes': 1480, 'YRes': 2100}, {'Id': 70, 'Name': 'A6', 'XRes': 1050, 'YRes': 1480}, {'Id': 13, 'Name': 'B5 (JIS)', 'XRes': 1820, 'YRes': 2570}, {'Id': 88, 'Name': 'B6 (JIS)', 'XRes': 1280, 'YRes': 1820}, {'Id': 509, 'Name': '10x15cm', 'XRes': 1000, 'YRes': 1500}, {'Id': 508, 'Name': 'Oficio 216x340 mm', 'XRes': 2159, 'YRes': 3400}, {'Id': 507, 'Name': '16K 195x270 mm', 'XRes': 1950, 'YRes': 2700}, {'Id': 506, 'Name': '16K 184x260 mm', 'XRes': 1840, 'YRes': 2600}, {'Id': 505, 'Name': '16K 197x273 mm', 'XRes': 1970, 'YRes': 2730}, {'Id': 43, 'Name': 'Japanese Postcard', 'XRes': 1000, 'YRes': 1480}, {'Id': 82, 'Name': 'Double Japan Postcard Rotated', 'XRes': 1480, 'YRes': 2000}, {'Id': 20, 'Name': 'Envelope #10', 'XRes': 1048, 'YRes': 2413}, {'Id': 37, 'Name': 'Envelope Monarch', 'XRes': 984, 'YRes': 1905}, {'Id': 34, 'Name': 'Envelope B5', 'XRes': 1760, 'YRes': 2500}, {'Id': 28, 'Name': 'Envelope C5', 'XRes': 1620, 'YRes': 2290}, {'Id': 27, 'Name': 'Envelope DL', 'XRes': 1100, 'YRes': 2200}, {'Id': 448, 'Name': 'Youkei 3', 'XRes': 980, 'YRes': 1480}, {'Id': 449, 'Name': 'Youkei 4', 'XRes': 1050, 'YRes': 2350}, {'Id': 450, 'Name': 'Youchoukei 3', 'XRes': 1200, 'YRes': 2350}, {'Id': 0, 'XRes': 0, 'YRes': 0}], 'Resolutions': ['Auto', '600'], 'TPUID': 1}
  ]

```

## Prepare file upload

Uploads a file to print.

```shell
GET https://printapi.ezeep.com/sfapi/PrepareUpload/
```

|  Type  |      Key      |          Value          |
| :----: | :-----------: | :---------------------: |
| Header | Authorization | Bearer {{Access Token}} |

Example request:

```shell
curl -X GET 'https://printapi.ezeep.com/sfapi/PrepareUpload/' \
     -H "Authorization:Bearer <access__token>"
```

Example Response:

The response will include the file id of your new document as well as the sasURI which we will use for the upload later on:

```json
{
  "fileid": "ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed",
  "sasUri": "https://rndsvcezp.blob.core.windows.net/userstorage/ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed?sv=2018-03-28&sr=b&sig=FxuLjL2Kids9Ww60dqQ6FlqscTTccKFBwk%2Ft0Tyf%2BM0%3D&se=2020-05-22T15%3A45%3A12Z&sp=wl"
}
```

## File Upload

Uploads a file to print.

```shell
PUT {{sasURI}}
```

|  Type  |      Name      |                    Value                     |
| :----: | :------------: | :------------------------------------------: |
| Header | x-ms-blob-type |                  BlockBlob                   |
| Header |  Content-Type  |             multipart/form-data              |
|  File  |   Fileupload   | file=test@C:/Users/User/Desktop/testfile.pdf |

Example request:

```shell
curl -X PUT  \
      "https://rndsvcezp.blob.core.windows.net/userstorage/ERI_db66aea1-f702-4a0a-b2ee-37a7cdacd376
       sv=2019-07-07&sr=b&sig=9y%2Fs5gOgVZgxI2ap634TnKQzilTmTcicCOOIWYVVnNs%3D&se=2021-02-08T23%3A06%3A52Z&sp=wl"
    -H "x-ms-blob-type: BlockBlob" \
    -H "Content-Type:multipart/form-data" \
    -F "file=test@C:/Users/User/Desktop/testfile.pdf"
```

If successful, you will receive an empty HTTP 201 (created) response.

## Print an uploaded file

Prints a file that you have uploaded.

```shell
POST https://printapi.ezeep.com/sfapi/Print/
```

Parameters:

| Attribute                 | Type   | Required | Description                                                                                                                                 |
| ------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `fileid`                  | string | yes      | Id of the uploaded file. See `PrepareUpload`                                                                                                |
| `type`                    | string | yes      | Type of the file. (e.g. txt)                                                                                                                |
| `alias`                   | string | no       | Original name of file/document. If it is empty, the fileid will be used.                                                                    |
| `printerid`               | string | yes      | Id of the printer. See `GetPrinterProperties`.                                                                                              |
| `printanddelete`          | bool   | no       | If `true` the uploaded document will be deleted after printing. If `false` the uploaded document remains on the server. Default is `false`. |
| `properties[paper]`       | string | no       | Size of the paper. See `GetPrinterProperties`                                                                                               |
| `properties[paperid]`     | int    | no       | Id of of paper size. See `GetPrinterProperties`                                                                                             |
| `properties[color]`       | bool   | no       | Enable color. See `GetPrinterProperties`                                                                                                    |
| `properties[duplex]`      | bool   | no       | Enable duplex. See `GetPrinterProperties`                                                                                                   |
| `properties[duplexmode]`  | int    | no       | Duplex mode. See `GetPrinterProperties`                                                                                                     |
| `properties[orientation]` | int    | no       | Orientation mode. See `GetPrinterProperties`                                                                                                |
| `properties[copies]`      | int    | no       | Count of copies. See `GetPrinterProperties`                                                                                                 |
| `properties[resolution]`  | string | no       | DPI / quality . See `GetPrinterProperties`                                                                                                  |

Example request:

The request parameters need to be sent in the body in JSON format.

```shell
curl -X POST 'https://printapi.ezeep.com/sfapi/Print' \
     -H 'Content-Type':'application/json' \
     -H 'Authorization':'Bearer <token>' \
     -d "{
         'fileid':'<fileid>',
         'printerid':'<printerid>',
         'type':'pdf',
         'properties' : {"OrientationsSupported":"landscape"}
         }"
```

Example Response:

```json
{
  "jobid": "ezprnds-d000001:HP Un_tpcb_788_7863578#2031753094:4"
}
```

## Print a file referenced by URL

Target documents's URL must be public reachable and must contain all information needed to download the file (e.g. _authorization information_ if needed).

Request and response are more or less the same as for [Print an uploaded file](Print%20an%20uploaded%20file). **But** the JSON attribute _fileid_ is replaced by _fileurl_.
Since the file is downloaded in background it's not unlikely (depending on file's size) that printing can't start immediately. In this case you will receive _HTTP 412 Precondition failed_ and the response provides you a _fileid_ you can use for [Print an uploaded file](Print%20an%20uploaded%20file).

```shell
POST https://printapi.ezeep.com/sfapi/Print/
```

Parameters:

| Attribute                 | Type   | Required | Description                                                                                                                                 |
| ------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `fileurl`                 | string | yes      | URL of the file to print                                                                                                                    |
| `type`                    | string | yes      | Type of the file. (e.g. txt)                                                                                                                |
| `alias`                   | string | no       | Original name of file/document. If it is empty, the fileid will be used.                                                                    |
| `printerid`               | string | yes      | Id of the printer. See `GetPrinterProperties`.                                                                                              |
| `printanddelete`          | bool   | no       | If `true` the uploaded document will be deleted after printing. If `false` the uploaded document remains on the server. Default is `false`. |
| `properties[paper]`       | string | no       | Size of the paper. See `GetPrinterProperties`                                                                                               |
| `properties[paperid]`     | int    | no       | Id of of paper size. See `GetPrinterProperties`                                                                                             |
| `properties[color]`       | bool   | no       | Enable color. See `GetPrinterProperties`                                                                                                    |
| `properties[duplex]`      | bool   | no       | Enable duplex. See `GetPrinterProperties`                                                                                                   |
| `properties[duplexmode]`  | int    | no       | Duplex mode. See `GetPrinterProperties`                                                                                                     |
| `properties[orientation]` | int    | no       | Orientation mode. See `GetPrinterProperties`                                                                                                |
| `properties[copies]`      | int    | no       | Count of copies. See `GetPrinterProperties`                                                                                                 |
| `properties[resolution]`  | string | no       | DPI / quality . See `GetPrinterProperties`                                                                                                  |

Example request:

```shell
curl -X "https://printapi.ezeep.com/sfapi/Print" \
     -H "Content-Type:application/json" \
     -H "Authorization:Bearer eyJ0eXAiOiJKV1..." \
     -d "{
         'fileurl':'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf','printerid':'016bc036-2498-431e-84c6-14552639f515',
         'type':'pdf',
         'properties' : {"OrientationsSupported":"landscape"}
        }"
```

Example Response if file has printed:

```json
{
  "jobid": "ezprnds-d000001:HP Un_tpcb_788_7863578#2031753094:4"
}
```

Example response if file is still uploading (larger files):

```json
{
  "fileid": "ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed",
  "sasUri": ""
}
```

## Get Status

You can retrieve information on the printjob state with the following request:

```
GET https://printapi.ezeep.com/sfapi/Status/?:id
```

Parameters:

| Attribute | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `id `     | string | yes      | The Job identifier. See `Print`. |

Example request:

```shell
curl -X GET \
 "https://printapi.ezeep.com/sfapi/status/?id=ezprnds-p00000M:HP%20Co_tpcb_4936_114813343#1801071420:1" \
 -H "Authorization: Bearer <access__token"

```

Example response:

```json
{
  "jobpagesprinted": 0,
  "jobpagestotal": 1,
  "jobposition": 1,
  "jobstatus": 129,
  "jobstatusstring": "PRINTING|RETAINED|"
}
```

## Status Codes

| Status Code | Description                                     |
| ----------- | ----------------------------------------------- |
| 1246        | INFO: no status available yet, keep asking      |
| 129         | INFO: print job processing is running           |
| 0           | INFO: print job successfully finished           |
| 3011        | ERROR: something went wrong - restart print job |
| 2           | ERROR: invalid print job identifier             |

These codes are **expected** and should be handled adequately.

## Error codes

Stuck with an error code? We are using Microsoft error codes that are represented by an integer. Find a comprehensive list here: https://docs.microsoft.com/en-us/windows/win32/debug/system-error-codes
