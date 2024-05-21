const { getClientDB } = require('../../db/connect');

const editApplicationForm = async (req, res) => {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: "No questions provided" });
    }

    const db = await getClientDB();
    const collection = db.collection('application-form');

    const updates = questions.map(async (question) => {
        const { _id, ...updateData } = question;
        return collection.updateOne(
            { _id },
            { $set: updateData },
            { upsert: true }
        );
    });

    try {
        await Promise.all(updates);
        res.status(200).json({ message: 'Form updated successfully' });
    } catch (error) {
        console.error('Error updating the application form:', error);
        res.status(500).json({ message: 'Error updating the form' });
    }
};

exports.editApplicationForm = editApplicationForm;
