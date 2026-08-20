// context/CartContext.jsx

'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { addItem, cartCheckout, getCart, removeItem } from "../services/cartServices";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartError, setError] = useState(null);
/*     useEffect(()=>{
        const saved=localStorage.getItem("cart");
        if(saved){

            setCart(JSON.parse(saved));

        }

    },[]);
    //Function for persistence
    useEffect(()=>{
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    },[cart]); */

    const getCartFunction = async () => {
        try {
            const response = await getCart();

            setCart(response.data);

            console.log("Cart data:", response.data);

            return {
                success: true,
                data: response,
            };

        } catch (err) {
            setError(err);
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    };

    const addItemFunction = async (credentials) => {
        setError(null);
        try {
            const response = await addItem(credentials);
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
        }

    };

    const cartCheckoutFunction = async (credentials) => {
        setError(null);
        try {
            const response = await cartCheckout(credentials);
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
        }

    };

    const removeItemFunction = async (credentials) => {
        setError(null);
        try {
            const response = await removeItem(credentials);
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
        }

    };

    useEffect(()=>{
        getCartFunction();
    },[]);

    return (
        <CartContext.Provider value={{ getCartFunction, addItemFunction, cartCheckoutFunction, removeItemFunction, cart, cartError}} >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);