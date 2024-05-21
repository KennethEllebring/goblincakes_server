const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const deleteForumTopic = async (req, res) => {
  const { id, topicId } = req.params;

  if (!ObjectId.isValid(id) || !ObjectId.isValid(topicId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const result = await collection.updateOne(
      { "categories.category_id": new ObjectId(id) },
      { $pull: { "categories.$.topics": { topic_id: new ObjectId(topicId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Topic not found in category" });
    }

    return res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (err) {
    console.error('Error deleting topic:', err);
    return res.status(500).json({ message: 'Error deleting topic' });
  }
};

exports.deleteForumTopic = deleteForumTopic;
