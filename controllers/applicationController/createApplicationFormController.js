const { getClientDB } = require('../../db/connect');

const createApplicationForm = async (req, res) => {
  const questions = req.body;

  const db = getClientDB();
  const collection = db.collection('application-form');

  collection.insertMany(questions, function (err, res) {
    if (err) return res.status(500).json({ message: err });
  });
    res.status(201).json({ message: 'Successfully created form!' });
};

exports.createApplicationForm = createApplicationForm;
