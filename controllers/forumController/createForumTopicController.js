const { ObjectId } = require('mongodb');
const { getClientDB } = require('../../db/connect');

const createForumTopic = async (req, res) => {
  const { username, topic_title, topic_text, category_id } = req.body;
  const date = new Date();

  try {
    const db = getClientDB();
    const collection = db.collection('forum');

    const categoryObjectId = new ObjectId(category_id);

    const topic = {
      topic_id: new ObjectId(),
      topic_title,
      topic_text,
      topic_username: username,
      topic_created: date,
      posts: [],
    };

    const result = await collection.updateOne(
      { "categories.category_id": categoryObjectId },
      { $push: { "categories.$.topics": topic } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Topic created successfully' });
  } catch (err) {
    console.error("Error saving forum:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createForumTopic };
