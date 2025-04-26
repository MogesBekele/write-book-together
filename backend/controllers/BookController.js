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
      createdBy: req.userId, // User who created the book
      admin: req.userId, // Set the admin to the user creating the book
    });

    await book.save();
    console.log("Book added successfully:", book); // Debug log
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.error("Error adding book:", err); // Debug log
    res.status(500).json({ error: "Failed to add book" });
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
export const getBookById = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId).populate("createdBy", "username").populate("contributions.contributor", "username");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    res.status(500).json({ message: "Failed to fetch book", error: err });
  }
};