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
    const book = await book.find().populate("createdBy",)
    
  } catch (error) {
    
  }
  // try {
  //   console.log("Fetching all books..."); // Debug log
  //   const books = await Book.find().populate("createdBy", "username");
  //   console.log("Books fetched successfully:", books); // Debug log
  //   res.status(200).json(books);
  // } catch (err) {
  //   console.error("Error fetching books:", err); // Debug log
  //   res.status(500).json({ message: "Failed to fetch books", error: err });
  // }
};
export const getBookById = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId)
      .populate("createdBy", "name") // Populate the creator's name
      .populate("contributions.contributor", "name"); // Populate the contributor's name

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    res.status(500).json({ message: "Failed to fetch book", error: err });
  }
};
// Add a contribution to a book
export const addContribution = async (req, res) => {
  const { bookId } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Contribution text is required." });
  }

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    const contribution = {
      text,
      contributor: req.userId, // Assuming `req.userId` is populated by auth middleware
    };

    book.contributions.push(contribution); // Add the contribution to the book
    await book.save(); // Save the updated book

    // Populate the newly added contribution with the contributor's name
    const populatedBook = await Book.findById(bookId).populate(
      "contributions.contributor",
      "name"
    );

    const newContribution = populatedBook.contributions.pop(); // Get the last added contribution
    res.status(201).json({ contribution: newContribution });
  } catch (error) {
    console.error("Error adding contribution:", error);
    res.status(500).json({ message: "Failed to add contribution." });
  }
};

// Get contributions for a book
export const getContributions = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId).populate(
      "contributions.contributor",
      "name"
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book.contributions);
  } catch (error) {
    console.error("Error fetching contributions:", error);
    res.status(500).json({ message: "Failed to fetch contributions." });
  }
};

// DELETE /api/contributions/:id

export const deleteContribution = async (req, res) => {
  const { bookId, contributionId } = req.params;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    // Find the contribution index
    const contributionIndex = book.contributions.findIndex(
      (contribution) => contribution._id.toString() === contributionId
    );

    if (contributionIndex === -1) {
      return res.status(404).json({ message: "Contribution not found." });
    }

    // Remove the contribution from the array
    book.contributions.splice(contributionIndex, 1);
    await book.save(); // Save the updated book

    res.status(200).json({ message: "Contribution deleted successfully." });
  } catch (error) {
    console.error("Error deleting contribution:", error);
    res.status(500).json({ message: "Failed to delete contribution." });
  }
};
export const editContribution = async (req, res) => {
  const { bookId, contributionId } = req.params;
  const { text } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    const contribution = book.contributions.id(contributionId);

    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found." });
    }

    // Optional: check if the user is the owner
    // if (contribution.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized to edit this contribution." });
    // }

    contribution.text = text;
    await book.save();

    res.status(200).json({ message: "Contribution updated successfully.", contribution });
  } catch (error) {
    console.error("Error updating contribution:", error);
    res.status(500).json({ message: "Failed to update contribution." });
  }
};
