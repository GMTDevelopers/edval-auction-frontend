'use client'
import { ArrowRight } from 'lucide-react';
import styles from './cards.module.css'
import Link from 'next/link';
import Countdown from '../counter/page';
import { useRouter } from 'next/navigation';
const AuctionCard = ({name,price,duration,img,time,auctionId,slug,auctStatus}) => {
    const router =  useRouter()
    return ( 
        <div onClick={()=> router.push(`/pages/auctions/${slug}?auctionID=${auctionId}`)} className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={img} alt="auction item" />
                <div className={`${styles.status} ${styles[auctStatus]}`}> {auctStatus} </div>
            </div>
            <div className={styles.cardTxt}>
                <h4>{name}</h4>
                <p>starting bid: <span>${price.toLocaleString()}</span></p>
                <div className={styles.cardTimmer}>
                    {auctStatus==='live'? <p>CLOSING IN: <Countdown startTime={time} duration={duration}/></p> :
                        <p>STARTS: <span >{new Date(time).toDateString()}</span> </p>
                    }
                    <div className={styles.timmerBtn}>
                        <Link href={`/pages/auctions/${slug}?auctionID=${auctionId}`} >ENTER</Link>
                        
                        <ArrowRight size={18}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AuctionCard;
