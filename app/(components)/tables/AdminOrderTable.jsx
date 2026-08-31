'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import AdminOrderDetails from '../admin/orderTable';
const AdminOrderTable = ({orderData}) => {
    const { openModal } = useModal();
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Item(s)</th>
                        <th>From</th> 
                        <th>Order ID</th>
                        <th>Avenue</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody> 
                {orderData.length !==0 && orderData.map((order, index) => (
                    <tr onClick={()=>openModal(<AdminOrderDetails data={order}/>)} className={styles.dataRow} key={index} >
                        <td data-label="Item(s)">
                            <div className={styles.tableDouble}>
                                <img src={order?.items[0]?.artwork.images[0].url} alt="item" />
                                <div>
                                    {order?.items.length>1 ? <p>{order?.items[0]?.title}...</p> : <p>{order?.items[0]?.title}</p>}
                                    <p>{order?.items.length} items</p>
                                </div>
                            </div>
                        </td>
                        <td data-label="From">
                            <div className={styles.tableDouble}>
                                <img className={styles.roundedImg} src={order?.buyer?.profile_image_url} alt="profile" />
                                <div>
                                    <p>{order?.buyer?.full_name}</p>
                                    <p>{order?.buyer?.email}</p>
                                </div>
                            </div>
                        </td> 
                        <td data-label="Order ID" className={styles.amount}>{order?.order_type}</td>
                        
                        <td data-label="Avenue" className={styles.amount}>{order?.order_type}</td>
                        
                        <td data-label="Date">{new Date(order?.created_at).toDateString() || "N/A"}</td>
                        
                        <td data-label="Status"> 
                            <span className={`${styles.status} ${styles[order.status?.toLowerCase()]}`}>
                            {order?.status}
                            </span>
                        </td>
                        <td data-label="Price" className={styles.amount}>₦{order?.total_amount.toLocaleString() || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminOrderTable;