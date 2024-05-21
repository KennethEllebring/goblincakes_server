const { getClientDB } = require('../../db/connect');

const getApplications = async (req, res) => {

  try {
    const db = getClientDB();
    const collection = db.collection('applications');

    const applications = await collection.find({}).toArray();
    res.status(200).json(applications);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error connecting to the database', error: err });
}
};

exports.getApplications = getApplications;