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
                        <td>{b?.code}</td>
                        <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.images[0]?.url || null} alt="item" />
                                <div>
                                    <p>{b?.title}</p>
                                    <p>{b?.artist_details?.first_name} {b?.artist_details?.last_name}</p>
                                </div>
                            </div>
                        </td>
                        <td>{new Date(b?.updated_at).toDateString() || "N/A"}</td>
                        <td className={styles.amount}>₦{b?.price.toLocaleString() || "N/A"}</td>
                        <td>{b?.quantity}</td>
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
 
export default ArtistArtworksTable;