import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 important

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false); // 🔥 done loading
  }, []);

  const login = (token) => {
    localStorage.setItem("admin_token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);