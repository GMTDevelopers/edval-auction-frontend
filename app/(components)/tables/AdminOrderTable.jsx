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
                       {/*  <th>Item</th>
                        <th>From</th> */}
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
                        {/* <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.item.img} alt="item" />
                                <div>
                                    <p>{b?.item.name}</p>
                                    <p>{b?.orderId}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={styles.tableDouble}>
                                <img className={styles.roundedImg} src={b?.item.img} alt="item" />
                                <div>
                                    <p>{b?.item.artist}</p>
                                    <p>{b?.email}</p>
                                </div>
                            </div>
                        </td> */}
                        <td className={styles.amount}>{order?.order_type}</td>
                        
                        <td className={styles.amount}>{order?.order_type}</td>
                        
                        <td>{new Date(order?.created_at).toDateString() || "N/A"}</td>
                        
                        <td> 
                            <span className={`${styles.status} ${styles[order.status?.toLowerCase()]}`}>
                            {order?.status}
                            </span>
                        </td>
                        <td className={styles.amount}>₦{order?.total_amount.toLocaleString() || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminOrderTable;