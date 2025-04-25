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
    console.log("Fetching book details..."); // Debug log
    const book = await Book.findById(bookId)
      .populate("createdBy", "username") // Populate the creator's username
      .populate("contributions.contributor", "username"); // Populate contributors' usernames

    console.log("Populated Book:", book); // Debug log

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book details:", err); // Debug log
    res.status(500).json({ message: "Failed to fetch book details", error: err });
  }
};




// Add a contribution to a book
export const addContribution = async (req, res) => {
  const { bookId } = req.params; // Extract bookId from the URL
  const { text } = req.body; // Extract contribution text from the request body

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Contribution text cannot be empty." });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    // Add the contribution to the book
    const contribution = {
      text,
      contributor: req.userId, // Use the userId from the authentication middleware
    };
    book.contributions.push(contribution);
    await book.save();

    // Populate the contributor's username in the response
    const populatedBook = await Book.findById(bookId).populate(
      "contributions.contributor",
      "username"
    );

    const newContribution =
      populatedBook.contributions[populatedBook.contributions.length - 1]; // Get the last added contribution

    console.log("New Contribution with Populated Username:", newContribution); // Debug log

    res.status(201).json(newContribution); // Return the new contribution with username
  } catch (err) {
    console.error("Error adding contribution:", err);
    res.status(500).json({ message: "Failed to add contribution." });
  }
};