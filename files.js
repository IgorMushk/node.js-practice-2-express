const path = require("path");
const fs = require("fs/promises");
const validateData = require('./helpers/validateData');
const checkExtension = require("./helpers/checkExtension");

const folderPath = path.join(__dirname, './files');

async function createFile(fileName, content) {
    const file ={
        fileName,
        content
    }
    
    const validationResult = validateData(file);
    //console.log('createFile - validateData >>>',validationResult.error.details[0]);
    if(validationResult.error) {
        const paramError = validationResult.error.details[0].path[0];
        console.log(`Please specify ${paramError} parameter`);
        return;
    }
    
    //console.log(checkExtension (fileName));
    const checkFile =  checkExtension(fileName);
    //console.log(checkFile);
    if (!checkFile.result) {
        console.log(`Sorry this app doesn't support files with ${checkFile.extension} extension`)
        return
    };

    const filePath = path.join(__dirname,'./files',fileName);
    try {
        await fs.writeFile(filePath, content, "utf-8")
        console.log(`File was created successful`)
    } catch (error) {
        console.error(error);
    }
}

async function getFiles() {
    const data = await fs.readdir(folderPath);
    //console.log(data);
    if (!data.length) {
        console.log('Sorry there are no files in this folder');
        return;
    }
    data.forEach(file => {
        console.log(file);
    });
}

async function getFileInfo(fileName) {
    const data = await fs.readdir(folderPath);
    //const found = data.find(name => name === fileName);
    if (!data.includes(fileName)) {
        console.log(`Sorry there is no file ${fileName} in this folder`);
        return;
    }
    const filePath = path.join(__dirname,'./files', fileName);
    const result = await fs.readFile(filePath, "utf-8");
    //console.log(result);
    //console.log(path.parse(fileName).ext)
    //console.log(path.parse(fileName).name)
    const extension = path.extname(fileName);
    const name = path.basename(fileName,extension);
    const fileDateAt = await fs.stat(filePath);
    //console.log(fileDateAt.birthtime);
     console.log({content :result, name, extension, createAt: fileDateAt.birthtime});
}

module.exports = {
    createFile,
    getFiles,
    getFileInfo,  
} 