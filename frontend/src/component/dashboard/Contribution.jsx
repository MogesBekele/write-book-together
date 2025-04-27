import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contribution = () => {
  const [contribution, setContribution] = useState(""); // State for contribution text
  const [loading, setLoading] = useState(false); // Loading state

  const handleContributionSubmit = async (e) => {
    e.preventDefault();
    if (!contribution.trim()) {
      toast.error("Contribution cannot be empty!");
      return;
    }

    try {
      setLoading(true); // Set loading state
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
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <form
        onSubmit={handleContributionSubmit}
        className="mb-12 max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add Your Contribution
        </h2>
        <label
          htmlFor="contribution"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Your Contribution
        </label>
        <textarea
          id="contribution"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          placeholder="Write your contribution here..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          maxLength="500"
        ></textarea>
        <div className="text-right text-sm text-gray-500 mt-1">
          {contribution.length}/500 characters
        </div>
        <button
          type="submit"
          className={`mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Contribution"}
        </button>
      </form>
    </div>
  );
};

export default Contribution;
