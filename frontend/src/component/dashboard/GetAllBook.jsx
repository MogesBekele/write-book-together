import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading"; // Import the Loading component

const GetAllBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBooks, setExpandedBooks] = useState({}); // Track expanded state for each book
  const toastShown = useRef(false); // Ref to track if toast has been shown

  // Fetch books function
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const res = await axios.get("http://localhost:4000/api/book", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });
      setBooks(res.data);

      // Show success toast only if books are fetched and not empty
      if (res.data.length > 0 && !toastShown.current) {
        toast.success("Books loaded successfully!");
        toastShown.current = true; // Mark toast as shown
      } else if (res.data.length === 0 && !toastShown.current) {
        toast.info("No books available.");
        toastShown.current = true; // Mark toast as shown
      }
    } catch (err) {
      console.error("Failed to load books:", err);
      if (!toastShown.current) {
        toast.error(err.response?.data?.message || "Failed to load books");
        toastShown.current = true; // Mark toast as shown
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to limit the number of words in a string
  const limitWords = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Toggle expanded state for a specific book
  const toggleExpanded = (bookId) => {
    setExpandedBooks((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId], // Toggle the expanded state for the specific book
    }));
  };

  // useEffect to call fetchBooks
  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <Loading />; // Replace with the Loading component
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {books.map((book) => (
          <li
            key={book._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {book.title || "Untitled Book"}
              </h3>
              <p className="text-gray-600 mb-4">
                {expandedBooks[book._id]
                  ? book.description || "No description available."
                  : limitWords(
                      book.description || "No description available.",
                      20
                    )}
              </p>
            </div>
            <button
              className="mt-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white py-1 px-3 rounded-md text-sm hover:from-blue-600 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              onClick={() => toggleExpanded(book._id)} // Toggle description for this book
            >
              {expandedBooks[book._id] ? "Show Less" : "See More"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllBook;
