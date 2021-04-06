import requests
import json

#urls
access_token="<access token that you get in previous step>"
client_id = "<your clien_id>"
printer_url="https://printapi.ezeep.com/sfapi/GetPrinter/"
prepare_printer = "https://printapi.ezeep.com/sfapi/PrepareUpload/"
configuration_url = "https://printapi.ezeep.com/sfapi/GetConfiguration/"
printer_properties_url="https://printapi.ezeep.com/sfapi/GetPrinterProperties/"

#get configuration of printer

headers={'Authorization': access_token}
printer_cofiguration =requests.get(configuration_url,headers=headers)
print(printer_cofiguration.status_code)
print('body: ' + printer_cofiguration.text)

#get the available printers

printer_id = requests.get(printer_url,headers=headers)
print("get printer")
print(printer_id.status_code)
tokens_id = json.loads(printer_id.text)
print(tokens_id)

#get the available properties
printer_properties = requests.get(printer_properties_url + '?id=<token_id from above step>'
                                                           ,headers={'Authorization': access_token
                                                                   })
print("get printer properties")
tokens_id_1 = json.loads(printer_properties.text)
print(tokens_id_1)


#prepare for file upload in cloud
printer_upload = requests.get(prepare_printer,headers=headers)
print("prepare file upload")
tokens_printer = json.loads(printer_upload.text)
print(tokens_printer)

#upload a file
path='C:/Users/mufal/Downloads/week_9.pdf'
files = {'file': open(path,'rb')}
file_upload=requests.put(tokens_printer["sasUri"],files=files, headers={"x-ms-blob-type":"BlockBlob","Content-Type":"multipart/form-data"})
print("file upload")
print(file_upload)

#print a file
data={'fileid':tokens_printer['fileid'],'printerid':tokens_id[0]["id"],'type':'pdf'}
data=json.dumps(data)

print_job=requests.post("https://printapi.ezeep.com/sfapi/Print/",headers={'Authorization': access_token,"Content-Type":"application/json"},data=data)
print_job_json=json.loads(print_job.text)

#To check the print status

#status_url='https://printapi.ezeep.com/sfapi/Status/?:id'
#getting_status = requests.get(status_url)
#print(getting_status.text)

