const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const likePost = async (req, res) => {
  const { topicId, postId } = req.params;
  const { username } = req.body;

  if (!ObjectId.isValid(topicId) || !ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const forum = await collection.findOne(
      {
        "categories.topics.topic_id": new ObjectId(topicId),
        "categories.topics.posts.post_id": new ObjectId(postId)
      },
      {
        projection: {
          "categories.$": 1
        }
      }
    );

    if (!forum) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const category = forum.categories[0];
    const topic = category.topics.find(t => t.topic_id.equals(new ObjectId(topicId)));
    const post = topic.posts.find(p => p.post_id.equals(new ObjectId(postId)));

    const hasLiked = post.likes.includes(username);

    const updateOperation = hasLiked
      ? { $pull: { "categories.$[category].topics.$[topic].posts.$[post].likes": username } }
      : { $addToSet: { "categories.$[category].topics.$[topic].posts.$[post].likes": username } };

    const result = await collection.updateOne(
      {
        "_id": forum._id,
        "categories.category_id": category.category_id,
        "categories.topics.topic_id": topic.topic_id,
        "categories.topics.posts.post_id": post.post_id
      },
      updateOperation,
      {
        arrayFilters: [
          { "category.category_id": category.category_id },
          { "topic.topic_id": topic.topic_id },
          { "post.post_id": post.post_id }
        ]
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const message = hasLiked ? 'Post unliked successfully' : 'Post liked successfully';
    return res.status(200).json({ message });
  } catch (err) {
    console.error('Error liking/unliking post:', err);
    return res.status(500).json({ message: 'Error liking/unliking post' });
  }
};

exports.likePost = likePost;
