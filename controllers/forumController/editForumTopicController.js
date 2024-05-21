const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const editForumTopic = async (req, res) => {
  const { id, topicId } = req.params;
  const { topic_title, topic_text, username } = req.body;

  if (!ObjectId.isValid(id) || !ObjectId.isValid(topicId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const result = await collection.updateOne(
      { "categories.category_id": new ObjectId(id), "categories.topics.topic_id": new ObjectId(topicId) },
      { $set: { 
          "categories.$[].topics.$[topic].topic_title": topic_title,
          "categories.$[].topics.$[topic].topic_text": topic_text,
          "categories.$[].topics.$[topic].topic_username": username
      } },
      { arrayFilters: [{ "topic.topic_id": new ObjectId(topicId) }] }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Topic not found in category" });
    }

    return res.status(200).json({ message: 'Topic updated successfully' });
  } catch (err) {
    console.error('Error updating topic:', err);
    return res.status(500).json({ message: 'Error updating topic' });
  }
};

exports.editForumTopic = editForumTopic;
