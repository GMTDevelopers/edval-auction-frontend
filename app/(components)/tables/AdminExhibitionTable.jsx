'use client';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import AdminExhibitionDetails from '../admin/exhibitionTable';
const AdminExhibitionTable = ({data}) => {
    const { openModal } = useModal();
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Exhibition title</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Attending</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data?.length !==0 && data?.map((b, index) => (
                    <tr onClick={()=>openModal(<AdminExhibitionDetails data={b}/>)} className={styles.dataRow} key={index} >
                        <td data-label="Exhibition title">
                            <div className={styles.tableDouble}>
                                <img src={b?.banner_url || '/images/exhibition/ex1.webp'} alt="item" />
                                <div>
                                    <p>{b?.title || '-'}</p>
                                    <p>{b?.code || b?.id || '-'}</p>
                                </div>
                            </div>
                        </td>
                        <td data-label="Date">{new Date(b?.start_date).toDateString() || "N/A"}</td>
                        <td data-label="Venue">{b?.venue || '-'}</td>
                        <td data-label="Attending" className={styles.amount}>{b?.attendance_count || '-'}</td>
                        <td data-label="Status"> 
                            <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.status || '-' }
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminExhibitionTable;