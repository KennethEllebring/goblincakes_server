const { getClientDB } = require('../db/connect');
const Joi = require('joi');
const { ObjectId } = require('mongodb');

const createNewsSchema = Joi.object({
  newsHeader: Joi.string().required(),
  newsText: Joi.string(),
  imgUrl: Joi.optional()
});

const deleteSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const patchSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const checkNewsExist = async (id) => {
  const db = await getClientDB();
  const collection = db.collection('news');
  const news = await collection.findOne({
    _id: new ObjectId(id),
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
  createNewsSchema,
  deleteSchema,
  patchSchema,
  checkNewsExist,
  checkAlreadyLiked,
};
