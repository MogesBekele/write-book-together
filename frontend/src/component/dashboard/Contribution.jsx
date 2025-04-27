import React from 'react'

const Contribution = () => {
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
  return (
    <div>

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
    </div>
  )
}

export default Contribution