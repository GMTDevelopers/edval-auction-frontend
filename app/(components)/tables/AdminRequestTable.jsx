'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import ArtistLotDetails from '../lotDetail/artistArtworkDetails';
import AdminArtistLotDetails from '../lotDetail/adminArtworkDetails';
import AdminRequestDetails from '../admin/requestTable';
import AdminRequestPCDetails from '../admin/requestTablePC';
import AdminRequestExhDetails from '../admin/requestTableExh';
const AdminRequestTable = ({data}) => {
    const { openModal } = useModal();
    console.log('request data', data)
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Artwork</th>
                        <th>Date</th>
                        <th>Request type</th>  
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody> 
                {data.length !==0 && data.map((b, index) => (
                    <tr key={index} onClick={()=>openModal(b?.request_type==="auction" && <AdminRequestDetails data={b}/> || b?.request_type==="portrait_commission"&&<AdminRequestPCDetails data={b}/> || b?.request_type==="exhibition_submission"&&<AdminRequestExhDetails data={b}/> )} className={styles.dataRow}>
                        
                        <td data-label="From">
                            <div className={styles.tableDouble}>
                                <img className={styles.roundedImg} src={'/images/logo.png'} alt="item" />
                                <div>
                                    <p>{b?.from_user}</p>
                                    <p>{b?.email}</p>
                                </div>
                            </div>
                        </td>
                        <td data-label="Artwork">
                            <div className={styles.tableDouble}>
                                <img src={b?.artwork?.images[0].url} alt="item" />
                                <div>
                                    <p>{b?.artwork?.title}</p>
                                    <p>{b?.artwork?.category}</p>
                                </div>
                            </div>
                        </td>                        
                        <td data-label="Date">{new Date(b?.created_at).toDateString() || "N/A"}</td>
                        <td data-label="Request type">{b?.request_type}</td>                        
                        <td data-label="Status"> 
                            <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.status}
                            </span>
                        </td>
                        <td data-label="Amount" style={{fontWeight:600}} className={styles.amount}>₦{b?.amount?.toLocaleString() || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminRequestTable;