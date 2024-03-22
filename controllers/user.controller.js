const models = require('../models');

/**
 * This function gets all users in users database.
 * @param {*} req: the req send by the front end
 * @param {*} res: the response send by the back end
 */
function getUsers(req, res) {
    models.User.findAll().then(result => {
        if (result) {
            res.status(200).json({
                users: result
            });
        } else {
            res.status(404).json({
                message: "Users could not be found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Could not fetch users!",
            error: error
        });
    });
}


module.exports = {
    getUsers: getUsers
}