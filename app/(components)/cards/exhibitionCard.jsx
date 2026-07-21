'use client';
import { ArrowRight } from 'lucide-react';
import styles from './cards.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const ExhibitionCard = ({name,venue,img,slug,time,date,status,attending}) => {
    const router = useRouter();

    return ( 
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={img} alt="auction item" />
                <div className={status==="upcoming" ? `${styles.status} ${styles.upcoming}` : `${styles.status} ${styles.live}`}> {status} </div>
            </div>
            <div className={`${styles.cardTxt} ${styles.cardTxtExhibition}`}>
                <h4>{name}</h4>
                <p>Venue: <span>{venue}</span></p>
                <p>Date: <span>{date}</span></p>
                <p>Time: <span>{time}</span></p>
                <div className={styles.cardTimmer}>
                    <p>{attending} attending</p>
                    <div onClick={()=>router.push(`/pages/exhibition/${slug}`)} className={styles.timmerBtn}>
                        <Link href="/pages/auctions/productDetails" >Details</Link>
                        
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ExhibitionCard;
