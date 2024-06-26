const { loginSchema, checkUserExists } = require("../../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (username, admin, characterName, realm, characterSpec) => {
  return jwt.sign({ username: username, isAdmin: admin, characterName: characterName, realm: realm, characterSpec: characterSpec }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ message: errorMessage });
    } else {
      const { username, password } = value;

      const user = await checkUserExists(username);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Login failed: Invalid credentials" });
      } else {
        if (await bcrypt.compare(password, user.password)) {
          const accessToken = generateAccessToken(user.username, user.admin, user.characterName, user.realm, user.characterSpec);
          return res
            .cookie("authToken", accessToken, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 60*60*1000,
            })
            .status(200)
            .json({message: `${username} logged in!`});
        } else {
          return res
            .status(401)
            .json({ message: "Login failed: invalid credentials" });
        }
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
