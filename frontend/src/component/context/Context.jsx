import { createContext } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const value ={
        title,
        setTitle,
        description,
        setDescription,

    }



  return (
    <AppContext.Provider value={{value}}>
      {children}
    </AppContext.Provider>
  );
}
