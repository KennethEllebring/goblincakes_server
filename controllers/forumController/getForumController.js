const { getClientDB } = require('../../db/connect');

const getForum = async (req, res) => {
  try {
    const db = getClientDB();
    const collection = db.collection('forum');

    const forum = await collection.find({}).toArray();
    res.status(200).json(forum);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).json({ message: 'Error connecting to the database', error: err });
  }
};

exports.getForum = getForum;
