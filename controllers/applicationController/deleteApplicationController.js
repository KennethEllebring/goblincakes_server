const { getClientDB } = require('../../db/connect');
const { ObjectId } = require('mongodb');

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid application ID' });
  }

  try {
    const db = await getClientDB();
    const collection = db.collection('applications');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Application not found in database" });
    }

    return res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    console.error('Error deleting application:', err);
    return res.status(500).json({ message: 'Error deleting application' });
  }
};

exports.deleteApplication = deleteApplication;
