import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token"); // or use context

  const value = {
    title,
    setTitle,
    description,
    setDescription,
    token,
  };

  return (
    <AppContext.Provider value={{ value }}>{children}</AppContext.Provider>
  );
};
