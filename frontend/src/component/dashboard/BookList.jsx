import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for routing

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/book", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError(err.response?.data?.message || "Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      <ul>
        {books.map((book) => (
          <li
            key={book._id}
            className="text-blue-600 hover:underline cursor-pointer mb-4"
            onClick={() => navigate(`/dashboard/book/${book._id}`)} // Updated path to match App.jsx
          >
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
