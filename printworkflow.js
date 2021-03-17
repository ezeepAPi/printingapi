var axios = require('axios');
var FormData = require('form-data');
var qs = require('qs')
var fs = require('fs')
var path = require('path')


// enter your file to print or you can change to this to a url  
const filetoupload = "./printtest.pdf"


const encodedID = 'UkhFWlJmN2FmUUJsSlo2QnpTelE3SkhJWFZ3T2J2ckpHWVZuSnh0MAoKOg=='

const refreshToken =''

const sedhoid = "YkdKcThpeXlWUzlYTUliQnB0YXFad0pZV2JrWWVFT252NnIzU2Z3VDo="



 const code  = 'zfdWJKdhtuWdQzW907tyr7b6dKgean'



 

 const fullfilepath = path.normalize(filetoupload)

 console.log(" here is the file path",fullfilepath)



 




const getAccessToken= (code,encodedClientId,callback)=>{

    var data = {
        "grant_type":"authorization_code",
        "scope": "printing",
        "code": code
    }
    
    
    var config = {
      method: 'post',
      url: 'https://account.ezeep.com/oauth/access_token/',
      headers: { 
        'Authorization': `Basic ${encodedClientId}`, 
        "Content-Type":'application/x-www-form-urlencoded',
        "Host":"account.ezeep.com"
      },
      data : qs.stringify(data)
    };
    
    axios(config)
    .then((response)=> {
        callback(response)
      
    })
    .catch((error)=> {
      callback(error)
    });


}


const getPrinters = (token,callback)=>{

   var config= {
       method:'get',
       url:'https://printapi.ezeep.com/sfapi/GetPrinter/',
       headers:{
        'Host': 'printapi.ezeep.com', 
        'Authorization': `Bearer ${token}`
       }
   }

   axios(config)
   .then((response)=>{
       callback(response)

   }).catch((error)=>{

    callback(error)
   })


}


const prepareUpload = (token,callback)=>{

    var config= {
        method:'get',
        url:'https://printapi.ezeep.com/sfapi/PrepareUpload/',
        headers:{
         'Host': 'printapi.ezeep.com', 
         'Authorization': `Bearer ${token}`,
         "Content-Type": 'multipart/form-data',
        }
    }

    axios(config)
    .then((response)=>{

        callback(response)

    }).catch((error)=>{
        callback(error)

    })


}



const uploadFile = (sas,file1,callback) =>{


    console.log("filepath=",file1)
   

    var data = new FormData();
    data.append('file', fs.createReadStream(file1));
   
    var config = {
        method:'put',
        url:sas,
        headers: { 
            "Host": "rndsvcezp.blob.core.windows.net", 
            'x-ms-blob-type': 'BlockBlob', 
            ...data.getHeaders()
    
            

        
          },
          
          data: qs.stringify(data)
    }

    axios(config)
    .then((response)=>{
        
        callback(response)
    })
    .catch((error)=>{

         callback(error)
    })



}


const printfile=(printerid,fileid,token,callback)=>{

    const testprinterid = "wrjfoewjrofiewjrpofjwrefijewprf"
    
    const FileURL ='https://docs.google.com/feeds/download/documents/export/Export?id=1CMUQDGrDr4nlzLH3yNN62RRgr1Lk7g4gLJgoCRETMUU&exportFormat=pdf'

    var data = (
    {//"fileid":fileid,
    "fileurl":FileURL,
    "printerid":printerid,
    "type":"pdf"
    });


    var config = {

        method:"post",
        url: "https://printapi.ezeep.com/sfapi/Print/",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Host": "printapi.ezeep.com",
            "Content-Type":"application/json",
            "Content-Length":"0",

            

        },
       data
           
    
    }
    axios(config)
.then((response)=>{
   
callback(response)

    
})
.catch((error)=>{
    callback(error)
})




}


const getstatus= (printJobId,token,callback)=>{

        const encodedjobid = encodeURIComponent(printJobId)

        console.log("here is the encoded printjob id" ,encodedjobid)

   


    var config = {

        method:"get",
        url: `https://printapi.ezeep.com/sfapi/status/?id=${encodedjobid}`,
        headers:{
            "Authorization": `Bearer ${token}`,
            "Host": "printapi.ezeep.com",
           
           

            

        },
    
           
    
    }
    axios(config)
.then((response)=>{

    callback(response)
})
.catch((error)=>{
    callback(error)
})



}



const printDocument= (code,encodedID,filepath,callback)=>{

  var printer = ''
  var access_token = ''
  var sasuri =''
  var fileid = ''
  var refreshToken =

    getAccessToken(code,encodedID,(accessdata)=>{
            
        access_token= accessdata.data.access_token
    
        

        getPrinters(access_token,(printers)=>{
           
            printer = printers.data[3]
            

        prepareUpload(access_token,(fileblob)=>{

               fileid = fileblob.data.fileid
                sasuri= fileblob.data.sasUri

        uploadFile(sasuri,filepath,(uploadresponse)=>{
            
        
           
             printfile(printer.id,fileid,access_token,(printresponse)=>{

               
               const printjobid = printresponse.data.jobid
               console.log(printjobid)
               

               
            
               
                    
                 getstatus(printjobid,access_token,(status)=>{

                    
                     
                 })

                
            })
        })
        

    
        })
                
        })
        
        

    })

    

}


printDocument(code,encodedID,fullfilepath,(response)=>{


  

})







