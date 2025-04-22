import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-gray-600 mb-6">
          Manage your account settings and preferences below.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Account Settings
            </h2>
            <button
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Notification Preferences
            </h2>
            <button
              className="bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Manage Notifications
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Privacy Settings
            </h2>
            <button
              className="bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Update Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;