const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  //Basic Validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }
  try {
    //check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    //Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    console.error("UsersController", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };
