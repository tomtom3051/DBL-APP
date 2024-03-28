const express = require('express');
const reactionController = require('../controllers/reaction.controller');

const router = express.Router();

//Path to add a users reaction to a resource
router.post(
    "/add",
    reactionController.addReaction
);

//Path to delete a users reaction to a resource
router.delete(
    "/delete/:userId/:resourceId",
    reactionController.removeReaction
);

//Path to get the reactions to a resource
router.get(
    "/resource/:resourceId",
    reactionController.getResourceReactions
);

//Path to check if a user has liked a resource
router.get(
    "/check/:userId/:resourceId",
    reactionController.checkReaction
)

module.exports = router;