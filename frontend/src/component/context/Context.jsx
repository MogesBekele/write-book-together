import { createContext } from "react";
import { useState } from "react";
export const AppContext = createContext();

export const AppProvider = (Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [expandedBooks, setExpandedBooks] = useState({}); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const token = localStorage.getItem("token"); 

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
