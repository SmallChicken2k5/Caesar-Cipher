const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/home.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', controller.index);
router.post('/process', upload.single('file'), controller.process);

module.exports = router;