import { ArrowRight } from 'lucide-react';
import styles from './cards.module.css'
import Link from 'next/link';
const AuctionCard = ({name,price,img,time,status}) => {
    return ( 
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={img} alt="auction item" />
                <div className={status==="upcoming" ? `${styles.status} ${styles.upcoming}` : `${styles.status} ${styles.live}`}> {status} </div>
            </div>
            <div className={styles.cardTxt}>
                <h4>{name}</h4>
                <p>starting bid: <span>${price}</span></p>
                <div className={styles.cardTimmer}>
                    <p>CLOSING IN: <span style={{color:"#FB0000"}}>{time}</span> </p>
                    <div className={styles.timmerBtn}>
                        <Link href="/pages/auctions/productDetails" >ENTER</Link>
                        
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AuctionCard;
