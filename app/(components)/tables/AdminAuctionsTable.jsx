'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
const AuctionTable = () => {
    const router = useRouter()

    const data = [
        {
            slug:"sisters-of-the-sound-art-auction-live",
            auctionId:"E-2100",
            auctionTitle:"Sisters of the Sound - Art Auction Live",
            lots:12,
            date:"12002300",
            status:"live",
            RegBidder:18
        },
        {
            slug:"whispers-of-the-wild-art-auction-online",
            auctionId:"E-2101",
            auctionTitle:"Whispers of the Wild - Art Auction Online",
            lots:6,
            date:"12002300",
            status:"upcoming",
            RegBidder:48
        }
    ]
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
                    <tr onClick={() => router.push(b?.status === "live" ? `/admin/auctions/${b?.slug}` : `/admin/auctions/upcoming/${b?.slug}`)} className={styles.dataRow} key={b.auctionId} >
                        <td>
                            <p>{b?.auctionTitle}</p>    
                            <p>{b?.auctionId}</p>
                            
                        </td>
                        <td> {new Date(b?.date).toDateString() || "N/A"} </td>
                        <td>{b?.lots}</td>
                        <td>{b?.RegBidder}</td>
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