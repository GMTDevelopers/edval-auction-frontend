'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
const AuctionTable = ({Data}) => {
    const router = useRouter()
    const data = Data.data || [];
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Auction Title</th>
                        <th>Date</th>
                        <th>Lots</th>
                        <th>Registered bidders</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data.length !==0 && data.map((b) => (
                    <tr onClick={() => router.push(`/admin/auctions/${b?.status}/${b?.slug}?id=${b?.id}`)} className={styles.dataRow} key={b.id} >
                        <td data-label="Auction Title">
                            <p>{b?.name || "-"}</p>    
                            <p>[{b?.code || "-"}]</p>
                            
                        </td>
                        <td data-label="Date"> {new Date(b?.scheduled_at).toDateString() || "N/A"} </td>
                        <td data-label="Lots">{b?.lots_count || "-"}</td>
                        <td data-label="Registered bidders">{b?.registered_bidders_count || "-"}</td>
                        <td data-label="Status"> 
                            {<span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.status || "-"}
                            </span>}
                        </td>

                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AuctionTable;