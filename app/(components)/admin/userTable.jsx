'use client';
import styles from /* './lotDetail.module.css' */ '@/app/(components)/lotDetail/lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import RejectListing from './rejectArtwork/page';

const AdminUserDetails = ({data}) => {
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
                        <p>Email</p>
                        <p>sammy.studios@example.com</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>+234 801 234 5678</span></p>
                    </li>
                    <li>
                        <p>Date joined</p>
                        <p>Apr. 15, 2026</p>
                    </li>
                    <li>
                        <p>Platform purchases</p>
                        <p>$550.00</p>
                    </li>
                    <li>
                        <p>Auctions registered</p>
                        <p>5</p>
                    </li>
                    <li>
                        <p>Exhibitions attended</p>
                        <p>6</p>
                    </li>
                </div>
                <br />
                <div className="double">
                    <p>Mark inactive</p>
                    
                    <p style={{color:"#FB0000"}}>Delete user</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminUserDetails;