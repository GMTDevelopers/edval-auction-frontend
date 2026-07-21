'use client';
import styles from './auction.module.css';
import AuctionTable from "@/app/(components)/tables/AdminAuctionsTable";
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';

const Auction = () => {
    const router = useRouter();
    return ( 
        <div>
            <div style={{alignItems:"center"}} className={`double ${styles.double}`}>
                <h3>Auctions</h3>
                <div onClick={() => router.push('/admin/auctions/addNewAuction')} style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className="btn"> <Plus />  Add new auction event</div>
            </div>

            <AuctionTable />
        </div>
    );
}
 
export default Auction;