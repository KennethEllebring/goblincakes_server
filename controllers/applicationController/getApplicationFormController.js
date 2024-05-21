const { getClientDB } = require('../../db/connect');

const getApplicationForm = async (req, res) => {

  try {
    const db = getClientDB();
    const collection = db.collection('application-form');

    const application = await collection.find({}).toArray();
    res.status(200).json(application);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error connecting to the database', error: err });
}
};

exports.getApplicationForm = getApplicationForm;