const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const getForumPosts = async (req, res) => {
  const { topicId } = req.params;

  if (!ObjectId.isValid(topicId)) {
    return res.status(400).json({ message: 'Invalid topic ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('forum');

    const forum = await collection.findOne(
      { "categories.topics.topic_id": new ObjectId(topicId) },
      { projection: { "categories.$": 1 } }
    );

    if (!forum) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    let topicPosts = [];
    forum.categories.forEach(category => {
      category.topics.forEach(topic => {
        if (topic.topic_id.equals(new ObjectId(topicId))) {
          topicPosts = topic.posts;
        }
      });
    });

    return res.status(200).json(topicPosts);
  } catch (err) {
    console.error('Error retrieving posts:', err);
    return res.status(500).json({ message: 'Error retrieving posts' });
  }
};

exports.getForumPosts = getForumPosts;
