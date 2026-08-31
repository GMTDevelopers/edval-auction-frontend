'use client';
import OrderDet from '../clientOrderDetail/page';
import ArtistLotDetails from '../lotDetail/artistArtworkDetails';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './tables.module.css';
const ArtistArtworksTable = ({data}) => {
    const { openModal } = useModal();
    
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Artwork ID</th>
                        <th>Artwork</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data?.length !==0 && data.map((b, index) => (
                    <tr onClick={()=>openModal(<ArtistLotDetails lot={b}/>)} className={styles.dataRow} key={index} >
                        <td data-label="Artwork ID">{b?.code}</td>
                        <td data-label="Artwork">
                            <div className={styles.tableDouble}>
                                <img src={b?.images[0]?.url || null} alt="item" />
                                <div>
                                    <p>{b?.title}</p>
                                    <p>{b?.artist_details?.first_name} {b?.artist_details?.last_name}</p>
                                </div>
                            </div>
                        </td>
                        <td data-label="Date">{new Date(b?.updated_at).toDateString() || "N/A"}</td>
                        <td data-label="Price" className={styles.amount}>₦{b?.price.toLocaleString() || "N/A"}</td>
                        <td data-label="Quantity">{b?.quantity}</td>
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
 
export default ArtistArtworksTable;