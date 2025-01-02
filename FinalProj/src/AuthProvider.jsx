
import React, {createContext, useState, useContext } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const [isloggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=> {
      const storedLogin = localStorage.getItem('isLoggedIn');
      if (storedLogin === 'true'){
        setIsLoggedIn(true);
      }
    }, [])


    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    }

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn', 'true');
        navigate('/home')
    }

    return (
        <AuthContext.Provider value={{isloggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()  => useContext(AuthContext);
