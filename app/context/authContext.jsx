'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getUserData, loginUser, logoutUser, refreshUser, signupUser } from "../services/authServices";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    // LOGIN FUNCTION
    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(credentials);
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

            getUser();
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

          /*   setUser(response.user); */
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

            getUser();
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
            window.location.replace('/');
        }
    };

    // REFRESH FUNCTION
   const refresh = async () => {
        const refreshToken = localStorage.getItem("refresh_token");

        try {
            if (!refreshToken) {
                throw {
                    status: 401,
                    message: "No refresh token",
                };
            }

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
            console.error("Refresh failed:", err);

            await logout();

            window.alert('logIn again')

            return false;
        }
    };

    const getUser = async () => {
        try {
            const response = await getUserData();

            setUser(response.data);
            setIsAuthenticated(true);

            console.log("User data:", response.data);

            return {
                success: true,
                data: response,
            };

        } catch (err) {

            setError(err);

            if (err.status === 401) {
                const refreshed = await refresh();

                if (refreshed) {
                    console.log(
                        "Token refreshed successfully, retrying getUser..."
                    );
                    window.location.reload()
                    return getUser();
                }
            }

            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    };

    const initializeAuth = async () => {
        const access = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (!access || !refreshToken) {
            setIsAuthenticated(false);
            return;
        }

        setAccessToken(access);
        setRefreshToken(refreshToken);

        await getUser();
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
                setIsAuthenticated,
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