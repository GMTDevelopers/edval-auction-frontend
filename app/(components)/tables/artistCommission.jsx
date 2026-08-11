'use client';

import ArtistLotDetails from '../lotDetail/artistArtworkDetails';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './tables.module.css';

const ArtistCommissionsTable = ({ sub }) => {
    const { openModal } = useModal();
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Artwork ID</th>
                        <th>Artwork</th>
                        <th>Date submitted</th>
                        <th>Request type</th>
                        <th>Approval</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {sub.length !==0 && sub?.data?.map((b,index) => (
                    <tr onClick={()=>openModal(<ArtistLotDetails lot={b}/>)} className={styles.dataRow} key={index} >
                        <td>{b?.code}</td>
                        <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.images?.[0].url} alt="item" />
                                <div>
                                    <p>{b?.title}</p>
                                    <p>{b?.artist_details?.first_name} {b?.artist_details?.last_name}</p>
                                </div>
                            </div>
                        </td>
                        <td>{new Date(b?.created_at).toDateString() || "N/A"}</td>
                        <td>{b?.request_type || "N/A"}</td>
                        <td>{b?.status}</td>
                        <td> 
                            <span style={{textTransform:"capitalize"}} className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.display_status || "N/A"}
                            </span>
                        </td>

                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default ArtistCommissionsTable;