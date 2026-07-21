import LotSide from '../../sideCard/lot';
import styles from './assignWinner.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
const RejectListing = () => {
    return ( 
        <div className={styles.container}>
            <div className="headerCenter">
                <h1>Reject Listing</h1>
                <p>This action disapproves the artwork listing. The reason provided will be sent to the respective artist.</p>
            </div>
            <div style={{border:"1px solid #807D67"}} className={Styles.sideCardCont}>
                <div className={Styles.left}>
                    <img src="/images/auction/3.webp" alt="" />
                </div>
                <div className={Styles.right}>
                    <h3>"Black or Beauty?"</h3>
                    <p>Artist: <span>"Sharon Bailey"</span></p>
                    <p>Year: <span>2022</span></p>
                    <p>Current bid: <span>$2500</span></p>
                </div>
            </div>
            <form className={styles.form} action="">
                <textarea name="rejectDesc" placeholder="Enter reason for rejection" />
                <button style={{width:"fit-content", border:"none", background:"#E30000", color:"#FDFBEC"}} className='btn'>Assign winner</button>
            </form>
        </div>
    );
}
 
export default RejectListing;