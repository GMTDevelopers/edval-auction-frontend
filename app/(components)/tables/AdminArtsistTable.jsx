'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import AdminArtistDetails from '../admin/artistTable';
const AdminArtistTable = ({data}) => {
    const { openModal } = useModal();

    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Artist name</th>
                        <th>Date Added</th>
                        <th>Style</th>
                        <th>Experience</th>
                        <th>Artworks</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data?.length !==0 && data?.map((b, index) => (
                    <tr onClick={()=>openModal(<AdminArtistDetails data={b}/>)} className={styles.dataRow} key={index} >
                        <td>
                            <div className={styles.tableDouble}>
                                <img className={styles.roundedImg} src={b?.profile_image_url||'/images/auction/3.webp'} alt="item" />
                                <div>
                                    <p>{b?.first_name || "-"} {b?.last_name || "-"} </p>
                                    <p>{b?.code || "-"}</p>
                                </div>
                            </div>
                        </td>
                        <td>{new Date(b?.created_at).toDateString() || "N/A"}</td>
                        <td>{b?.artist_profile?.artistic_style || "-"}</td>
                        <td className={styles.amount}>{b?.artist_profile?.years_of_experience || "-"} year(s)</td>
                        <td className={styles.amount}>{b?.stats.total_artworks || "-"}</td>
                        <td> 
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
 
export default AdminArtistTable;