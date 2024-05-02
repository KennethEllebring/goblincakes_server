const express = require('express');
const {login} = require('../controllers/userAuthControllers/loginController');
const {logout} = require('../controllers/userAuthControllers/logoutController');
const {register} = require('../controllers/userAuthControllers/registerController');
const {checkUser} = require('../controllers/userAuthControllers/checkUserController');
const {checkLoginToken} = require('../middleware/checkLoginToken');

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/register', register);
authRoute.get('/logout', logout);
authRoute.get('/check', checkLoginToken, checkUser);

module.exports = {
  authRoute,
};
