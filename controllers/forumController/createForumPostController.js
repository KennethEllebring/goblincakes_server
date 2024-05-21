const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const createForumPost = async (req, res) => {
  const { topicId } = req.params;
  const { post_title, post_text, username } = req.body;

  if (!ObjectId.isValid(topicId)) {
    return res.status(400).json({ message: 'Invalid topic ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const newPost = {
      post_id: new ObjectId(),
      post_title,
      post_text,
      comments: [],
      likes: [],
      post_created: new Date().toISOString(),
      post_username: username,
    };

    const result = await collection.updateOne(
      { "categories.topics.topic_id": new ObjectId(topicId) },
      { $push: { "categories.$.topics.$[topic].posts": newPost } },
      { arrayFilters: [{ "topic.topic_id": new ObjectId(topicId) }] }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    return res.status(201).json(newPost);
  } catch (err) {
    console.error('Error adding post:', err);
    return res.status(500).json({ message: 'Error adding post' });
  }
};

exports.createForumPost = createForumPost;
