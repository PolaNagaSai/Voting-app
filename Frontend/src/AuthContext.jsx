import React, { createContext, useState, useContext, useEffect } from 'react';
// import { login as apiLogin} from './apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [hasVoted, setHasVoted] = useState(Boolean(localStorage.getItem('voted')));
  const [userName,setUserName]=useState("");


  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('hasVoted:', hasVoted);
  }, [isAuthenticated, hasVoted]); // Logs when isAuthenticated or hasVoted changes

  const login = (token,isVoted,name) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setHasVoted(isVoted); 
    localStorage.setItem("voted",isVoted);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setHasVoted(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,hasVoted,userName, login, logout,setHasVoted }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
