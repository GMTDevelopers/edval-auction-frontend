'use client';
import { CircleOff } from 'lucide-react';
import OrderDet from '../clientOrderDetail/page';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './tables.module.css';
const Table = ({data}) => {
    const { openModal } = useModal();
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
                    {data.length !==0 && data.map((b, index) => (
                        <tr key={index} onClick={()=>openModal(<OrderDet status={b?.status} data={b}/>)} className={styles.dataRow} >
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