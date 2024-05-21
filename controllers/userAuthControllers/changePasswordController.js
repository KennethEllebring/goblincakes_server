const bcrypt = require("bcrypt");
const { getClientDB } = require("../../db/connect");
const { updatePasswordSchema, checkUserExists } = require("../../model/authModel");

const changePassword = async (req, res) => {
  let validation = updatePasswordSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(406)
      .json({ message: validation.error.details[0].message });
  }

  const { username, oldPassword, newPassword } = req.body;

  const user = await checkUserExists(username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid old password" });
  }

  const salt = bcrypt.genSaltSync(10);
  const newHashedPassword = bcrypt.hashSync(newPassword, salt);

  const db = await getClientDB();
  const collection = db.collection("users");
  await collection.updateOne(
    { username: username },
    { $set: { password: newHashedPassword } }
  );

  return res.json({ message: "Password updated successfully" }).status(200);
};

exports.changePassword = changePassword;
