import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const BookDetail = ({ book }) => {
  const [bookData, setBookData] = useState(book);

  const handleDeleteContribution = async (contributionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:4000/api/book/${bookData._id}/contributions/${contributionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Contribution deleted successfully!");
      setBookData((prev) => ({
        ...prev,
        contributions: prev.contributions.filter((c) => c._id !== contributionId),
      }));
    } catch (error) {
      toast.error("Failed to delete contribution.");
    }
  };

  const handleEditContribution = async (contributionId, oldText) => {
    const newText = prompt("Edit your contribution:", oldText);
    if (!newText || newText.trim() === "") {
      toast.warning("Contribution cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:4000/api/book/${bookData._id}/contributions/${contributionId}`,
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Contribution updated successfully!");
      setBookData((prev) => ({
        ...prev,
        contributions: prev.contributions.map((c) =>
          c._id === contributionId ? res.data.contribution : c
        ),
      }));
    } catch (error) {
      toast.error("Failed to update contribution.");
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg sm:p-6 p-2 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {bookData.title}
      </h2>
      <p className="text-lg text-gray-700 mb-4">{bookData.description}</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Contributions</h3>
      {bookData.contributions.length === 0 ? (
        <p>No contributions yet.</p>
      ) : (
        bookData.contributions.map((contribution) => (
          <div key={contribution._id} className="mb-4 p-4 border rounded-md">
            <p>{contribution.text}</p>
            <button
              onClick={() => handleEditContribution(contribution._id, contribution.text)}
              className="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteContribution(contribution._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default BookDetail;