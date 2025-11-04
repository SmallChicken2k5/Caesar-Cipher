const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/home.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', controller.index);



module.exports = router;