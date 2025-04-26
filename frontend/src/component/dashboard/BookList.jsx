import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import { toast } from "react-toastify"; // Import toast

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
      toast.error(err.response?.data?.message || "Failed to load books."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Book Titles
      </h1>
      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book._id}
            className="text-lg font-medium text-blue-600 hover:underline cursor-pointer"
            onClick={() => {
              toast.info(`Navigating to book: ${book.title}`); // Show info toast
              navigate(`/dashboard/book/${book._id}`); // Navigate to book details
            }}
          >
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
