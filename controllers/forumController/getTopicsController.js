const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const getForumTopics = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getClientDB();
    const collection = db.collection('forum');

    const forum = await collection.findOne(
      { "categories.category_id": new ObjectId(id) },
      { projection: { "categories.$": 1 } }
    );

    if (!forum) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = forum.categories[0];
    res.status(200).json(category.topics);
  } catch (err) {
    console.error('Error retrieving topics by category:', err);
    res.status(500).json({ message: 'Error retrieving topics by category', error: err });
  }
};

exports.getForumTopics = getForumTopics;
