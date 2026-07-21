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

export const refreshUser = async (refreshToken) => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "Refresh failed",
        };
    }

    return data;
};