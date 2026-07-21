'use client';
import {useState } from 'react';
import styles from /* './lotDetail.module.css' */ '@/app/(components)/lotDetail/lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import RejectListing from '../admin/rejectArtwork/page';

const AdminArtistDetails = ({data}) => {
    const { openModal } = useModal();
    const [approved, setIsapproved] = useState(false);

    return ( 
        <div className={`${styles.adminArtistDetailsContainer} ${styles.container}`}>
            <div className={styles.galleryContainer}>
                <div className={styles.mainImageContainer}>
                    <img src={data.img} alt='artist' className={styles.mainImage} />
                </div>
            </div>
            <div style={{gap:"14px"}} className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data.name}</h2>
                    <p>Date Joined:<span> Apr. 15, 2026 </span></p>
                    <p>Earnings:<span> ${data.price} </span></p> 
                </div>
                <p style={{lineHeight:"24px"}}>
                    {data.description}
                </p>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Studio name</p>
                        <p>Sammy Studios</p>
                    </li>
                    <li>
                        <p>Email</p>
                        <p>sammy.studios@example.com</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>+234 801 234 5678</span></p>
                    </li>
                    <li>
                        <p>Address</p>
                        
                        <p>123, myrtle lane, new town quarters</p>
                    </li>
                    <li>
                        <p>City, Country</p>
                      {/*   <p>{data.theme.map(them=>(
                            <span>{them}, </span>
                        ))}</p> */}
                        <p>Nairobi, Kenya</p>
                    </li>
                    <li>
                        <p>Artistic style</p>
                        <p>Human Oil Portraits</p>
                    </li>
                    <li>
                        <p>Years of experience</p>
                        <p>5 years</p>
                    </li>
                    <li>
                        <p>Account number</p>
                        <p>0123456789</p>
                    </li>
                    <li>
                        <p>Bank name</p>
                        <p>Citi Bank PLC</p>
                    </li>
                    <li>
                        <p>Artworks</p>
                        <p>7</p>
                    </li>
                </div>
                <br />
                <div className="double">
                    <p>Mark inactive</p>
                    <p style={{color:"#FB0000"}}>Delete artist</p>
                    
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminArtistDetails;