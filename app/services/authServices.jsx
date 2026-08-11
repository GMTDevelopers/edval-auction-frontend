import { useModal } from "../(components)/ModalProvider/ModalProvider";
import Tab from "../(components)/tab/tabs";
    
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "Login failed",
        };
    }

    return data;
};

export const signupUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "Signup failed",
        };
    }

    return data;
};

export const logoutUser = async (refresh_token) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch(`${BASE_URL}/auth/logout`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "Logout failed",
        };
    }

    return data;
};

export const getUserData = async () => {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
        },

    });

    const data = await response.json();
    
    if (!response.ok) {
        /* if (response.status === 401) {
            refreshUser(localStorage.getItem("refresh_token"));
        } */
        throw {
            status: response.status,
            message: data.message || "failed to get user",
        };
    }

    return data;
};

export const refreshUser = async (refresh_token) => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token}),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "Refresh failed",
        };
    }
/*     if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        window.location.reload();
    }
 */
    return data;
};