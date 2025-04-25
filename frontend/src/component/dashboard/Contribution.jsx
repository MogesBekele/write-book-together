import React, { useState } from "react";
import axios from "axios";

const Contribution = ({ bookId, onContributionAdded }) => {
  const [text, setText] = useState(""); // State to store the contribution text
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState(null); // State to handle errors

  const handleAddContribution = async () => {
    if (!text.trim()) {
      setError("Contribution text cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const res = await axios.post(
        `http://localhost:4000/api/book/${bookId}/contribution`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );
      setText(""); // Clear the input field
      setError(null); // Clear any previous errors
      onContributionAdded(res.data); // Notify parent component about the new contribution
    } catch (err) {
      console.error("Failed to add contribution:", err);
      setError(err.response?.data?.message || "Failed to add contribution.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add a Contribution
      </h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
        rows="4"
        placeholder="Write your contribution here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleAddContribution}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Contribution"}
      </button>
    </div>
  );
};

export default Contribution;
