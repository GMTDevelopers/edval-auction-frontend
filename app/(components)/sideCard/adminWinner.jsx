import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Countdown from '../counter/page';
const AdminWinner = ({winner, lotWon, payStatus, img, time}) => {

    return ( 
        <div className={`${styles.sideCardCont} ${styles.winner}`}>
            <div className={styles.adminWinnerImg}>
                <img src={img} alt="user" />
            </div>
            <div className={styles.right}>
                <p><span>{winner}</span></p>
                <p>Artwork Won: <span>{lotWon}</span></p>
                <p>Payment status: <span className={styles[payStatus]}>{payStatus.toUpperCase()}</span></p>
                {payStatus !== 'paid' && <p>Payment window: <span style={{color:"#FB6900"}}><Countdown endTime={time} /></span></p>}
            </div>
        </div>
    );
}
 
export default AdminWinner;