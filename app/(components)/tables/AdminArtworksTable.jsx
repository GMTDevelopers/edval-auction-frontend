'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import ArtistLotDetails from '../lotDetail/artistArtworkDetails';
import AdminArtistLotDetails from '../lotDetail/adminArtworkDetails';
const AdminArtworkTable = ({data}) => {
    const { openModal } = useModal();
   
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Artwork</th>
                        <th>Category</th>
                        <th>Date Added</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data?.length !==0 && data?.map((b, index) => (
                    <tr onClick={()=>openModal(<AdminArtistLotDetails data={b}/>)} className={styles.dataRow} key={index} >
                        <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.images[0]?.url || null} alt="item" />
                                <div>
                                    <p>{b?.title}</p>
                                    <p>Artist: <span>{b?.artist_details?.first_name} {b?.artist_details?.last_name}</span></p>
                                </div>
                            </div>
                        </td>
                        <td>{b?.category}</td>
                        <td>{new Date(b?.created_at).toDateString() || "N/A"}</td>
                        <td className={styles.amount}>₦{b?.price.toLocaleString() || "N/A"}</td>
                        
                        <td> 
                            <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.status}
                            </span>
                        </td>

                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminArtworkTable;