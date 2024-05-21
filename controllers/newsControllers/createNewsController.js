const { getClientDB } = require('../../db/connect');
const { createNewsSchema } = require('../../model/newsModel');

const createNewsPost = async (req, res) => {
  let validation = createNewsSchema.validate(req.body);
  if (validation.error) {
    return res.status(406).json({message: validation.error.details[0].message});
  }
  
  const { newsHeader, newsText, imgUrl } = req.body;
  const date = new Date();

  const newPost = {
    imgUrl,
    newsHeader,
    newsText,
    created: date,
  };

  const db = getClientDB();
  const collection = db.collection('news');

  collection.insertOne(newPost, function (err, res) {
    if (err) return res.status(500).json({ message: err });
  });

  res.status(201).json({message: 'Successfully created post!'});
};

exports.createNewsPost = createNewsPost;