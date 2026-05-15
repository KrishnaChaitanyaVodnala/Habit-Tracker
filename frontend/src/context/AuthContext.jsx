import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hf_user')); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('hf_token'));

  const login = (tokenVal, userVal) => {
    localStorage.setItem('hf_token', tokenVal);
    localStorage.setItem('hf_user', JSON.stringify(userVal));
    setToken(tokenVal);
    setUser(userVal);
  };

  const logout = () => {
    localStorage.removeItem('hf_token');
    localStorage.removeItem('hf_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
