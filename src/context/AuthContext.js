// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authToken) {
            setUser({});
        } else {
            setUser(null);
        }
    }, [authToken]);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
