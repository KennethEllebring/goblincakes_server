const { getClientDB } = require('../../db/connect');

const sendApplication = async (req, res) => {
  const responses = req.body;
  
  responses.date = new Date()

  const db = getClientDB();
  const collection = db.collection('applications');

  try {
    await collection.insertOne(responses);
    return res.status(201).json({ message: 'Successfully sent application' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.sendApplication = sendApplication;
