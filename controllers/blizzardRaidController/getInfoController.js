const { getClientDB } = require('../../db/connect');

const getInfo = async (req, res) => {
    try {
        const db = getClientDB();
        const collection = db.collection('users');

        const specs = await collection.find({}, {
            projection: {
                characterName: 1,
                characterSpec: 1,
                twitch: 1,
                _id: 0
            }
        }).toArray();
        res.status(200).json(specs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error connecting to the database', error: err });
    }
};

exports.getInfo = getInfo;
