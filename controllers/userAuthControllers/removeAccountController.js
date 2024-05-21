const { getClientDB } = require("../../db/connect");
const { checkUserExists } = require("../../model/authModel");

const removeUser = async (req, res) => {
          const { username } = req.params;
    try {

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const user = await checkUserExists(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const db = await getClientDB();
        const collection = db.collection("users");
        await collection.deleteOne({ username: username });

        return res.status(200).json({ message: "User has been removed" });
    } catch (error) {
        console.error("Error removing user:", error);
        return res.status(500).json({ message: "An error occurred while removing the user" });
    }
};

exports.removeUser = removeUser;
