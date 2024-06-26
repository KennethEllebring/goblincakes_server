const jwt = require('jsonwebtoken');
require("dotenv").config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const LOGIN_TOKEN_COOKIE_NAME = 'authToken';

exports.checkLoginToken = function checkLoginToken(req, res, next) {
  const {cookies} = req;
  if (!cookies[LOGIN_TOKEN_COOKIE_NAME]) {
    return res.status(401).json({message: 'No active login token'});
  }

  try {
    const loginToken = cookies[LOGIN_TOKEN_COOKIE_NAME];
    const loggedInUser = jwt.verify(loginToken, TOKEN_SECRET);
    req.user = {
      username: loggedInUser.username,
      isAdmin: loggedInUser.isAdmin,
      characterName: loggedInUser.characterName,
      realm: loggedInUser.realm,
      characterSpec: loggedInUser.characterSpec
    };
    
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({message: 'Unauthorized login token'});
  }
};
