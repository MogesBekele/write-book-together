import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Write Together</h1>
        <p className="text-gray-600 text-lg mb-6">
          Collaborate with others to write amazing stories, articles, or books. Join our community and start your writing journey today!
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;