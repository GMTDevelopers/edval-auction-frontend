'use client'
import Loader from '@/app/(components)/loader/loader';
import styles from './client.module.css';
import Table from "@/app/(components)/tables/client";
import { useAuth } from '@/app/context/authContext';
import { useEffect, useState } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getOrders = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/gallery/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching order data:', err);
        return {
            success: false,
            error: err.message,
        };
    }
}
const MyOrders = () => {
    const [order, setOrders] = useState([]);
    const {user} = useAuth(); 
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const trying = async () => {
            console.log('user',user)
            if (user){
                const orders = await getOrders(user?.id)
                setOrders(orders.data || [])
                console.log('orders',orders)
            }
            setLoading(false);           
        }
        trying()
    }, [user]);
    return ( 
        <div className={styles.container}>
            <div className="container">
                <h2>My Orders ({order.length})</h2>
                {
                    loading? <div className='emptyCont'> <Loader /> </div>  :
                    <Table data={order}/>
                }
                
            </div>
        </div>
    );
}
 
export default MyOrders;