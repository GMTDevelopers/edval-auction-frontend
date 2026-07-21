'use client';
import OrderDet from '../clientOrderDetail/page';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './tables.module.css';
const Table = () => {
    const { openModal } = useModal();
    const data = [
        {
            orderId:"E-2100",
            item:{
                img:"/images/auction/1.webp",
                name:"Whispers of Dawn",
                artist:"Aria Belrose"
            },
            avenue:"Direct Purchase",
            date:"12002300",
            status:"Processing",
            amount:"150.00"
        },
        {
            orderId:"E-2101",
            item:{
                img:"/images/auction/2.webp",
                name:"Echoes of Time",
                artist:"Liam Chen"
            },
            avenue:"Auction winning",
            date:"12002300",
            status:"Processing",
            amount:"300.00"
        }
    ]
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Item</th>
                        <th>Avenue</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody> 
                {data.length !==0 && data.map((b) => (
                    <tr onClick={()=>openModal(<OrderDet />)} className={styles.dataRow} key={b.orderId} >
                        <td>{b?.orderId}</td>
                        <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.item.img} alt="item" />
                                <div>
                                    <p>{b?.item.name}</p>
                                    <p>{b?.item.artist}</p>
                                </div>
                            </div>
                        </td>
                        <td>{b?.avenue}</td>
                        <td>{new Date(b?.date).toDateString() || "N/A"}</td>
                        <td> 
                            <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.status}
                            </span>
                        </td>
                        <td className={styles.amount}>₦{b?.amount.toLocaleString() || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default Table;