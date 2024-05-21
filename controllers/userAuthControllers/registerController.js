const bcrypt = require("bcrypt");
const { getClientDB } = require("../../db/connect");
const { registerSchema, checkUserExists } = require("../../model/authModel");

const register = async (req, res) => {
  let validation = registerSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(406)
      .json({ message: validation.error.details[0].message });
  }

  const { username, password } = req.body;
  const checkUser = await checkUserExists(username);

  if (checkUser) {
    return res.status(409).json({ message: "User already exists!" });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const cryptedPassword = bcrypt.hashSync(password, salt);

    let newUserData = {
      username: username.toLowerCase(),
      password: cryptedPassword,
      date,
      admin: false
    };

    const db = await getClientDB();
    const collection = db.collection("users");

    const newUser = await collection.insertOne(
      newUserData,
      function (err, res) {
        if (err) res.json({ message: err }).status(400);
      }
    );
    return res.json({ message: "New user added" }).status(200);
  }
};

let date = new Date();

exports.register = register;
