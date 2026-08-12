import { useState } from 'react';
import LotSide from '../../sideCard/lot';
import styles from './assignWinner.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const RejectArtwork = async (formData,id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/artworks/${id}/review`, { 
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
                data.error|| "Reject Artwork function failed"
            )
        }
        return {
            success:true,
            data: data
        };
    } catch (err) {
        console.log(err)
        return {
            success: false,
            err,
        };
    }
};

const RejectListing = ({artworkID,thumb,title,artist,year,dateSubmitted}) => {

    const [formData, setformData] = useState({
        status: "rejected",
        rejection_reason:''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            ...formData,
        };

        const result = await RejectArtwork(payload, artworkID);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("Artwork rejected successfully.");
            console.log('Artwork rejected successfully:', result);
            router.back()
        }  
    };

    return ( 
        <div className={styles.container}>
            <div className="headerCenter">
                <h1>Reject Listing</h1>
                <p>This action disapproves the artwork listing. The reason provided will be sent to the respective artist.</p>
            </div>
            <div style={{border:"1px solid #807D67"}} className={Styles.sideCardCont}>
                <div className={Styles.left}>
                    <img src={thumb} alt="" />
                </div>
                <div className={Styles.right}>
                    <h3>{title}</h3>
                    <p>Artist: <span>{artist}</span></p>
                    <p>Year: <span>{year}</span></p>
                    <p>Date submitted: <span>{dateSubmitted}</span></p>
                </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea value={formData.rejection_reason} onChange={(e)=>setformData(prev=>({...prev, rejection_reason:e.target.value}))} name="rejectDesc" placeholder="Enter reason for rejection" />
                <button style={{width:"fit-content", border:"none", background:"#E30000", color:"#FDFBEC"}} className='btn'>Reject listing</button>
            </form>
        </div>
    );
}
 
export default RejectListing;