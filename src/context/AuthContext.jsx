import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        if (user) {
            setCurrentUser(user);
        }

    }, []);

    const register = (userData) => {
        const users = JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const exists = users.find(
            user => user.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (exists) {
            return {
                success: false,
                message: "Email already registered."
            };
        }

        const newUser = {
            id: crypto.randomUUID(),
            ...userData
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        return {
            success: true
        };
    };

    const login = (email, password) => {
        const users = JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const user = users.find(
            u =>
                u.email.toLowerCase === email.toLowerCase &&
                u.password === password
        );

        if (!user) {
            return {
                success: false,
                message: "Invalid email or password."
            };
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        setCurrentUser(user);

        return {
            success: true
        };
    };

    const logout = () => {
        localStorage.removeItem(
            "currentUser"
        );

        setCurrentUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                currentUser,
                register,
                login,
                logout,
                isLoggedIn: !!currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}