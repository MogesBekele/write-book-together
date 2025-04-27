import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import { toast } from "react-toastify"; // Import toast

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contribution, setContribution] = useState(""); // State for user contribution
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

  const handleContributionSubmit = async (e) => {
    e.preventDefault();
    if (!contribution.trim()) {
      toast.error("Contribution cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/contribution",
        { text: contribution },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Contribution added successfully!");
      setContribution(""); // Clear the input field
    } catch (err) {
      console.error("Failed to add contribution:", err);
      toast.error(err.response?.data?.message || "Failed to add contribution.");
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
        <p className="text-2xl font-bold text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-16 bg-gray-50 min-h-screen">
      <h1 className="text-6xl font-extrabold text-blue-700 mb-8 text-center">
        Book Titles
      </h1>
      <h6 className="text-3xl font-semibold text-gray-700 mb-12 text-center">
        Discover a variety of niches and share your expertise to inspire others.
      </h6>

      {/* Contribution Form */}
      <form
        onSubmit={handleContributionSubmit}
        className="mb-12 max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add Your Contribution
        </h2>
        <textarea
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          placeholder="Write your contribution here..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          Submit Contribution
        </button>
      </form>

      <ul className="space-y-8">
        {books.map((book) => (
          <li
            key={book._id}
            className="flex items-center space-x-8 text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer"
            onClick={() => {
              toast.info(`Navigating to book: ${book.title}`);
              navigate(`/dashboard/book/${book._id}`); // Navigate to book details
            }}
          >
            <span className="w-6 h-6 bg-blue-500 rounded-full"></span>{" "}
            {/* Larger Bullet */}
            <span>{book.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
