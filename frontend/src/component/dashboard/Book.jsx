import React, { useState } from "react";

const Book = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Book One", author: "Author One" },
    { id: 2, title: "Book Two", author: "Author Two" },
    { id: 3, title: "Book Three", author: "Author Three" },
  ]);

  // Add a new book
  const handleAddBook = () => {
    const newBook = {
      id: books.length + 1,
      title: `Book ${books.length + 1}`,
      author: `Author ${books.length + 1}`,
    };
    setBooks([...books, newBook]);
  };

  // Delete a book
  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Books</h1>
        <button
          onClick={handleAddBook}
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-6"
        >
          Add New Book
        </button>
        {books.length > 0 ? (
          <ul className="space-y-4">
            {books.map((book) => (
              <li
                key={book.id}
                className="bg-gray-50 p-4 rounded-md shadow border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {book.title}
                  </h2>
                  <p className="text-gray-600">Author: {book.author}</p>
                </div>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="bg-red-600 text-white font-medium py-1 px-3 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No books available. Add a new book to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Book;