import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Mantener sesión persistente
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) setUsuario(JSON.parse(savedUser));
  }, []);

  const login = (data) => {
    setUsuario(data);
    localStorage.setItem("usuario", JSON.stringify(data));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

