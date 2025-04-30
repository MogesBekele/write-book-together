import { createContext } from "react";
import { useState } from "react";
export const AppContext = createContext();

export const AppProvider = (Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState(""); // State for contribution text
  const [loading, setLoading] = useState(false); // Loading state
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null); // State to store book details
  const [error, setError] = useState(null);
  const [expandedBooks, setExpandedBooks] = useState({}); // Track expanded state for each book
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const token = localStorage.getItem("token"); // or use context

  const value = {
    title,
    setTitle,
    description,
    setDescription,
    token,
    contribution,
    setContribution,
    loading,
    setLoading,
    books,
    setBooks,
    error,
    setError,
    expandedBooks,
    setExpandedBooks,
    formData,
    setFormData,
    book,
    setBook,
  };

  return (
    <AppContext.Provider value={{ value }}>
      {Props.children}
    </AppContext.Provider>
  );
};
