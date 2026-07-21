import { useRouter } from 'next/navigation';
import styles from './page.module.css';
const Winner = ({name, artist, startBid, endBid, img, time}) => {
    const router = useRouter();
    return ( 
        <div className={`${styles.sideCardCont} ${styles.winner}`}>
            <div className={styles.left}>
                <img src={img} alt="" />
            </div>
            <div className={styles.right}>
                <h3>{name}</h3>
                <p>Artist: <span>{artist}</span></p>
                <p>Starting bid: <span>${startBid}</span></p>
                <p>Winning Bid: <span>${endBid}</span></p>
                <p>Payment window: <span style={{color:"#FB0000"}}>{time}</span></p>
            {/*     <br /> */}
                <div onClick={()=>router.push('/pages/shipping')} style={{backgroundColor:"var(--foreground)", color:"#F2F0DB"}} className="btn">Make payment</div>
            </div>
        </div>
    );
}
 
export default Winner;