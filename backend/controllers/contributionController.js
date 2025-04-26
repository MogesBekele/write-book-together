import Contribution from "../models/ContributionModel.js";
import Book from "../models/BookModel.js";

// Add a contribution to a book
export const addContribution = async (req, res) => {
  const { bookId } = req.params; // Extract bookId from the URL
  const { content } = req.body; // Extract contribution content from the request body

  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ message: "Contribution content cannot be empty." });
  }

  try {
    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    // Create a new contribution
    const contribution = new Contribution({
      bookId,
      userId: req.userId, // Use the userId from the authentication middleware
      content,
    });

    await contribution.save(); // Save the contribution to the database

    // Populate the user details in the contribution
    const populatedContribution = await Contribution.findById(
      contribution._id
    ).populate("userId", "username");

    res.status(201).json({
      message: "Contribution added successfully.",
      contribution: populatedContribution,
    });
  } catch (err) {
    console.error("Error adding contribution:", err);
    res.status(500).json({ message: "Failed to add contribution." });
  }
};

// Get all contributions for a specific book
export const getContributionsByBook = async (req, res) => {
  const { bookId } = req.params; // Extract bookId from the URL

  try {
    // Fetch all contributions for the book and populate user details
    const contributions = await Contribution.find({ bookId }).populate(
      "userId",
      "username"
    );

    res.status(200).json(contributions);
  } catch (err) {
    console.error("Error fetching contributions:", err);
    res.status(500).json({ message: "Failed to fetch contributions." });
  }
};
