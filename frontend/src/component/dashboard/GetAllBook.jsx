import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllBook = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const res = await axios.get("http://localhost:4000/api/book");
        setBooks(res.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Failed to load books:", err);
        setError(err.response?.data?.message || "Failed to load books");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchBooks();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 font-semibold text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500 font-medium text-lg mb-4">
            Loading books...
          </p>
        </div>
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500 font-medium text-lg mb-4">
            No books available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
        All Books
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <li
            key={book._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {book.title || "Untitled Book"}
            </h3>
            <p className="text-gray-600 mb-4">
              {book.description || "No description available."}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllBook;
