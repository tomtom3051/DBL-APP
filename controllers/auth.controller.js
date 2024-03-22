const models = require('../models');
const { Op } = require('sequelize');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * This function allows the user to login to an existing account.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function login(req, res) {
    //Check if user exists in user database
    models.User.findOne({ where: { email: req.body.email } }).then(user => {
        //Send error if user does not exist
        if (user === null) {
            res.status(401).json({
                message: "Invalid email!"
            });
        } else {
            //If user exist use bcryptjs to check password validity
            bcryptjs.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    jwt.sign({
                        userId: user.id,
                        email: user.email,
                        role: user.role
                    }, "This is a secret string used to encrypt the json web token.", function(err, token) {
                        if (err) {
                            res.status(500).json({
                                message: "Error occured while generating token",
                                error: err
                            });
                        } else {
                            res.status(200).json({
                                message: "Authentication successful!",
                                token: token,
                                id: user.id,
                                role: user.role
                            });
                        }
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credentials"
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

/**
 * This function allows the user to create a new account.
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function signup(req, res) {
    //Check if there is a pre-existing username with this name or email
    models.User.findOne({ where: { email: req.body.email }}).then((result) => {
        if (result) {
            //If there is a pre-existing user send a 409 error
            res.status(409).json({
                message: "Email is taken!"
            });
        } else {
            //If there is no pre-existing user save user to database
            //bcryptjs is used here to encrypt the password into variable hash
            bcryptjs.genSalt(10, function(err, salt) {
                bcryptjs.hash(req.body.password, salt, function(err, hash) {
                    //set up the user construct to be saved to the database
                    //save hash as password as it is the encrypted password
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        role: req.body.role,
                        password: hash
                    }

                    //Set up a validation schema
                    const schema = {
                        //name is of type string and it has to contain a value
                        // name: { type: "string", optional: false, max: "40" },
                        name: { type: "string", optional: false },
                        email: { type: "string", optional: false },
                        role: { type: "string", optional: false },
                        password: { type: "string", optional: false }
                    }

                    const v = new Validator();
                    //Use validator to see if user object matches schema specifications
                    const validationResponse = v.validate(user, schema);

                    if (validationResponse !== true) {
                        //If user object is invalid return an error
                        return res.status(400).json({
                            message: "Invalid data!",
                            errors: validationResponse
                        });
                    }

                    //If data is valid add user to the User database
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User created successfully!",
                            user: result
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong!",
                            error: error
                        });
                    });
                });
            });
        }
    });
}

/**
 * This function allows the user to delete their existing account
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function deleteAccount(req, res) {
    //Get ID of account to be deleted from params
    const id = req.params.id;

    //Destroy user entry with this id
    models.User.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "User account deleted successfully!"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Could not delete user!",
            error: error
        });
    });
}

/**
 * This function allows the user to update their existing account
 * @param {*} req - the http request
 * @param {*} res - the http response
 */
function updateAccount(req, res) {
    const id = req.params.id;
    
}


module.exports = {
    login: login,
    signup: signup,
    deleteAccount: deleteAccount,
    updateAccount: updateAccount
}