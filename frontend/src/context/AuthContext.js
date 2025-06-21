import { createContext, useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

import { ToastContainer, toast } from "react-toastify"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.post("/", {}, { withCredentials: true }).then((res) => {
      if (res.data.status) {
        setIsLoggedIn(true);
        setUser(res.data.user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
