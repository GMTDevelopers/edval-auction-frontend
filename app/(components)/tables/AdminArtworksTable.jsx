'use client';

import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
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
                        <td data-label="Artwork">
                            <div className={styles.tableDouble}>
                                <img src={b?.images[0]?.url || null} alt="item" />
                                <div>
                                    <p>{b?.title}</p>
                                    <p>Artist: <span>{b?.artist_details?.first_name} {b?.artist_details?.last_name}</span></p>
                                </div>
                            </div>
                        </td>
                        <td data-label="Category">{b?.category}</td>
                        <td data-label="Date Added">{new Date(b?.created_at).toDateString() || "N/A"}</td>
                        <td data-label="Price" className={styles.amount}>₦{b?.price.toLocaleString() || "N/A"}</td>
                        
                        <td data-label="Status"> 
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