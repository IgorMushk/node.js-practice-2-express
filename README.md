# node.js-practice-2-express - CLI -> Web express
- createFile  
- getFiles  
- getFileInfo  


#### POST http://localhost:3000/files  
{  
    "fileName": "text.txt",  
    "content": "qwertyuiop"  
}  

{  
    "fileName": "test.xml",  
    "content": "console.log('Hello world!')"  
}  

#### GET http://localhost:3000/files

#### GET http://localhost:3000/files/:fileName
:fileName=text.txt  