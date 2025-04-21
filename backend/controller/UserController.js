import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import generateToken from "../utilis/GenerateToken.js";
import User from "../models/UserModel.js";
dotenv.config(); // Load environment variables

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Request Body:', req.body); // Debug log
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists'); // Debug log
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: email,
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('New user created:', newUser); // Debug log

    const token = generateToken(newUser._id);
    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = generateToken(user._id);

    // Send the token and user data in the response
    res.status(200).json({
      token,
      user: {
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile
