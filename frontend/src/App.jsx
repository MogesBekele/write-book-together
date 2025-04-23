import React from "react";
import Register from "./component/Register";
import Login from "./component/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./component/Home";
import Book from "./component/dashboard/Book";
import Collaborate from "./component/dashboard/Collaborate";
import Profile from "./component/dashboard/Profile";
import Dashboard from "./component/dashboard/Dashboard";
import Settings from "./component/dashboard/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookPage from "./component/dashboard/BookPage";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to /home */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="books" />} /> {/* Redirect to /dashboard/books */}
            <Route path="books" element={<BookPage />} />
            <Route path="collaborate" element={<Collaborate />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
