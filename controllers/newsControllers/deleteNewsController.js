const {ObjectId} = require('mongodb');
const {getClientDB} = require('../../db/connect');
const {deleteSchema, checkNewsExist} = require('../../model/newsModel');

const deleteNewsPost = async function (req, res) {
  let validation = deleteSchema.validate(req.params);
  if (validation.error) {
    return res.status(406).json({message: validation.error.details[0].message});
  }

  const {id} = req.params;
  console.log(id)

  const checkNews = await checkNewsExist(id);

  if (checkNews === false) {
    return res.status(404).json({message: "News post doesn't exist"});
  } else {
    try {
      const db = await getClientDB();
      const collection = db.collection('news');

      await collection.deleteOne({_id: new ObjectId(id)});

      return res.status(200).json({message: 'News post deleted successfully'});
    } catch (err) {
      console.error(err);
      return res.status(400).json({message: 'Error deleting news post'});
    }
  }
};

exports.deleteNewsPost = deleteNewsPost;
