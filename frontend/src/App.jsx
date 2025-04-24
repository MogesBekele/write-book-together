import React from "react";
import Register from "./component/Register";
import Login from "./component/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./component/Home";
import Profile from "./component/dashboard/Profile";
import Dashboard from "./component/dashboard/Dashboard";
import Settings from "./component/dashboard/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import BookPage from "./component/dashboard/BookPage";
//import Collaborate from "./component/dashboard/Collaborate";
import AddBook from "./component/dashboard/AddBook";
import BookDetail from "./component/dashboard/BookDetail";
import GetAllBook from "./component/dashboard/GetAllBook";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/home" />} />{" "}
          {/* Redirect to /home */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="books" />} />
            <Route path="books" element={<AddBook />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="get-all-books" element={<GetAllBook />} />
            <Route path="bookdetails/:bookId" element={<BookDetail />} />{" "}
            {/* Add this route */}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
