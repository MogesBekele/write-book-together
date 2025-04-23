import Book from "../models/BookModel.js";

export const addBook = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log
    console.log("User ID:", req.userId); // Debug log
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Create a new book
    const book = new Book({
      title,
      description,
      createdBy: req.userId, // Assuming `req.userId` is set by the `verifyToken` middleware
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
};
