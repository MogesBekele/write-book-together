import React from "react";
import Register from "./component/Register";
import Login from "./component/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Book from "./component/dashboard/Book";
import Collaborate from "./component/dashboard/Collaborate";
import Profile from "./component/dashboard/Profile";
import Dashboard from "./component/dashboard/Dashboard";
import Settings from "./component/dashboard/Settings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="books" element={<Book />} />
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
