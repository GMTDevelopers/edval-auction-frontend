'use client';
import AdminOrderTable from '@/app/(components)/tables/AdminOrderTable';
import styles from '../artworks/artworks.module.css';
import { useState } from 'react';
import AdminRequestTable from '@/app/(components)/tables/AdminRequestTable';
const Order = () => {
    const [showing, setShowing] = useState('orders')
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
            {showing==="orders"&&<AdminOrderTable /> }
            {showing==="requests"&& <AdminRequestTable />}
        </div>
    );
}
 
export default Order;