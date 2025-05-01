import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import Contribution from "./Contribution"; // Import the Contribution component
import { AppContext } from "../context/Context"; 

const BookDetail = () => {
  const { bookId } = useParams(); // Extract bookId from the URL
  const navigate = useNavigate();
  const { book, setBook, error, setError, token } =
    useContext(AppContext).value;
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    console.log("fetchBook called"); // Debug log

    if (!token) {
      setError("You are not logged in. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/api/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched Book Data:", res.data); // Debug log
      setBook(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch book:", err);
      if (err.response?.status === 401) {
        setError("You are not authorized. Please log in.");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to load book details.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add a new contribution to the list
  const addNewContribution = (newContribution) => {
    setBook((prevBook) => ({
      ...prevBook,
      contributions: [...prevBook.contributions, newContribution], // Add new contribution to the end
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 mb-72">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">{book.title}</h1>
      <p className="text-gray-700 mb-4">{book.description}</p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Contributions
      </h2>
      {book.contributions?.length > 0 ? (
        book.contributions.map((contribution, index) => (
          <div
            key={index}
            className={`mb-6 p-4 shadow-md rounded-lg border border-gray-200 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            }`}
          >
            <div
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } items-center mb-2`}
            >
              <span
                className={`inline-block font-semibold px-2 py-1 rounded-full ${
                  index % 2 === 0
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {contribution.contributor?.name || "Unknown"}
              </span>
              <span className="text-sm text-gray-400 ml-4">
                {new Date(contribution.date).toLocaleDateString()}
              </span>
            </div>
            <p
              className={`text-gray-800 text-lg font-medium ${
                index % 2 === 0 ? "text-left" : "text-right"
              }`}
            >
              {contribution.text}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No contributions yet.</p>
      )}

      {/* Add Contribution Component */}
      <Contribution bookId={bookId} onNewContribution={addNewContribution} />
    </div>
  );
};

export default BookDetail;
