import React from "react";
import Register from "./component/Register";
import Login from "./component/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Book from "./component/dashboard/Book";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={<Book />} />
          {/* Add more routes as needed */}

        </Routes>
      </Router>
    </>
  );
};

export default App;
