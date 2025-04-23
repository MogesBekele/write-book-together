import Book from '../models/Book.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// POST /api/book/contribute
const contributeToBook = async (req, res) => {
  try {
    const { content } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let book = await Book.findOne();
    if (!book) {
      book = new Book({ title: 'Write Together', contributions: [] });
    }

    book.contributions.push({
      userId: user._id,
      username: user.username,
      content,
    });

    await book.save();
    res.status(200).json({ message: 'Contribution added successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to contribute to book' });
  }
};

// GET /api/book
const getBookContent = async (req, res) => {
  try {
    const book = await Book.findOne().populate('contributions.userId', 'username');
    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get book content' });
  }
};

export { contributeToBook, getBookContent };