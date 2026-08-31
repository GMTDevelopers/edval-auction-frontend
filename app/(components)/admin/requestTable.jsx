'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import Styles from'./adminTables.module.css';
import { Download } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';



const AdminRequestDetails = ({data}) => {
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
                <div className={`${styles.mainImageContainer} ${Styles.mainImageContainer}`}>
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
                <div style={{border:"1px solid #807D67", padding:"5%"}}>
                    <p><span>ARTIST BIO</span></p>
                    <br />
                    <p>{data?.artist?.bio}</p>
                    
                </div>
                <div style={{border:"1px solid #807D67", padding:"5%"}}>
                    <p><span>ARTWORK DESCRIPTION</span></p>
                    <br />
                    <p>{data?.artwork?.description}</p>   
                </div>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Request type</p>
                        <p>{data?.request_type.toUpperCase()}</p>
                    </li>
                    <li>
                        <p>Email</p>
                        <p>{data?.email}</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>{data?.artist?.phone}</span></p>
                    </li>
                    <li>
                        <p>Year created</p>
                        <p>{data?.artwork?.year_created}</p>
                    </li>
                    <li>
                        <p>Artwork category</p>
                        <p>{data?.artwork.category}</p>
                    </li>
                    <li>
                        <p>Themes</p>
                        <p>{data?.artwork?.themes}</p>
                    </li>
                    <li>
                        <p>Artwork type</p>
                        <p>{data?.artwork?.artwork_type}</p>
                    </li>
                    <li>
                        <p>Dimensions</p>
                        <p>{data?.artwork?.dimensions}</p>
                    </li>
                    <li>
                        <p>Selling price</p>
                        <p>₦{data?.amount.toLocaleString()}</p>
                    </li>
                    <li>
                        <p>Portfolio link</p>
                        <Link href={data?.portfolio_link} target='_blank'><p>Click here</p></Link> 
                    </li>
                    {/* <li>
                        <p>Location</p>
                        <p>112, newtown lane, Ikorodu, Lagos</p>
                    </li> */}
                </div>  
                <br />              
                {/* <form>         
                    <div style={{whiteSpace:"nowrap", alignItems:"center", gap:"12px", fontWeight:500}} className="row2">
                        Update status
                        <select value={formData.status} onChange={(e)=>setFormData(prev=>({...prev, status:e.target.value}))} name="nowShowing"> 
                            <option value="-">
                                -
                            </option>                                            
                            <option value="in_progress">
                                In Progresss
                            </option>                                            
                            <option value="completed">
                                Completed
                            </option>                                
                            <option value="cancelled">
                                cancelled
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    <br />  
                    <div className="double">                    
                        <div onClick={handleSubmit} style={{marginTop:0, width:"fit-content"}} className="btn submit">Update request status</div>
                    </div>
                </form>   */}
            </div>
            
        </div>
    );
}
 
export default AdminRequestDetails;