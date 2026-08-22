'use client';
import AdminOrderTable from '@/app/(components)/tables/AdminOrderTable';
import styles from '../artworks/artworks.module.css';
import { useState, useEffect } from 'react';
import AdminRequestTable from '@/app/(components)/tables/AdminRequestTable';
import Loader from '@/app/(components)/loader/loader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetOrders = async (filter) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/gallery/orders?limit=100&offset=0`, { 
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "failed to get orders"
            )
        }
        console.log(data)
        return {
            success:true,
            data: data
        };
    } catch (err) {
        console.log(err)
        return {
            success: false,
            err,
        };
    }
};
const Order = () => {
    const [showing, setShowing] = useState('orders')
    const [oders, setOrder] = useState([]);
        const [filter, setFilter] = useState('');
        const [loading, setLoading] = useState(false);
        const handleSubmit = async (e) => {
            e.preventDefault();
            setFilter(e.target.value)
        }
        useEffect(() => {
            setLoading(true);
            const trying = async () => {
    
                const orders = await GetOrders(filter)
                setOrder(orders?.data || [])
                setLoading(false);
                console.log('get orders', orders?.data)
            }
            trying()
            console.log(filter)
        }, [filter]);
    
    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>Orders (32)</h3>
                <form  className={`row2 ${styles.searchBar}`} action="">
                    <div className="double">
                        Now showing
                        <select value={showing} onChange={(e)=> setShowing(e.target.value)} name="nowShowing"> 
                            <option value="orders">
                                Orders
                            </option>              
                            <option value="requests">
                                Requests
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    <input placeholder="Search here" type="text" name="search" />
                </form>
            </div>
            <br /><br />
            {loading ? <div className='emptyCont'><Loader /></div>  : 
                <>
                    {showing==="orders"&&<AdminOrderTable />}
                    {showing==="requests"&& <AdminRequestTable />}
                </>
            }
        </div>
    );
}
 
export default Order;