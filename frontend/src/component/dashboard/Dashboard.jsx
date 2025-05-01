import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen sm:flex flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="sm:w-1/4 bg-white shadow-lg p-6 w-full ">
        <nav className="space-y-4 sm:items-center flex-col">
          <NavLink
            to="books"
            className={({ isActive }) =>
              isActive
                ? "block bg-blue-600 text-white py-2 px-4 rounded-md"
                : "block text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            }
          >
            Add Books
          </NavLink>

          <NavLink
            to="get-all-books"
            className={({ isActive }) =>
              isActive
                ? "block bg-blue-600 text-white py-2 px-4 rounded-md"
                : "block text-gray-800 py-2 px-4 rounded-md   hover:bg-gray-200"
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="booklist"
            className={({ isActive }) =>
              isActive
                ? "block bg-blue-600 text-white py-2 px-4 rounded-md"
                : "block text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            }
          >
            Book List
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="p-4 w-full sm:w-3/4">
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;
