// context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      if (parsed?.email) {
        setUser(parsed); // ✅ ensure valid user
      }
    } catch (err) {
      console.error("Invalid user session");
    }
  }
  setLoading(false); // ✅ must be outside if-block
}, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const login = (userData) => {
     const normalizedUser = {
    ...userData,
    _id: userData._id || userData.sub, // fallback
  };
  setUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, darkMode, setDarkMode }}
    >
      {children}
    </UserContext.Provider>
  );
};
