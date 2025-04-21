import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateToken from "../utilis/GenerateToken.js";
import User from "../models/UserModel.js";
dotenv.config(); // Load environment variables

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save();
    // Generate a token
    const token = generateToken(newUser._id);

    // Send response
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

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password); // Compare the plain password with the hashed password
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = generateToken(user._id);

    // Send response
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
