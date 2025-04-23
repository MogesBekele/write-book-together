import Book from '../models/BookModel.js';
import User from '../models/UserModel.js';

// POST /api/book/contribute
const contributeToBook = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate input
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Find the user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find or create the book
    let book = await Book.findOne();
    if (!book) {
      book = new Book({ title: 'Write Together', contributions: [] });
    }

    // Add the contribution
    book.contributions.push({
      userId: user._id,
      username: user.username,
      content,
    });

    // Save the book
    await book.save();
    res.status(200).json({ message: 'Contribution added successfully.' });
  } catch (err) {
    console.error('Error contributing to book:', err);
    res.status(500).json({ error: 'Failed to contribute to book' });
  }
};

// GET /api/book
const getBookContent = async (req, res) => {
  try {
    // Find the book and populate contributions
    const book = await Book.findOne().populate('contributions.userId', 'username');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error('Error fetching book content:', err);
    res.status(500).json({ error: 'Failed to get book content' });
  }
};

export { contributeToBook, getBookContent };