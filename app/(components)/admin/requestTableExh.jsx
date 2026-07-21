'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import { useState } from 'react';



const AdminRequestExhDetails = ({data}) => {
    const [showing, setShowing] = useState('Processing');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [approved, setIsapproved] = useState(false);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
   
    if (!data?.images?.length) {
        return <p>No images provided.</p>;
    }
    

    return ( 
        <div className={`${styles.adminArtistDetailsContainer} ${styles.container}`}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={styles.mainImageContainer}>
                    <img src={data.images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {data.images.map((image, index) => (
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
                    <p>Tortor pellentesque sed mattis lacus vestibulum quis id amet. Nec pellentesque et accumsan vitae amet morbi suspendisse odio nisl. Vitae ac mi donec nulla ac pellentesque. Neque vel bibendum ut diam porttitor blandit egestas feugiat. Morbi nulla proin non donec.y </p>
                    
                </div>
                <div style={{border:"1px solid #807D67", padding:"5%"}}>
                    <p><span>ARTWORK DESCRIPTION</span></p>
                    <br />
                    <p>Tortor pellentesque sed mattis lacus vestibulum quis id amet. Nec pellentesque et accumsan vitae amet morbi suspendisse odio nisl. Vitae ac mi donec nulla ac pellentesque. Neque vel bibendum ut diam porttitor blandit egestas feugiat. Morbi nulla proin non donec.</p>   
                </div>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Email</p>
                        <p>sammy.studios@example.com</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>+234 801 234 5678</span></p>
                    </li>
                     <li>
                        <p>Portfolio link</p>
                        <p>www.instagram.com/sharon_studios</p>
                    </li>
                    <li>
                        <p>Location</p>
                        <p>112, newtown lane, Ikorodu, Lagos</p>
                    </li>
                     <li>
                        <p>Artwork category</p>
                        <p>{data.category}</p>
                    </li>
                    <li>
                        <p>Year created</p>
                        <p>{data.year}</p>
                    </li>
                   
                    <li>
                        <p>Themes</p>
                        <p>{data.theme.map(them=>(
                            <span>{them}, </span>
                        ))}</p>
                    </li>
                    <li>
                        <p>Artwork type</p>
                        <p>{data?.type}</p>
                    </li>
                    <li>
                        <p>Dimensions</p>
                        <p>{data?.size} (h x w x d in inches)</p>
                    </li>
                    <li>
                        <p>Selling price</p>
                        <p>$400</p>
                    </li>
                    <li>
                        <p>Frame</p>
                        <p>{data?.frame}</p>
                    </li>
                    <li>
                        <p>Proof of Authenticy</p>
                        <p>{data.proofOfAuth}</p>
                    </li>                   
                </div>  
                           
                <div style={{whiteSpace:"nowrap", alignItems:"center", gap:"12px", fontWeight:500}} className="double">
                    Update status
                    <select value={showing} onChange={(e)=> setShowing(e.target.value)} name="nowShowing"> 
                        <option value="pending">
                            Pending
                        </option>                                            
                        <option value="completed">
                            Completed
                        </option>                                
                                                                                    
                    </select>
                </div>
                 <br />  
                <div className="double">                    
                    <div style={{marginTop:0, width:"fit-content"}} className="btn submit">Update request status</div>
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminRequestExhDetails;