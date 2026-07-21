'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';


const AdminExhibitionDetails = ({data}) => {
    const { openModal } = useModal();


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
                </div>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Venue</p>
                        <p>102, Allen Avenue, Bypass Junction, Ikeja, Lagos</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>+234 801 234 5678</span></p>
                    </li>
                    <li>
                        <p>Date</p>
                        <p>Apr. 15, 2026</p>
                    </li>
                    <li>
                        <p>Time</p>
                        <p>10:00 AM</p>
                    </li>
                    <li>
                        <p>Attendance</p>
                        <p>52</p>
                    </li>
                </div>

                <p style={{lineHeight:"24px"}}>
                    {data.description}
                </p>
                <br />
                <div className="double">
                    <p>Edit exhibition</p>
                    
                    <p style={{color:"#FB0000"}}>Delete exhibition</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminExhibitionDetails;