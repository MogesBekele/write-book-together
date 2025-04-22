import React from "react";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    joined: "April 22, 2025",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
        <div className="bg-gray-50 p-4 rounded-md shadow border border-gray-200">
          <p className="text-gray-600">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600">
            <strong>Joined:</strong> {user.joined}
          </p>
        </div>
        <button
          className="mt-6 bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;