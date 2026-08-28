'use client';
import { useState } from 'react';
import LotSide from '../../sideCard/lot';
import styles from './assignWinner.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useModal } from '../../ModalProvider/ModalProvider';
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
const assignWinners = async (lotId, formData) => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(`${BASE_URL}/admin/lots/${lotId}/winner`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
       
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "Assign winners function failed"
            )
        }
        return {
            success:true,
            data: data
        };
    } catch (err) {
        return {
            success: false,
            error: err.message,
            status: err.status,
        };
    }
}


const AssignWinner = ({name, artist, year, id, regBidders, activeLotData, status, img}) => {
    const router = useRouter();
    const { openModal, closeModal } = useModal();
    const [formData, setformData] = useState({
        winner_user_id: 0,
        winning_amount: activeLotData?.current_bid,
    });
    console.log('winner active', activeLotData)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const winner = await assignWinners(id, formData)
        console.log('assign winners function', winner)
        if (winner.success){
            toast.success("Winner selected successfully");
           
            setTimeout(() => {
               router.refresh(); 
                closeModal();
            }, 1000);
        }
        if(!winner.success){
            console.log(winner)
            toast.error(winner?.error);
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
                    <p>Current bid: <span>₦ {activeLotData?.current_bid}</span></p>
                </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <select value={formData.winner_user_id} onChange={(e)=>setformData(prev=>({...prev, winner_user_id:Number(e.target.value)}))} className={styles.graphType} name="auctionStatus" id="">
                    <option value="">Select winner</option>
                    {regBidders&&regBidders.map((user, index) => (
                        <option key={index} value={user.user_id}>
                            {user.first_name} {user.last_name}
                        </option>
                    ))}   
                </select>
                <input value={formData.winning_amount} onChange={(e)=>setformData(prev=>({...prev, winning_amount: Number(e.target.value)}))} type='text' name='winningBid' placeholder='Winning item bid' />
                <button style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className='btn'>Assign winner</button>
            </form>
        </div>
    );
}
 
export default AssignWinner;