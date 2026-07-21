'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, refreshUser, signupUser } from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // LOGIN FUNCTION
    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(credentials);
            setUser(response.data.user);
            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
            localStorage.setItem(
                "access_token",
                response.data.access_token
            );

            localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
            );

            setIsAuthenticated(true);

            return {
                success: true,
                data: response,
            };
        } catch (err) {
            setError(err);
            return {
                success: false,
                error: err.message,
            };
        } finally {
            setLoading(false);
        }

    };

    // SIGNUP FUNCTION
    const signup = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signupUser(userData);

            setUser(response.user);
            setAccessToken(response.access_token);
            setRefreshToken(response.refresh_token);
            localStorage.setItem(
                "access_token",
                response.access_token
            );

            localStorage.setItem(
                "refresh_token",
                response.refresh_token
            );

            setIsAuthenticated(true);

            return {
                success: true,
                data: response,
            };
        } catch (err) {
            setError(err);
            return {
                success: false,
                error: err.message,
            };
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT FUNCTION
    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser(refreshToken);
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setAccessToken(null);
            setRefreshToken(null);
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    // REFRESH FUNCTION
    const refresh = async () => {
        try {
            const response = await refreshUser(refreshToken);
            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
            localStorage.setItem(
                "access_token",
                response.data.access_token
            );
            localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
            );
            return true;
        } catch (err) {
            logout();
            return false;
        }
    };

    const initializeAuth = () => {
        const access = localStorage.getItem("access_token");
        const refresh = localStorage.getItem("refresh_token");
        if (access) {
            setAccessToken(access);
        }
        if (refresh) {
            setRefreshToken(refresh);
            setIsAuthenticated(true);
        }
    };
    useEffect(() => {
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                refreshToken,
                isAuthenticated,
                loading,
                error,
                login,
                signup,
                logout,
                refresh,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);