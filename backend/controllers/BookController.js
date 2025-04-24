import Book from "../models/BookModel.js";

export const addBook = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log
    console.log("User ID:", req.userId); // Debug log
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const book = new Book({
      title,
      description,
      createdBy: req.userId,
    });

    await book.save();
    console.log("Book added successfully:", book); // Debug log
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.error("Error adding book:", err); // Debug log
    res.status(500).json({ error: "Failed to add book" });
  }
};

export const contributeToBook = async (req, res) => {
  const { text } = req.body;
  const { bookId } = req.params;

  if (!text)
    return res.status(400).json({ message: "Contribution text is required" });

  try {
    console.log("Book ID:", bookId); // Debug log
    console.log("Contribution text:", text); // Debug log
    console.log("User ID:", req.userId); // Debug log

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.contributions.push({
      text,
      contributor: req.userId,
    });

    await book.save();
    res.status(200).json({ message: "Contribution added successfully" });
  } catch (err) {
    console.error("Error contributing to book:", err); // Debug log
    res.status(500).json({ message: "Failed to contribute", error: err });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    console.log("Fetching all books..."); // Debug log
    const books = await Book.find().populate("createdBy", "username");
    console.log("Books fetched successfully:", books); // Debug log
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err); // Debug log
    res.status(500).json({ message: "Failed to fetch books", error: err });
  }
};
