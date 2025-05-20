import { createContext, useState } from "react";
import Api from "../Api";
import { Navigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    // Base Api
    const { http } = Api();

    // User State
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [user, setUser] = useState(userInfo);

    // Login and Logout Functions
    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
        http.get('logout');
        localStorage.removeItem('userInfo');
        <Navigate to="/login" />
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
