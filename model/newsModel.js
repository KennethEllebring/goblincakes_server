const {getClientDB} = require('../db/connect');
const Joi = require('joi');
const {ObjectId} = require('mongodb');

const newsSchema = Joi.object({
  body: Joi.string().required(),
});

const deleteSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const getAllUserNewsSchema = Joi.object({
  username: Joi.string().required(),
});

const findOneNewsSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const patchSchema = Joi.object({
  id: Joi.string().length(24).required(),
  body: Joi.string().required(),
});

const likeNewsSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const commentNewsSchema = Joi.object({
  id: Joi.string().length(24).required(),
  commentBody: Joi.string().min(1).required(),
});

const checkNewsExist = async (id, user) => {
  const db = await getClientDB();
  const collection = db.collection('news');
  const news = await collection.findOne({
    _id: new ObjectId(id),
    userID: user,
  });
  if (!news) {
    return false;
  }
  return {id};
};

const checkAlreadyLiked = async (id, user) => {
  const db = await getClientDB();
  const collection = db.collection('news');
  const news = await collection.findOne({
    _id: new ObjectId(id),
    like: user,
  });
  if (!news) {
    return false;
  }
  return {id};
};

module.exports = {
  newsSchema,
  findOneNewsSchema,
  getAllUserNewsSchema,
  deleteSchema,
  patchSchema,
  commentNewsSchema,
  checkNewsExist,
  likeNewsSchema,
  checkAlreadyLiked,
};
