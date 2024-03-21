const models = require('../models');
const Validator = require('fastest-validator');

/**
 * This function adds a new course to the database.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function addCourse(req, res) {
    //Store the course info in a constant
    const course = {
        code: req.body.code,
        name: req.body.name
    };

    //Check if there exists a course with this code
    models.Course.findOne({ where: { code: course.code } }).then(result => {
        //If so send back error message
        if (result) {
            res.status(409).json({
                message: "Course code taken!"
            });
        } else {
            //Set up a schema for validation
            const schema = {
                name: { type: "string", optional: false },
                code: { type: "string", optional: false, max: "8" }
            };

            const v = new Validator();

            //Validate course info
            const validationResponse = v.validate(course, schema);

            if (validationResponse !== true) {
                return res.status(400).json({
                    message: "Invalid data!",
                    errors: validationResponse
                });
            }

            models.Course.create(course).then(result => {
                res.status(201).json({
                    message: "Course created successfully!",
                    course: result
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error
                });
            });
        }
    });
}

/**
 * This function gets all courses from the database.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function getCourses(req, res) {
    models.Course.findAll({
        attributes: ['id', 'code', 'name']
    }).then(result => {
        res.status(200).json({
            courses: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Could not fetch courses!",
            error: error
        });
    });
}

/**
 * This function deletes a course from the database.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function deleteCourse(req, res) {
    //get the id of the course to be deleted from the parameters
    const id = parseInt(req.params.id, 10);

    //Find and destroy an entry in Courses with the given id
    models.Course.destroy({ where: {id: id }}).then(result => {
        res.status(200).json({
            message: "Course " + id + " was deleted!"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Could not delete course!",
            error: error
        });
    });
}

/**
 * This function gets one specific course from the database.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function getCourse(req, res) {
    //get the id of the course to be deleted from the parameters
    const id = parseInt(req.params.id, 10);

    models.Course.findByPk(id, {
        attributes: ['id', 'code', 'name']
    }).then(result => {
        if (result) {
            res.status(200).json({
                course: result
            });
        } else {
            res.status(404).json({
                message: "No course with id " + id + " could be found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Could not fetch course!",
            error: error
        });
    });

}

module.exports = {
    addCourse: addCourse,
    getCourses: getCourses,
    deleteCourse: deleteCourse,
    getCourse: getCourse
}