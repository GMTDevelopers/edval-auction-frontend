import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Countdown from '../counter/page';
import { toast } from 'sonner';
import Loader from '../loader/loader';
import { useState } from 'react';
import { initializePayment } from '@/app/services/payment';
const Winner = ({name, artistFirst, artistLast, payStatus, startBid, id, endBid, img, time}) => {
    const DueAt = new Date(time).toDateString()
    const router = useRouter();
    const winnerObject = { 
        lotID: id,
        title: name, 
        firstName:artistFirst, 
        lastName:artistLast, 
        amount: endBid,
        image: img
    };
    console.log('time', time)
    const encodedObject = encodeURIComponent(JSON.stringify(winnerObject));
    const [loading, setLoading] = useState(false)
    const [payinitData, setPayInitData] = useState({
        callback_url: "",
        item_id: 0,
        item_type: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const callbackUrl = `${window.location.origin}/payment/callback`;
            const initData = {
                ...payinitData,
                callback_url: callbackUrl ,
                lot_id: id,
                item_type: "auction_lot"
            }
            const data = await initializePayment(initData);

            // Most backends (and Paystack) return an authorization_url
            if (data.data?.authorization_url) {
                window.location.href = data.data.authorization_url;
            } else if (data.authorization_url) {
                window.location.href = data.authorization_url;
            } else {
                console.log("Full response:", data);
                toast.error("Payment initialized but no redirect URL found");
            }
        } catch (err) {

            console.error(err);
            toast.error( err.message || "Payment failed");
        }finally{
            setLoading(false);
        }     
        
    };
    return ( 
        <div className={`${styles.sideCardCont} ${styles.winner}`}>
            <div className={styles.left}>
                <img src={img} alt="" />
            </div>
            <div className={styles.right}>
                <h3>{name}</h3>
                <p>Artist: <span>{artistFirst} {artistLast}</span></p>
                <p>Starting bid: <span>₦ {startBid.toLocaleString()}</span></p>
                <p>Winning Bid: <span>₦ {endBid.toLocaleString()}</span></p>
                { payStatus!=='paid' &&<p>Payment window: <span style={{color:"#FB0000"}}> <Countdown endTime={time} /> </span></p>}
                { payStatus === 'paid' &&<p>Payment status: <span style={{color:"#419E5A"}}> {payStatus} </span></p>}
                { payStatus!=='paid' &&
                <div onClick={handleSubmit} style={{backgroundColor:"var(--foreground)", color:"#F2F0DB"}} className="btn">{loading? <Loader /> : "Make payment"}</div>}
                {/* <div onClick={()=>router.push(`/pages/shipping?winner=${encodedObject}`)} style={{backgroundColor:"var(--foreground)", color:"#F2F0DB"}} className="btn">Make payment</div> */}
            </div>
        </div>
    );
}
 
export default Winner;