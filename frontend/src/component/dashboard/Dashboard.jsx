import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <NavLink
            to="books"
            className={({ isActive }) =>
              isActive
                ? "block bg-blue-600 text-white py-2 px-4 rounded-md"
                : "block text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            }
          >
            Manage Books
          </NavLink>
          <NavLink
            to="collaborate"
            className={({ isActive }) =>
              isActive
                ? "block bg-green-600 text-white py-2 px-4 rounded-md"
                : "block text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            }
          >
            Collaborate
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive
                ? "block bg-purple-600 text-white py-2 px-4 rounded-md"
                : "block text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive
                ? "block bg-gray-600 text-white py-2 px-4 rounded-md"
                : "block text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            }
          >
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;