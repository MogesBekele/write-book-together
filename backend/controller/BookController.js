import Book from "../models/BookModel.js";
import User from "../models/UserModel.js";

// POST /api/book/contribute
const contributeToBook = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate input
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Find the user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find or create the book
    let book = await Book.findOne();
    if (!book) {
      book = new Book({ title: "Write Together", contributions: [] });
    }

    // Check if the user has already contributed today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const hasContributed = book.contributions.some(
      (contribution) =>
        contribution.userId.toString() === user._id.toString() &&
        new Date(contribution.createdAt) >= today
    );

    if (hasContributed) {
      return res
        .status(400)
        .json({ error: "You can only contribute once per day." });
    }

    // Add the contribution
    book.contributions.push({
      userId: user._id,
      username: user.username,
      content,
    });

    // Save the book
    await book.save();
    res.status(200).json({ message: "Contribution added successfully." });
  } catch (err) {
    console.error("Error contributing to book:", err);
    res.status(500).json({ error: "Failed to contribute to book" });
  }
};

// GET /api/book
const getBookContent = async (req, res) => {
  try {
    // Find the book and populate contributions
    const book = await Book.findOne().populate(
      "contributions.userId",
      "username"
    );
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book content:", err);
    res.status(500).json({ error: "Failed to get book content" });
  }
};

// DELETE /api/book/contribution/:id
const deleteContribution = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book
    const book = await Book.findOne();
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Find the contribution
    const contributionIndex = book.contributions.findIndex(
      (contribution) =>
        contribution._id.toString() === id &&
        contribution.userId.toString() === req.userId
    );

    if (contributionIndex === -1) {
      return res
        .status(403)
        .json({ error: "You can only delete your own contributions." });
    }

    // Remove the contribution
    book.contributions.splice(contributionIndex, 1);
    await book.save();

    res.status(200).json({ message: "Contribution deleted successfully." });
  } catch (err) {
    console.error("Error deleting contribution:", err);
    res.status(500).json({ error: "Failed to delete contribution" });
  }
};

// PUT /api/book/contribution/:id
const editContribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Validate input
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Find the book
    const book = await Book.findOne();
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Find the contribution
    const contribution = book.contributions.find(
      (contribution) =>
        contribution._id.toString() === id &&
        contribution.userId.toString() === req.userId
    );

    if (!contribution) {
      return res
        .status(403)
        .json({ error: "You can only edit your own contributions." });
    }

    // Update the contribution
    contribution.content = content;
    await book.save();

    res.status(200).json({ message: "Contribution updated successfully." });
  } catch (err) {
    console.error("Error editing contribution:", err);
    res.status(500).json({ error: "Failed to edit contribution" });
  }
};

export {
  contributeToBook,
  getBookContent,
  deleteContribution,
  editContribution,
};
