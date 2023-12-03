function checkExtension (fileName) {
    const EXTENSIONS = ['txt', 'js', 'css', 'html', 'json'];
    // const extension = fileName.slice(fileName.lastIndexOf('.')+1);
    // result = EXTENSIONS.find((item) => item === extension);
    // console.log('checkExtension >>>',  extension, Boolean(result))
    // return  { extension, resultBool: Boolean(result) }

    const extension = fileName.split(".").pop();
    const result = EXTENSIONS.includes(extension);
    return { extension, result };
};

module.exports = checkExtension;