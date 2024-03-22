const models = require('../models');
const Validator = require("fastest-validator");

/**
 * This function adds to the database that userId started following courseId.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
async function followCourse(req, res) {
    try {
        //Create follow object with the desired location
        const follow = {
            userId: parseInt(req.params.userId, 10),
            courseId: parseInt(req.params.courseId, 10)
        };
    
        // Check if user exists
        const userResult = await models.User.findByPk(follow.userId);
        if (!userResult) {
          return res.status(404).json({
            message: "User: " + follow.userId + " does not exist!",
          });
        }
    
        // Check if course exists
        const courseResult = await models.Course.findByPk(follow.courseId);
        if (!courseResult) {
          return res.status(404).json({
            message: "Course: " + follow.courseId + " does not exist!",
          });
        }
    
        // Check if follow relation already exists
        const followResult = await models.Follow.findOne({
          where: { userId: follow.userId, courseId: follow.courseId },
        });
    
        if (followResult) {
          return res.status(409).json({
            message: "Follow relation already exists!",
          });
        }
    
        // Validate correct format was used
        const schema = {
          userId: { type: "number", optional: false, max: "10000" },
          courseId: { type: "number", optional: false, max: "10000" },
        };
    
        const v = new Validator();
        const validationResponse = v.validate(follow, schema);
    
        // If data is not valid, return error response
        if (validationResponse !== true) {
          return res.status(400).json({
            message: "Invalid data!",
            errors: validationResponse,
          });
        }
    
        // Create follow relation
        const result = await models.Follow.create(follow);
        return res.status(201).json({
          message: "Follow relation added successfully",
          follow: result
        });
      } catch (error) {
        return res.status(500).json({
          message: "Something went wrong!",
          error: error,
        });
      }
}

/**
 * This function removes from the database that userId is following courseId.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function unfollowCourse(req, res) {
    const follow = {
        userId: parseInt(req.params.userId, 10),
        courseId: parseInt(req.params.courseId, 10)
    };

    models.Follow.destroy({ where: { userId: follow.userId, courseId: follow.courseId } }).then(result => {
        res.status(200).json({
            message: "Follow relation deleted!"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

/**
 * This function checks if userId follows courseId.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function checkFollower(req, res) {
    const follow = {
      userId: parseInt(req.params.userId, 10),
      courseId: parseInt(req.params.courseId, 10),
    };
  
    models.Follow.findOne({
      where: { userId: follow.userId, courseId: follow.courseId },
    }).then(result => {
      if (result) {
        res.status(200).json({
            isFollower: true
        });
      } else {
        res.status(200).json({
            isFollower: false
        });
      }
    }).catch(error => {
      res.status(500).json({
        message: 'Something went wrong!',
        error: error
    });
    });
}

/**
 * This function gets all courses followed by userId.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function getFollowed(req, res) {
    //get user id
    const userId = parseInt(req.params.userId, 10);
    //find all course ids in a follow relation with given user id
    models.Follow.findAll({
      where: { userId: userId },
      attributes: ['courseId']
    }).then((result) => {
      if (result.length > 0) {
        //store these ids in an array
        const courseIds = result.map(follow => follow.courseId);
        //find all courses with these ids
        models.Course.findAll({
          where: {
              id: courseIds
          },
          attributes: ['id', 'code', 'name']
        }).then(result => {
          res.status(200).json({
              followed: result
          });
        }).catch(error => {
          res.status(500).json({
              message: "Something went wrong!",
              error: error
          });
        });
  
      } else {
        res.status(200).json({
            followed: []
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        error: error
      });
    });
}

module.exports = {
    followCourse: followCourse,
    unfollowCourse: unfollowCourse,
    checkFollower: checkFollower,
    getFollowed: getFollowed
};
  