const { getClientDB } = require('../db/connect');
const { ObjectId } = require('mongodb');

const checkForumCategoryExist = async (id) => {
  const db = await getClientDB();
  const collection = db.collection('forum');
  const categoryExist = await collection.findOne({
    "categories.category_id": new ObjectId(id)
  });
  return !!categoryExist;
};

const checkForumTitleExist = async (id) => {
          const db = await getClientDB();
          const collection = db.collection('forum');
          const titleExist = await collection.findOne({
            _id: new ObjectId(id)
          });
          return !!titleExist;
        };

module.exports = {
  checkForumCategoryExist,
  checkForumTitleExist
};
