const express = require('express');
const resourceController = require('../controllers/resource.controller');

const router = express.Router();

//Path to get all study resources for a specific course
router.get(
    "/course/get/:courseId",
    resourceController.getCourseResources
);

//Path to get a specific study resource
router.get(
    "/resource/get/:id",
    resourceController.getResourceById
);

//Path to add a resource to the database
router.post(
    "/add",
    resourceController.addResource
);

//Path to remove resource from the database
router.delete(
    "/delete/:id",
    resourceController.deleteResource
);

//Path to edit existing study resource
router.patch(
    "/update",
    resourceController.editResource
);