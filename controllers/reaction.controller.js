const models = require('../models');

/**
 * This function allows the user to like or dislike a resource.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
async function addReaction(req, res) {
    try {
        const reaction = {
            userId: parseInt(req.body.userId, 10),
            resourceId: parseInt(req.body.resourceId, 10),
            reactionType: req.body.reactionType
        };

        const reactionExists = await models.Like.findOne({
            where: { userId: reaction.userId, resourceId: reaction.resourceId }
        });

        if (reactionExists) {
            return res.status(409).json({
                message: "This user has already reacted to this post!"
            });
        }


        const result = await models.Like.create(reaction);

        return res.status(201).json({
            message: "Reaction added successfully!",
            reaction: result
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
    
}

/**
 * This function allows the user remove their like or dislike.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function removeReaction(req, res) {
    const reaction = {
        userId: parseInt(req.params.userId, 10),
        resourceId: parseInt(req.params.resourceId, 10)
    };

    models.Like.destroy({
        where: {
            userId: reaction.userId,
            resourceId: reaction.resourceId
        }
    }).then(result => {
        res.status(200).json({
            message: "Reaction Deleted!"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

/**
 * This function returns the amount of likes and the amount of dislikes a resource has.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
async function getResourceReactions(req, res) {
    try {
        const resourceId = parseInt(req.params.resourceId, 10);

        const likes = await models.Like.findAndCountAll({
            where: {
                resourceId: resourceId,
                reactionType: "like"
            }
        });

        const dislikes = await models.Like.findAndCountAll({
            where: {
                resourceId: resourceId,
                reactionType: "dislike"
            }
        });
        return res.status(200).json({
            nrOfLikes: likes.count,
            nrOfDislikes: dislikes.count
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
    
}

/**
 * This function checks if a user has liked or disliked a resource.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function checkReaction(req, res) {
    const reaction = {
        userId: parseInt(req.params.userId, 10),
        resourceId: parseInt(req.params.resourceId, 10)
    };

    models.Like.findOne({
        where: {
            userId: reaction.userId,
            resourceId: reaction.resourceId
        }
    }).then(result => {
        if (result) {
            res.status(200).json({
                reactionType: result.reactionType
            });
        } else {
            res.status(200).json({
                reactionType: "none"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}


module.exports = {
    addReaction: addReaction,
    removeReaction: removeReaction,
    getResourceReactions: getResourceReactions,
    checkReaction: checkReaction
}