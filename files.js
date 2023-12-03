const path = require("path");
const fs = require("fs/promises");
const validateData = require("./helpers/validateData");
const checkExtension = require("./helpers/checkExtension");

const folderPath = path.join(__dirname, "./files");

async function createFile(req, res) {
  const { fileName, content } = req.body;
  const validationResult = validateData(req.body);
  if (validationResult.error) {
    const paramError = validationResult.error.details[0].path[0];
    res.status(400).json({ message: `Please specify ${paramError} parameter` });
    //console.log(`Please specify ${paramError} parameter`);
    return;
  }

  const checkFile = checkExtension(fileName);
  if (!checkFile.result) {
    res.status(400).json({ message: `Sorry this app doesn't support files with ${checkFile.extension} extension` });
    //console.log(`Sorry this app doesn't support files with ${checkFile.extension} extension`)
    return;
  }

  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    //console.log(`File was created successful`);
    res.status(201).json({ message: "File was created successful" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getFiles(req, res) {
    try {
        const data = await fs.readdir(folderPath);
        if (!data.length) {
          //res.status(404).json({message: "Sorry there are no files in this folder" });
          console.log("Sorry there are no files in this folder");
          return;
        }
        //const result = data.forEach((file) => { console.log(file);});   
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function getFileInfo(req, res) {
  try {
    const {fileName} = req.params;
    const data = await fs.readdir(folderPath);
    if (!data.includes(fileName)) {
      //console.log(`Sorry there is no file ${fileName} in this folder`);
      res.status(404).json({message: `Sorry there is no file ${fileName} in this folder`});
      return;
    }
    const filePath = path.join(__dirname, "./files", fileName);
    const content = await fs.readFile(filePath, "utf-8");
    const extension = path.extname(fileName);
    const name = path.basename(fileName, extension);
    const fileDateAt = await fs.stat(filePath);
    const result ={ content, name, extension, createAt: fileDateAt.birthtime };
    //console.log(result);
    res.status(200).json(result);      
  } catch (error) {
    res.status(500).json({message: error.message});
  }
  
}

module.exports = {
  createFile,
  getFiles,
  getFileInfo,
};
