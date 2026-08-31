'use client';
import AdminOrderTable from '@/app/(components)/tables/AdminOrderTable';
import styles from '../artworks/artworks.module.css';
import { useState, useEffect } from 'react';
import AdminRequestTable from '@/app/(components)/tables/AdminRequestTable';
import Loader from '@/app/(components)/loader/loader';
import { toast } from 'sonner';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetOrders = async () => {
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

const GetRequest = async (filter) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/requests?limit=100&offset=0&request_type=${filter.request_type}&status=${filter.status}`, { 
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
    const [orders, setOrder] = useState([]);
    const [request, setRequest] = useState([]);
    const [filter, setFilter] = useState({status:'', request_type:''});
    const [loading, setLoading] = useState(true);
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        setFilter(prev=>({
            ...prev, 
            request_type:e.target.value
        }))
    }
    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        setFilter(prev=>({
            ...prev, 
            status:e.target.value
        }))
    }
    const tryingOrder = async () => {
        const orders = await GetOrders(filter)
        setOrder(orders?.data.data || [])
        console.log('get orders', orders?.data.data)
    }
    const tryingRequest = async () => {
        const request = await GetRequest(filter)
        setRequest(request?.data.data || [])
        console.log('get request', request?.data.data)
    }
    useEffect(() => {
        const getData = async () => {    
            try {
                await tryingOrder();
                await tryingRequest(); 
            } catch (error) {
                toast.error('Could not get page data')
            }finally{
                setLoading(false);
            }
        }
        getData()
        console.log(filter);
    }, [filter]);
    
    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>{showing} ({showing==='orders' ? orders?.length : request?.length})</h3>
                <form  className={`row3 ${styles.searchBar}`} action="">
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
                    {showing !== 'orders' && <div className="double">
                        Request type
                        <select value={filter.request_type} onChange={handleRequestSubmit} name="nowShowing"> 
                            <option value=''>
                                All
                            </option>              
                            <option value="portrait_commission">
                                Portrait Commission
                            </option>              
                            <option value="auction">
                                Auction
                            </option>                                
                            <option value="exhibition_submission">
                                exhibition submission
                            </option>                                                            
                                                                                        
                        </select>
                    </div>}
                    {showing !== 'orders' && <div className="double">
                        Status
                        <select value={filter.status} onChange={handleStatusSubmit} name="nowShowing"> 
                            <option value="pending">
                                Pending
                            </option>              
                            <option value="auction">
                                Auction
                            </option>                                
                            <option value="exhibition">
                                Exhibition
                            </option>                                
                            <option value="exhibition">
                                commission
                            </option>                                
                                                                                        
                        </select>
                    </div>}
                </form>
            </div>
            <br /><br />
            {loading ? <div className='emptyCont'><Loader /></div>  : 
                <>
                    {showing==="orders"? <AdminOrderTable orderData={orders} /> : <AdminRequestTable data={request}/>}
{/*                     {showing==="requests"&& } */}
                </>
            }
        </div>
    );
}
 
export default Order;