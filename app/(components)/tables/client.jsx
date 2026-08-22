'use client';
import OrderDet from '../clientOrderDetail/page';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './tables.module.css';
const Table = ({data}) => {
    const { openModal } = useModal();
    /* const data = [
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
    ] */
    return ( 
        
            
        <div className={styles.tableContainer}>
            {data.length===0?
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
                    <CircleOff />
                    <p>there has been no orders</p>
                </div>:
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                        {/*    <th>Item</th> */}
                            <th>Avenue</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody> 
                    {data.length !==0 && data.map((b) => (
                        <tr onClick={()=>openModal(<OrderDet data={b}/>)} className={styles.dataRow} key={b.orderId} >
                            <td>{b?.code}</td>
                            {/* <td>
                                <div className={styles.tableDouble}>
                                    <img src={b?.item.img} alt="item" />
                                    <div>
                                        <p>{b?.item.name}</p>
                                        <p>{b?.item.artist}</p>
                                    </div>
                                </div>
                            </td> */}
                            <td>{b?.order_type}</td>
                            <td>{new Date(b?.created_at).toDateString() || "N/A"}</td>
                            <td> 
                                <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                                {b?.status}
                                </span>
                            </td>
                            <td className={styles.amount}>₦{b?.total_amount || "N/A"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div> 
       
    );
}
 
export default Table;