const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

//path to get all users
router.get(
    "/get",
    //middleware needed
    userController.getUsers
);

module.exports = router;