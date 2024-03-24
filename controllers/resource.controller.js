const models = require('../models');
const Validator = require('fastest-validator');

/**
 * This function gets study resources stored for a specific course.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function getCourseResources(req, res) {
    const courseId = req.params.courseId;
}

/**
 * This function gets a specific study resource based on its id.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function getResourceById(req, res) {}

/**
 * This function adds a resource to the database.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function addResource(req, res) {}

/**
 * This function deletes a resource from the database.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function deleteResource(req, res) {}

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