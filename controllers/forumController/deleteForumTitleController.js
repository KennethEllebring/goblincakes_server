const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');
const { checkForumTitleExist } = require('../../model/forumModel');

const deleteForumTitle = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid forum ID' });
  }

  const forumExists = await checkForumTitleExist(id);

  if (!forumExists) {
    return res.status(404).json({ message: "Forum title doesn't exist" });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Forum title not found in database" });
    }

    return res.status(200).json({ message: 'Forum title deleted successfully' });
  } catch (err) {
    console.error('Error deleting forum title:', err);
    return res.status(500).json({ message: 'Error deleting forum title' });
  }
};

exports.deleteForumTitle = deleteForumTitle;
