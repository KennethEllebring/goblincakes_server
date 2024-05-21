const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const deleteForumPost = async (req, res) => {
  const { topicId, postId } = req.params;

  if (!ObjectId.isValid(topicId) || !ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const result = await collection.updateOne(
      { "categories.topics.topic_id": new ObjectId(topicId) },
      { $pull: { "categories.$.topics.$[topic].posts": { post_id: new ObjectId(postId) } } },
      { arrayFilters: [{ "topic.topic_id": new ObjectId(topicId) }] }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    return res.status(500).json({ message: 'Error deleting post' });
  }
};

exports.deleteForumPost = deleteForumPost;
