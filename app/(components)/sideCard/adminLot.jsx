import { toast } from 'sonner';
import AssignWinner from '../admin/assignWinner/page';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './page.module.css';
import { useState } from 'react';


const AdminLotSide = ({lots, bidders, activeLot}) => {
    const { openModal } = useModal();    
    const timeNow = new Date() ;
    const dueDate = new Date(lots.payment_due_at);
    return ( 
        <div className={styles.sideCardCont}>
            <div className={styles.left}>
                <img src={lots?.artwork?.images[1]?.url} alt="" />
            </div>
            <div className={styles.right}>
                <h3>{lots.artwork.title}</h3>
                <p>Artist: <span>{lots.artwork.artist_details.first_name} {lots.artwork.artist_details.last_name}</span></p>
                <p>Year: <span>{lots.artwork.year_created}</span></p>
                <p>Starting bid: <span>₦ {lots.artwork.price}</span></p>
                <p onClick={()=> openModal(<AssignWinner id={lots.id} regBidders={bidders} activeLotData={activeLot} name={lots.artwork.title} artist={lots.artwork.artist_details.first_name} year={lots.artwork.year_created} thumb={lots?.artwork?.images[1]?.url} />)}  style={{cursor:"pointer", color:"#FB6900", fontWeight:600}}>
                    {timeNow >= dueDate ? "Re-assign winner" : "Assign winner"}
                </p>
            </div>
        </div>
    );
}
 
export default AdminLotSide;