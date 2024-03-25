const express = require('express');
const fileController = require('../controllers/file.controller');
const pdfUploader = require('../helpers/pdf-uploader');

const router = express.Router();

router.post(
    '/upload',
    pdfUploader.upload.single('pdf'),
    fileController.upload
);

module.exports = router;