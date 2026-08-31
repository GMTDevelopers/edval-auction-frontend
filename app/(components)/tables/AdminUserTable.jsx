'use client';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import AdminUserDetails from '../admin/userTable';
const AdminUserTable = ({data}) => {
    const { openModal } = useModal();
    console.log('client', data)
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Date Added</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data?.length !==0 && data?.map((b, index) => (
                    <tr onClick={()=>openModal(<AdminUserDetails data={b}/>)} className={styles.dataRow} key={index} >
                        <td data-label="User">
                            <div className={styles.tableDouble}>
                                <img className={styles.roundedImg} src={b?.profile_image_url||'/images/auction/3.webp'} alt="item" />
                                <div>
                                    <p>{b?.first_name || "-"} {b?.last_name || "-"}</p>
                                    <p>{b?.id || "-"}</p>
                                </div>
                            </div>
                        </td>
                        <td data-label="Date Added">{new Date(b?.created_at).toDateString() || "N/A"}</td>
                        <td data-label="Email">{b?.email || "-"}</td>
                        <td data-label="Phone" className={styles.amount}>{b?.phone || "-"}</td>
                        <td data-label="Status"> 
                            <span className={`${styles.status} ${styles[b.is_active?.toString()]}`}>
                            {b?.is_active ? 'Active' : 'Not active'}
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminUserTable;