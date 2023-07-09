const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const saltRounds = 10;
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const user_name = email.slice(0, email.indexOf("@"));
    const user = await User.create({
      email,
      password: hashedPassword,
      user_name,
      profile_picture: "https://xsgames.co/randomusers/avatar.php?g=pixel",
    });
    console.log(user);
    if (user) {
      let userObj = user.toObject();
      delete userObj.password;

      res.status(201).json({ message: "User created successfully", userObj });
    }
  } catch (error) {
    if (error.code === 11000)
      res.status(409).json({ error: "User already exists" });
    else res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      let userObj = user.toObject();
      delete userObj.password;

      res.status(200).json({ message: "Login successful", userObj });
    } else {
      res.status(400).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("auth controller", error);
  }
};
