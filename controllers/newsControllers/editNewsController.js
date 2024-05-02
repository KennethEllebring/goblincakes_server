const {ObjectId} = require('mongodb');
const {getClientDB} = require('../../db/connect');
const {patchSchema, checkNewsExist } = require('../../model/newsModel');

const editNewsPost = async function (req, res) {
  let validation = patchSchema.validate(req.body);
  if (validation.error) {
    return res.status(406).json({message: validation.error.details[0].message});
  }

  const {id, body} = req.body;
 

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
          body: body,
        },
      },
      {$currentDate: {lastUpdated: true}}
    );

    return res.status(200).json({message: 'Newspost updated successfully'});
  }
};

exports.editNewsPost = editNewsPost;
