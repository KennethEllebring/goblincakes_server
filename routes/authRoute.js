const express = require('express');
const { login } = require('../controllers/userAuthControllers/loginController');
const { register } = require('../controllers/userAuthControllers/registerController');
const { changePassword } = require('../controllers/userAuthControllers/changePasswordController');
const { editUser } = require('../controllers/userAuthControllers/editUserController');
const { logout } = require('../controllers/userAuthControllers/logoutController');
const { checkUser } = require('../controllers/userAuthControllers/checkUserController');
const { removeUser } = require('../controllers/userAuthControllers/removeAccountController');
const { checkLoginToken } = require('../middleware/checkLoginToken');

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/register', checkLoginToken, register);
authRoute.patch('/changepassword', checkLoginToken, changePassword);
authRoute.patch('/edituser', checkLoginToken, editUser)
authRoute.get('/logout', logout);
authRoute.delete('/removeuser/:username', checkLoginToken, removeUser);
authRoute.get('/check', checkLoginToken, checkUser);

module.exports = {
  authRoute,
};
