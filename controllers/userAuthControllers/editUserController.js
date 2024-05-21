const { getClientDB } = require("../../db/connect");
const { checkUserExists } = require("../../model/authModel");

const editUser = async (req, res) => {
   
    const { username, characterName, realm, characterSpec } = req.body;

    const user = await checkUserExists(username);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const db = await getClientDB();
    const collection = db.collection("users");
    await collection.updateOne(
        { username: username },
        { $set: { characterName: characterName, realm: realm, characterSpec: characterSpec } }
    );

    return res.json({ message: "User details updated successfully" }).status(200);
};

exports.editUser = editUser;
