'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import Styles from'./adminTables.module.css';
import { useState } from 'react';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditRequestStatus = async (formData, subId) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/exhibitions/artworks/${subId}/review`, { 
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
                data.error|| "Order status function failed"
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

const AdminRequestExhDetails = ({data}) => {
    const [showing, setShowing] = useState('Processing');
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
   
    const [formData, setFormData] = useState({
        status:'',
        feedback:''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await EditRequestStatus(formData, data?.id);
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("Status updated successfully.");
            console.log('Status updated successfully:', result);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }  
    }

/*     if (!data?.images?.length) {
        return <p>No images provided.</p>;
    } */
    

    return ( 
        <div className={`${Styles.adminArtistDetailsContainer} ${styles.container}`}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={`${styles.mainImageContainer} ${Styles.mainImageContainer}`}>
                    <img src={data.images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {data?.images?.map((image, index) => (
                        <div key={index} className={`${styles.thumbnailWrapper} ${index === currentIndex ? styles.active : '' }`} onClick={() => handleThumbnailClick(index)} >
                            <img src={image} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{gap:"14px"}} className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data.name}</h2>
                </div>
                <div style={{marginTop:"24px"}} className={styles.otherDetailsPack}>
                    <li>
                        <p>Request type</p>
                        <p>EXHIBITION</p>
                    </li>
                </div>  
                <div style={{border:"1px solid #807D67", padding:"5%"}}>
                    <p><span>ARTIST BIO</span></p>
                    <br />
                    <p>{data?.artist_bio}</p>
                    
                </div>
                <div style={{border:"1px solid #807D67", padding:"5%"}}>
                    <p><span>ARTWORK DESCRIPTION</span></p>
                    <br />
                    <p>{data?.artwork?.description}</p>   
                </div>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Email</p>
                        <p>{data?.email}</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>{data?.phone}</span></p>
                    </li>
                     <li>
                        <p>Portfolio link</p>
                        <p>{data?.portfolio_link}</p>
                    </li>
                    <li>
                        <p>Location</p>
                        <p>112, newtown lane, Ikorodu, Lagos</p>
                    </li>
                     <li>
                        <p>Artwork category</p>
                        <p>{data?.artwork?.category}</p>
                    </li>
                    <li>
                        <p>Year created</p>
                        <p>{data?.artwork?.year_created}</p>
                    </li>
                   
                    <li>
                        <p>Themes</p>
                        <p> <span>{data?.artwork.themes}</span></p>
                    </li>
                    <li>
                        <p>Artwork type</p>
                        <p>{data?.artwork?.artwork_type}</p>
                    </li>
                    <li>
                        <p>Dimensions</p>
                        <p>{data?.artwork?.dimensions} (h x w x d in cm)</p>
                    </li>
                    <li>
                        <p>Selling price</p>
                        <p>₦{data?.amount.toLocaleString()}</p>
                    </li>
                    <li>
                        <p>Frame</p>
                        <p>{data?.artwork?.framed.toString()}</p>
                    </li>
                    <li>
                        <p>Proof of Authenticy</p>
                        <p>{data?.artwork?.proof_of_authenticity.toString()}</p>
                    </li>                   
                </div>  
                <form>         
                    <div style={{whiteSpace:"nowrap", alignItems:"center", gap:"12px", fontWeight:500}} className="row2">
                        Update status
                        <select value={formData.status} onChange={(e)=>setFormData(prev=>({...prev, status:e.target.value}))} name="nowShowing"> 
                            <option value="-">
                                -
                            </option>                                            
                            <option value="rejected">
                                Rejected
                            </option>                                            
                            <option value="approved">
                                Approved
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    <div style={{whiteSpace:"nowrap",marginTop:'0px', alignItems:"center", fontWeight:500}} className="row2">
                        Feedback
                        <textarea value={formData.feedback} onChange={(e)=>setFormData(prev=>({...prev, feedback:e.target.value}))} name="artDesc" placeholder="Artwork description" />
                    </div>
                    <br />  
                    <div className="double">                    
                        <div onClick={handleSubmit} style={{marginTop:0, width:"fit-content"}} className="btn submit">Update request status</div>
                    </div>
                </form>  
            </div>
            
        </div>
    );
}
 
export default AdminRequestExhDetails;