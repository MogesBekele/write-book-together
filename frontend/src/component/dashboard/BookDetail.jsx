import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import Contribution from "./Contribution"; // Import Contribution component

const BookDetail = () => {
  const { bookId } = useParams(); // Extract bookId from the URL
  const navigate = useNavigate(); // For navigation
  const [book, setBook] = useState(null); // State to store book details
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch book details function
  const fetchBook = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const res = await axios.get(`http://localhost:4000/api/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });
      setBook(res.data); // Set the book data
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Failed to fetch book:", err);
      if (err.response?.status === 401) {
        setError("You are not authorized. Please log in.");
        navigate("/login"); // Redirect to login page
      } else {
        setError(err.response?.data?.message || "Failed to load book details.");
      }
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Handle new contributions
  const handleContributionAdded = (newContribution) => {
    setBook((prevBook) => ({
      ...prevBook,
      contributions: [...prevBook.contributions, newContribution],
    }));
  };

  // useEffect to call fetchBook
  useEffect(() => {
    fetchBook();
  }, [bookId]);

  if (loading) {
    return <Loading />; // Replace with the Loading component
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-medium text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">{book.title}</h1>
      <p className="text-gray-700 mb-4">{book.description}</p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Contributions
      </h2>
      {book.contributions?.length > 0 ? (
        book.contributions.map((contribution, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-600">{contribution.text}</p>
            <small className="text-gray-500">
              By {contribution.contributor?.username || "Unknown"}
            </small>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No contributions yet.</p>
      )}
      {/* Add Contribution Component */}
      <Contribution
        bookId={bookId}
        onContributionAdded={handleContributionAdded}
      />
    </div>
  );
};

export default BookDetail;
