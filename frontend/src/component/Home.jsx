import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500 p-4">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to <span className="text-teal-600">Write Together</span>
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Collaborate with others to write amazing stories, articles, or books.
          Join our community and start your writing journey today!
        </p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => navigate("/register")}
            className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
