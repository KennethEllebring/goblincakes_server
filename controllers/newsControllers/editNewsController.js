const { ObjectId } = require('mongodb');
const { getClientDB } = require('../../db/connect');
const { patchSchema, checkNewsExist } = require('../../model/newsModel');

const editNewsPost = async (req, res) => {
  let validation = patchSchema.validate(req.params);
  if (validation.error) {
    return res.status(406).json({message: validation.error.details[0].message});
  }

  const { newsHeader, newsText, imgUrl } = req.body;
  const { id } = req.params;
  const date = new Date();
  
  const checkNews = await checkNewsExist(id);
  
  if (checkNews === false) {
    return res.status(404).json({message: "Newspost doesn't exist"});
  } else {
    const db = await getClientDB();
    const collection = db.collection('news');
  
    await collection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          newsHeader,
          newsText,
          imgUrl,
          updated: date
        },
      },
      {$currentDate: {lastUpdated: true}}
    );
  
    return res.status(200).json({message: 'Newspost updated successfully'});
  }
};

exports.editNewsPost = editNewsPost;
