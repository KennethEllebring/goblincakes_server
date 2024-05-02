const {getClientDB} = require('../../db/connect');

exports.getAllNews = async function getAllNews(req, res) {

  try {
    const db = getClientDB();
    const collection = db.collection('news');

    const news = await collection.find({}).toArray();
    res.status(200).json(news);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error connecting to the database', error: err });
}
};
