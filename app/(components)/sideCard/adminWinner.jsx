import { useRouter } from 'next/navigation';
import styles from './page.module.css';
const AdminWinner = ({name, artist, startBid, endBid, img, time}) => {

    return ( 
        <div className={`${styles.sideCardCont} ${styles.winner}`}>
            <div className={styles.adminWinnerImg}>
                <img src={img} alt="user" />
            </div>
            <div className={styles.right}>
                <p><span>{name}</span></p>
                <p>Artwork Won: <span>{artist}</span></p>
                <p>Payment status: <span>${startBid}</span></p>
                <p>Payment window: <span style={{color:"#FB0000"}}>{time}</span></p>
            </div>
        </div>
    );
}
 
export default AdminWinner;