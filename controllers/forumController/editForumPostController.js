const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const editForumPost = async (req, res) => {
  const { topicId, postId } = req.params;
  const { post_title, post_text, username } = req.body;

  if (!ObjectId.isValid(topicId) || !ObjectId.isValid(postId)) {
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
      {
        $set: {
          "categories.$[].topics.$[topic].posts.$[post].post_title": post_title,
          "categories.$[].topics.$[topic].posts.$[post].post_text": post_text,
          "categories.$[].topics.$[topic].posts.$[post].post_username": username,
        }
      },
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

    return res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Error updating post:', err);
    return res.status(500).json({ message: 'Error updating post' });
  }
};

exports.editForumPost = editForumPost;
