import LotSide from '../../sideCard/lot';
import styles from './assignWinner.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
const AssignWinner = () => {
    return ( 
        <div className={styles.container}>
            <div className="headerCenter">
                <h1>Assign Winner</h1>
                <p>This assigns the registered user you select as the winner for the selected lot item. </p>
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
                <select className={styles.graphType} name="auctionStatus" id="">
                    <option value="Active lot">Select winner</option>
                </select>
                <input type='text' name='winningBid' placeholder='Winning item bid' />
                <button style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className='btn'>Assign winner</button>
            </form>
        </div>
    );
}
 
export default AssignWinner;