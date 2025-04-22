import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Welcome to your dashboard! Use the options below to navigate to different sections.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/dashboard/books")}
            className="bg-blue-600 text-white font-medium py-3 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Manage Books
          </button>
          <button
            onClick={() => navigate("/dashboard/collaborate")}
            className="bg-green-600 text-white font-medium py-3 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Collaborate
          </button>
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="bg-purple-600 text-white font-medium py-3 px-4 rounded-md shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="bg-gray-600 text-white font-medium py-3 px-4 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;