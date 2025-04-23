import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookPage = () => {
  const [contributions, setContributions] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [editingContribution, setEditingContribution] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // Helper function to get the token
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      throw new Error("Token is missing");
    }
    return `Bearer ${token}`;
  };

  // Fetch contributions
  const fetchContributions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/book", {
        headers: { Authorization: getToken() },
      });
      setContributions(response.data.contributions);
    } catch (error) {
      console.error("Error fetching contributions:", error);
      toast.error(
        error.response?.data?.error || "Failed to fetch contributions."
      );
    }
  };

  // Add a new contribution
  const handleAddContribution = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/book/contribute",
        { content: newContent },
        {
          headers: { Authorization: getToken() },
        }
      );
      toast.success("Contribution added successfully!");
      setNewContent("");
      fetchContributions();
    } catch (error) {
      console.error("Error adding contribution:", error);
      toast.error(error.response?.data?.error || "Failed to add contribution.");
    }
  };

  // Delete a contribution
  const handleDeleteContribution = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/book/contribution/${id}`, {
        headers: { Authorization: getToken() },
      });
      toast.success("Contribution deleted successfully!");
      fetchContributions();
    } catch (error) {
      console.error("Error deleting contribution:", error);
      toast.error(
        error.response?.data?.error || "Failed to delete contribution."
      );
    }
  };

  // Edit a contribution
  const handleEditContribution = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/book/contribution/${editingContribution._id}`,
        { content: editedContent },
        {
          headers: { Authorization: getToken() },
        }
      );
      toast.success("Contribution updated successfully!");
      setEditingContribution(null);
      setEditedContent("");
      fetchContributions();
    } catch (error) {
      console.error("Error editing contribution:", error);
      toast.error(
        error.response?.data?.error || "Failed to edit contribution."
      );
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Book Contributions
        </h1>

        {/* Add Contribution */}
        <div className="mb-6">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your contribution..."
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          <button
            onClick={handleAddContribution}
            className="mt-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Contribution
          </button>
        </div>

        {/* Contributions List */}
        <ul className="space-y-4">
          {contributions.map((contribution) => (
            <li
              key={contribution._id}
              className="bg-gray-50 p-4 rounded-md shadow border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800">{contribution.content}</p>
                  <p className="text-sm text-gray-600">
                    By: {contribution.username} |{" "}
                    {new Date(contribution.createdAt).toLocaleString()}
                  </p>
                </div>
                {contribution.userId === localStorage.getItem("userId") && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingContribution(contribution);
                        setEditedContent(contribution.content);
                      }}
                      className="bg-yellow-500 text-white font-medium py-1 px-3 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteContribution(contribution._id)}
                      className="bg-red-600 text-white font-medium py-1 px-3 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Edit Contribution Modal */}
        {editingContribution && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Edit Contribution</h2>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setEditingContribution(null)}
                  className="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditContribution}
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
