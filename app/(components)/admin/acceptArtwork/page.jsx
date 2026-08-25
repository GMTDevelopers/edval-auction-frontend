import { useState } from 'react';
import LotSide from '../../sideCard/lot';
import styles from './assignWinner.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css';
import { toast } from 'sonner';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const AcceptArtwork = async (formData,id) => {
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

const ApproveListing = ({artworkID,thumb,title,artist,year,dateSubmitted}) => {
    const [loading, setLoading] = useState(false)
    const [formData, setformData] = useState({
        status: "approved",
        with_admin: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const payload = {
            ...formData,
        };

        const result = await AcceptArtwork(payload, artworkID);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
            setLoading(false);
        }
        if(result.success){
            toast.success("Artwork accepted.");
            console.log('Artwork rejected:', result);
            setLoading(false);
            window.location.reload()
        }  
        setLoading(false);
    };

    return ( 
        <div className={styles.container}>
            <div className="headerCenter">
                <h1>Approve Listing</h1>
                <p>This action approves the artwork listing. The reason provided will be sent to the respective artist.</p>
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
                <label htmlFor="with_admin"> Is this artwork with the admin?</label>
                <select value={formData.with_admin} onChange={(e) => setformData(prev => ({ ...prev, with_admin: e.target.value }))} id="with_admin">
                    <option value={true}>
                        Yes
                    </option>
                    <option value={false}>
                        No
                    </option>
                                                                                
                </select> 
                <button style={{width:"fit-content", border:"none", background:"#3aaf0b", color:"#FDFBEC"}} className='btn'>Approve listing</button>
            </form>
        </div>
    );
}
 
export default ApproveListing;