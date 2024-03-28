const express = require('express');
const resourceFileController = require('../controllers/resource_file.controller');

const router = express.Router();

/**
 * Route to link file and resource in database
 */
router.post(
    "/link",
    resourceFileController.addResourceFile
);

/**
 * Route to get files associated with a resource
 */
router.get(
    "/get/:resourceId",
    resourceFileController.getResourceFiles
);

/**
 * Route to delete all files associated with a resource
 */
router.delete(
    "/delete/:resourceId",
    resourceFileController.deleteResourceFiles
);

module.exports = router;