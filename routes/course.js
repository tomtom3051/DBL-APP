const express = require('express');
const courseController = require('../controllers/course.controller');

const router = express.Router();

/**
 * Route to access the add course function
 */
router.post(
    "/add",
    courseController.addCourse
);

/**
 * Route to access the get courses function
 */
router.get(
    "/get",
    courseController.getCourses
);

/**
 * Route to access the delete course function
 */
router.delete(
    "/delete/:id",
    courseController.deleteCourse
);

/**
 * Route to access the get course function
 */
router.get(
    "/get/:id",
    courseController.getCourse
);

module.exports = router;