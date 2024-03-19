const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * Route to access the login function
 */
router.post(
    "/login",
    authController.login
);

/**
 * Route to access the signup function
 */
router.post(
    "/signup",
    authController.signup
);

/**
 * Route to access the delete account function
 */
router.delete(
    "/delete/:id",
    authController.deleteAccount
);

/**
 * Route to access the update account function
 */
router.patch(
    "/update/:id",
    authController.updateAccount
);

module.exports = router;