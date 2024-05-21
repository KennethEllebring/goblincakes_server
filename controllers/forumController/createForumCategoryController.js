const { ObjectId } = require('mongodb');
const { getClientDB } = require('../../db/connect');


const createForumThread = async (req, res) => {
  const { forum_title, username, category_title, category_text } = req.body;
  const date = new Date();

  const newCategory = {
    "category_id": new ObjectId(),
    "category_title": category_title,
    "category_text": category_text,
    "category_username": username,
    "category_created": date,
    "topics": [
      {
        "topic_id": new ObjectId(),
        "topic_text": "",
        "topic_title": "TEMPORÄR ÄMNES TITEL",
        "topic_username": username,
        "topic_created": date,
        "posts": [
          {
            "post_id": new ObjectId(),
            "post_title": "TEMPORÄR INLÄGGS TITEL",
            "post_text": "",
            "comments": [],
            "likes": [],
            "post_created": date,
            "post_username": username
          }
        ]
      }
    ]
  };

  try {
    const db = getClientDB();
    const collection = db.collection('forum');

    const existingForum = await collection.findOne({ forum_title: forum_title });

    if (existingForum) {
      await collection.updateOne(
        { forum_title: forum_title },
        { $push: { categories: newCategory } }
      );
      res.status(200).json({ message: 'Category added to existing forum successfully!' });
    } else {
      const forumStructure = {
        "forum_title": forum_title,
        "categories": [newCategory]
      };

      await collection.insertOne(forumStructure);
      res.status(201).json({ message: 'Forum created successfully!' });
    }
  } catch (err) {
    console.error("Error saving forum:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createForumThread = createForumThread;
