const { ObjectId } = require('mongodb');
const { getClientDB } = require('../../db/connect');

const editForumCategory = async (req, res) => {
    const { forum_title, category_title, category_text } = req.body;
    const { id } = req.params;

    try {
        const db = getClientDB();
        const collection = db.collection('forum');

        const result = await collection.updateOne(
            { forum_title: forum_title, "categories.category_id": new ObjectId(id) },
            {
                $set: {
                    "categories.$.category_title": category_title,
                    "categories.$.category_text": category_text
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully!' });
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editForumCategory = editForumCategory;