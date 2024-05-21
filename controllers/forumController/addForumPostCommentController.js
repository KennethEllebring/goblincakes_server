const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const addForumComment = async (req, res) => {
  const { topicId, postId } = req.params;
  const { comment_text, username } = req.body;

  const date = new Date();

  if (!ObjectId.isValid(topicId) || !ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const newComment = {
      comment_id: new ObjectId(),
      comment_text,
      comment_created: date,
      comment_username: username,
    };

    const result = await collection.updateOne(
      {
        "categories.topics.topic_id": new ObjectId(topicId),
        "categories.topics.posts.post_id": new ObjectId(postId)
      },
      { $push: { "categories.$[].topics.$[topic].posts.$[post].comments": newComment } },
      {
        arrayFilters: [
          { "topic.topic_id": new ObjectId(topicId) },
          { "post.post_id": new ObjectId(postId) }
        ]
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(201).json(newComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    return res.status(500).json({ message: 'Error adding comment' });
  }
};

exports.addForumComment = addForumComment;
