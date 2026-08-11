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
                    <tr onClick={() => router.push(b?.status === "live" ? `/admin/auctions/${b?.slug}?id=${b?.id}` : `/admin/auctions/upcoming/${b?.slug}?id=${b?.id}`)} className={styles.dataRow} key={b.id} >
                        <td>
                            <p>{b?.name}</p>    
                            <p>[{b?.code}]</p>
                            
                        </td>
                        <td> {new Date(b?.scheduled_at).toDateString() || "N/A"} </td>
                        <td>{b?.lots_count}</td>
                        <td>{b?.registered_bidders_count}</td>
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
 
export default AuctionTable;