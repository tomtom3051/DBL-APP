const models = require('../models');

/**
 * This function associates a resource with a file in the database.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function addResourceFile(req, res) {
    const resourceFile = {
        resourceId: parseInt(req.body.resourceId, 10),
        filePath: req.body.filePath,
        index: parseInt(req.body.index, 10)
    };

    //Do validation

    models.ResourceFile.create(resourceFile).then(result => {
        res.status(201).json({
            message: "Resource linked to file!",
            resourceFile: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

/**
 * This function gets all file url's associated with a resource.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function getResourceFiles(req, res) {
    //Get ID from params
    const resourceId = parseInt(req.params.resourceId, 10);

    //Get all associated files
    models.ResourceFile.findAll({
        where: { resourceId: resourceId },
        attributes: ['filePath', 'index']
    }).then(result => {
        if (result) {
            res.status(200).json({
                files: result
            });
        } else {
            res.status(404).json({
                message: "No files found for resource with id: " + resourceId 
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Could not fetch business!",
            error: error
        });
    });
}

/**
 * This function deletes all files associated with a resource.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function deleteResourceFiles(req, res) {
    //Get ID from params
    const resourceId = parseInt(req.params.resourceId, 10);

    models.ResourceFile.destroy({
        where: { resourceId: resourceId }
    }).then(result => {
        res.status(200).json({
            message: "Resource deleted!"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Could not delete files!",
            error: error
        });
    });
}

module.exports = {
    addResourceFile: addResourceFile,
    getResourceFiles: getResourceFiles,
    deleteResourceFiles: deleteResourceFiles
}