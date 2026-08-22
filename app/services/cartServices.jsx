const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const getCart = async () => {
    const accessToken = localStorage?.getItem("access_token");
    const response = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
        },

    });
    const data = await response.json();    
    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "failed to get cart",
        };
    }

    return data;
};

export const addItem = async (credentials) => {
    const accessToken = localStorage?.getItem("access_token");
    const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.error.message || "Add item failed",
        };
    }

    return data;
};

export const cartCheckout = async (credentials) => {
    const accessToken = localStorage?.getItem("access_token");
    const response = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "Checkout failed",
        };
    }

    return data;
};

export const removeItem = async (credentials) => {
    const accessToken = localStorage?.getItem("access_token");
    const response = await fetch(`${BASE_URL}/cart/items/${credentials}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || "delete item failed",
        };
    }

    return data;
};


