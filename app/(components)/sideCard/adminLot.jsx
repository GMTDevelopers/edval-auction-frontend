import { toast } from 'sonner';
import AssignWinner from '../admin/assignWinner/page';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './page.module.css';


const AdminLotSide = ({name, artist, year, bid, bidders, activeLot, img, id}) => {
    const { openModal } = useModal();    
    return ( 
        <div className={styles.sideCardCont}>
            <div className={styles.left}>
                <img src={img} alt="" />
            </div>
            <div className={styles.right}>
                <h3>{name}</h3>
                <p>Artist: <span>{artist}</span></p>
                <p>Year: <span>{year}</span></p>
                <p>Starting bid: <span>{bid}</span></p>
                <p onClick={()=> openModal(<AssignWinner id={id} regBidders={bidders} activeLotData={activeLot} name={name} artist={artist} year={year} thumb={img} />)}  style={{color:"#FB6900", fontWeight:600}}>Assign winner</p>
            </div>
        </div>
    );
}
 
export default AdminLotSide;