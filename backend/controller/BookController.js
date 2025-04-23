import Book from '../models/BookModel.js';

export const addBook = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const newBook = new Book({
      title,
      description,
      createdBy: req.user._id
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error });
  }
};
