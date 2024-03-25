const models = require('../models');
const Validator = require('fastest-validator');

/**
 * This function gets study resources stored for a specific course.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function getCourseResources(req, res) {
    //Get the id of the course in question from the parameters
    const courseId = parseInt(req.params.courseId, 10);

    //Get all resources where courseId === courseId
    models.Resource.findAll({
        where: { courseId: courseId }
    }).then(result => {
        res.status(200).json({
            resources: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

/**
 * This function gets a specific study resource based on its id.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function getResourceById(req, res) {
    //Get resource ID
    const id = parseInt(req.params.id, 10);

    //Find resource using ID
    models.Resource.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Resource with id: " + id + ", could not be found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

/**
 * This function adds a resource to the database.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function addResource(req, res) {
    //Create an object storing the resource info
    const resource = {
        authorId: parseInt(req.body.authorId, 10),
        authorName: req.body.authorName,
        courseId: parseInt(req.body.courseId, 10),
        title: req.body.title,
        description: req.body.description,
        fileType: req.body.fileType
    };

    const schema = {
        authorId: { type: "number", optional: false },
        authorName: { type: "string", optional: false },
        courseId: { type: "number", optional: false },
        title: { type: "string", optional: false },
        description: { type: "string", optional: false },
        fileType: { type: "string", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(resource, schema);

    // If data is not valid, return error response
    if (validationResponse !== true) {
        return res.status(400).json({
          message: "Invalid data!",
          errors: validationResponse,
        });
    }

    //Add the resource to the database, then return its id
    models.Resource.create(resource).then(result => {
        res.status(201).json({
            id: result.id
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

/**
 * This function deletes a resource from the database.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function deleteResource(req, res) {
    //Maybe add part where we delete any images or pdfs associated with this id
    models.Resource.destroy({
        where: {
            id: parseInt(req.params.id, 10)
        }
    }).then(result => {
        res.status(200).json({
            message: "Resource deleted!"
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong!',
            error: error
        });
    });
}

/**
 * This function updates a resource in the database.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function editResource(req, res) {}

module.exports = {
    getCourseResources: getCourseResources,
    addResource: addResource,
    deleteResource: deleteResource,
    getResourceById: getResourceById,
    editResource: editResource
}