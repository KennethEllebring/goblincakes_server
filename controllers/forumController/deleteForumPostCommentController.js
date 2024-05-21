const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const deleteForumComment = async (req, res) => {
  const { topicId, postId, commentId } = req.params;

  if (!ObjectId.isValid(topicId) || !ObjectId.isValid(postId) || !ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const result = await collection.updateOne(
      {
        "categories.topics.topic_id": new ObjectId(topicId),
        "categories.topics.posts.post_id": new ObjectId(postId)
      },
      { $pull: { "categories.$[].topics.$[topic].posts.$[post].comments": { comment_id: new ObjectId(commentId) } } },
      {
        arrayFilters: [
          { "topic.topic_id": new ObjectId(topicId) },
          { "post.post_id": new ObjectId(postId) }
        ]
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json({ message: 'Comment removed successfully' });
  } catch (err) {
    console.error('Error removing comment:', err);
    return res.status(500).json({ message: 'Error removing comment' });
  }
};

exports.deleteForumComment = deleteForumComment;
