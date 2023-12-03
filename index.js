const argv = require('yargs').argv;
const { createFile, getFiles, getFileInfo} = require("./files")

function invokeAction({ action, fileName, content }) {
  switch (action) {
    case 'create':
        createFile(fileName,content);
      break;

    case 'getFiles':
        getFiles();
      break;

    case 'getInfo':
        getFileInfo(fileName);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// node index --action create --fileName text.txt --content qwerty
// createFile - validateData >>> 
// { value: { fileName: 'text.txt', content: 'qwerty' } }

// $ node index --action create --fileName text.txt 
// createFile - validateData >>> {
//   value: { fileName: 'text.txt', content: undefined },
//   error: [Error [ValidationError]: "content" is required] {
//     _original: { fileName: 'text.txt', content: undefined },
//     details: [ [Object] ]
//   }
// }

// console.log('createFile - validateData >>>',validationResult.error.details[0]);
// $ node index --action create --fileName text.txt 
// createFile - validateData >>> {
//   message: '"content" is required',
//   path: [ 'content' ],
//   type: 'any.required',
//   context: { label: 'content', key: 'content' }
// }


// $ node index --action create  --content qwerty
// createFile - validateData >>> {
//   message: '"fileName" is required',
//   path: [ 'fileName' ],
//   type: 'any.required',
//   context: { label: 'fileName', key: 'fileName' }
// }


// $ node index --action create --fileName text.txt --content qwerty
// checkExtension >>> txt true
// { extension: 'txt', resultBool: true }


// $ node index --action create --fileName text.doc --content qwerty
// checkExtension >>> doc false
// { extension: 'doc', resultBool: false }

// $ node index --action getFiles
// text.txt
// text2.txt
// text3.txt
// text4.txt


// $ node index --action getInfo --fileName text2.txt
// Sorry file with name text2.txt not found

// $ node index --action getInfo --fileName text.txt
// qwerty

// $ node index --action getInfo --fileName text.txt
// {
//   content: 'qwerty',
//   name: 'text',
//   extension: '.txt',
//   createAt: 2023-11-19T22:44:37.353Z
// }
