// context/CartContext.jsx

'use client';

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

     useEffect(()=>{
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
    },[cart]);


    //Function to add item
    const addItem = (artwork) => {
        const existing = cart.find(item => item.id === artwork.id);
        if(existing){
            if(!existing.canChangeQuantity){
                alert("Artwork already added.");
                return;
            }
            setCart(prev =>
                prev.map(item =>
                    item.id === artwork.id
                    ? {
                        ...item,
                        quantity:
                        Math.min(item.quantity + 1,item.maxQuantity)
                    }
                    : item
                    
                )
            );
            return;
        }
        setCart(prev => [
            ...prev,
            {
                ...artwork,
                quantity:1
            }
        ]);
    };

    //function to remove items
    const removeItem = (id)=>{
        setCart(prev=>prev.filter(item=>item.id!==id));
    }

    //Function to increse quantity
    const increaseQuantity = (id)=>{
        setCart(prev=>
            prev.map(item=>{
                if(item.id!==id) return item;
                if(item.quantity>=item.maxQuantity)
                    return item;
                return{
                    ...item,
                    quantity:item.quantity+1
                };
            })
        );
    }

    //Function to decrease quantity
    const decreaseQuantity = (id)=>{
        setCart(prev=>
            prev.map(item=>{
                if(item.id!==id) return item;
                if(item.quantity===1)
                    return item;
                return{
                    ...item,
                    quantity:item.quantity-1
                };
            })
        );
    }

    //Function to clear cart
    const clearCart = ()=>{
        setCart([]);
    }

    //Function to calculate price
    const totalPrice = cart.reduce(
        (total,item) => total + item.price * item.quantity
    ,0);

    //Function to calc total items
    const totalItems = cart.reduce(
        (sum,item)=>sum+item.quantity
    ,0);
    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, totalItems, totalPrice, setCart }} >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);