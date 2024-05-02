const Joi = require('joi');
const {getClientDB} = require('../db/connect');

const loginSchema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9ÅÄÖåäö]+$'))
    .required()
    .messages({
      'string.base': 'Username should be a string',
      'string.empty': 'Username is required',
      'string.pattern.base': 'Username contains invalid characters',
      'any.required': 'Username is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.base': 'Password should be a string',
      'string.empty': 'Password is required',
      'any.required': 'Password is required',
    }),
});

const registerSchema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9ÅÄÖåäö]+$'))
    .min(4)
    .max(16)
    .required()
    .messages({
      'string.base': 'Username should be a string',
      'string.empty': 'Username is required',
      'string.min': 'Username should have at least {#limit} characters',
      'string.max': 'Username should have at most {#limit} characters',
      'string.pattern.base': 'Username contains invalid characters',
      'any.required': 'Username is required',
    }),
  password: Joi.string()
    .min(6)
    .max(36)
    .required()
    .messages({
      'string.base': 'Password should be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password should have at least {#limit} characters',
      'string.max': 'Password should have at most {#limit} characters',
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Confirm password is required',
    }),
});

const checkUserExists = async (username) => {
  const db = await getClientDB();
  const collection = db.collection('users');

  const user = await collection.findOne({
    username: username.toLowerCase(),
  });

  console.log('checkuserexists', user)

  if (user === null) {
    return false;
  }
  return {username: user.username, password: user.password, admin: user.admin};
};

module.exports = {
  loginSchema,
  registerSchema,
  checkUserExists,
};
