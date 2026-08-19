import LotSide from '../../sideCard/lot';
import styles from './assignWinner.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
import { toast } from 'sonner';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const CloseLot = async (lotId) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/lots/${lotId}/close`, { 
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "Create Artwork function failed"
            )
        }
        return {
            success:true,
        };
    } catch (err) {
        console.log(err)
        return {
            success: false,
            err,
        };
    }
};



const AssignWinner = ({name, artist, year, id, bid, status, img}) => {

    const handleSubmit = () => {
        const closeLot = CloseLot(id);
        if(!closeLot.success){
            console.log(result)
            toast.error(closeLot.err.message);
        }
        if(closeLot.success){
            toast.success("Artwork created successfully.");
            console.log('Artwork created successfully:', closeLot);
            router.back()
        } 
    }

    return ( 
        <div className={styles.container}>
            <div className="headerCenter">
                <h1>Assign Winner</h1>
                <p>This assigns the registered user you select as the winner for the selected lot item. </p>
            </div>
            <div style={{border:"1px solid #807D67"}} className={Styles.sideCardCont}>
                <div className={Styles.left}>
                    <img src={img||'/images/auction/3.webp'} alt="artwork thumb" />
                </div>
                <div className={Styles.right}>
                    <h3>{name || "Black or Beauty?"}</h3>
                    <p>Artist: <span>{ artist || "Sharon Bailey"}</span></p>
                    <p>Year: <span>{ year || 2022}</span></p>
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