const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');
const { checkForumCategoryExist } = require('../../model/forumModel');

const deleteForumCategory = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  const categoryExists = await checkForumCategoryExist(id);

  if (!categoryExists) {
    return res.status(404).json({ message: "Forum category doesn't exist" });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const result = await collection.updateOne(
      { "categories.category_id": new ObjectId(id) },
      { $pull: { categories: { category_id: new ObjectId(id) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Forum category not found in database" });
    }

    return res.status(200).json({ message: 'Forum category deleted successfully' });
  } catch (err) {
    console.error('Error deleting forum category:', err);
    return res.status(500).json({ message: 'Error deleting forum category' });
  }
};

exports.deleteForumCategory = deleteForumCategory;
