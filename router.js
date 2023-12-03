const express = require("express");

const router = express.Router(); 

const ctrl = require("./files");

router.post('/', ctrl.createFile);

router.get('/', ctrl.getFiles);

router.get('/:fileName', ctrl.getFileInfo);

module.exports = router;