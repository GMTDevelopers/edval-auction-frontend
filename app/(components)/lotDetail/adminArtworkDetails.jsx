'use client';
import {useState } from 'react';
import styles from './lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import RejectListing from '../admin/rejectArtwork/page';

const AdminArtistLotDetails = ({data}) => {
    const { openModal } = useModal();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [approved, setIsapproved] = useState(false);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
   
    if (!data?.images?.length) {
        return <p>No images provided.</p>;
    }
    
    return ( 
        <div className={styles.container}>
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
                    <p>Artist:<span> James Fidel </span></p>
                    <p>Email address:<span> james_fidel@gmail.com </span></p> 
                    <p>Phone number:<span> +234 801 234 5678 </span></p>  
                    <p className={styles.price}>${data.price}</p>
                   {/*  <p>Status:<span style={{textTransform:"uppercase", color: data.status==="rejected"? "#FB0000": "#419E5A"}}> {data.status} </span></p> */}
                </div>
                <p style={{lineHeight:"24px"}}>
                    {data.description}
                </p>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Year</p>
                        <p>{data.year}</p>
                    </li>
                    <li>
                        <p>Category</p>
                        <p>{data.category}</p>
                    </li>
                    <li>
                        <p>Themes</p>
                        <p>{data.theme.map(them=>(
                            <span>{them}, </span>
                        ))}</p>
                    </li>
                    <li>
                        <p>Type</p>
                        <p>{data?.type}</p>
                    </li>
                    <li>
                        <p>Size</p>
                        <p>{data?.size} (h x w x d in inches)</p>
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
                <br />
                <div className="double">
                    {!approved && <p style={{color:"#419E5A"}}>Approve listing</p>}
                    <p>Edit listing</p>
                    {approved && <p>Mark inactive</p>}
                    {approved &&  <p style={{color:"#FB0000"}}>Delete listing</p>}
                    {!approved && <p onClick={()=>openModal(<RejectListing />)} style={{color:"#FB0000"}}>Reject listing</p>}
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminArtistLotDetails;