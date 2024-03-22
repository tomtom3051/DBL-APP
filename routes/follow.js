const express = require('express');
const followController = require('../controllers/follow.controller');

const router = express.Router();

//Path to add follow relation between userId and courseId
router.post(
    "/add/:userId/:courseId",
    followController.followCourse
);

//Path to delete follow relation between userId and courseId
router.delete(
    "/delete/:userId/:courseId",
    followController.unfollowCourse
);

//Path to check for follow relation between userId and courseId
router.get(
    "/check/:userId/:courseId",
    followController.checkFollower
);

//Path to get courses followed by userId
router.get(
    "/get/:userId",
    followController.getFollowed
);



module.exports = router;