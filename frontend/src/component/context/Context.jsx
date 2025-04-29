import { createContext } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [book, setBook] = useState(null); // State to store book details
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors

  return (
    <AppContext.Provider value={{ book, setBook, loading, setLoading, error, setError }}>
      {children}
    </AppContext.Provider>
  );
}
