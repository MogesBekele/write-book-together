import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import generateToken from "../utilis/GenerateToken.js";
dotenv.config(); // Load environment variables

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      _id: email,
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token
    const token = generateToken(newUser._id);

    // Send the token and user data in the response
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
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
