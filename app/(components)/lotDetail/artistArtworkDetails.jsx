'use client';
import {useState } from 'react';
import styles from './lotDetail.module.css';

const ArtistLotDetails = ({lot}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
   
    console.log("lot", lot);
    if (!lot?.images?.length) {
        return <p>No images provided.</p>;
    }
    
    return ( 
        <div className={styles.container}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={styles.mainImageContainer}>
                    <img src={lot.images[currentIndex].url} alt={`Gallery image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {lot.images.map((image, index) => (
                        <div key={index} className={`${styles.thumbnailWrapper} ${index === currentIndex ? styles.active : '' }`} onClick={() => handleThumbnailClick(index)} >
                            <img src={image.url} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{lot.title}</h2>
                    <p className={styles.price}>${lot.price?.toLocaleString()}</p>
                    <p>Status:<span style={{textTransform:"uppercase", color: lot.status==="rejected"? "#FB0000": "#419E5A"}}> {lot.status} </span></p>
                </div>
                {lot.status==="active"||"approved" && <p style={{lineHeight:"24px"}}>
                    {lot.description}
                </p>}
                {lot.status==="active"||"approved" && <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Year</p>
                        <p>{lot.year_created}</p>
                    </li>
                    <li>
                        <p>Category</p>
                        <p>{lot.category}</p>
                    </li>
                    <li>
                        <p>Themes</p>
                        <p>
                            <span>{lot.themes} </span>
                        </p>
                    </li>
                    <li>
                        <p>Type</p>
                        <p>{lot?.artwork_type}</p>
                    </li>
                    <li>
                        <p>Size</p>
                        <p>{lot?.length} x {lot?.width} x {lot?.depth}  (L x W x D in inches)</p>
                    </li>
                    <li>
                        <p>Frame</p>
                        <p>{lot?.framed.toString()}</p>
                    </li>
                    <li>
                        <p>Proof of Authenticy</p>
                        <p>{lot.proof_of_authenticity.toString()}</p>
                    </li>
                </div>}
                {lot.status==="rejected" && <div>
                    <p><span>Rejection Reason</span></p>
                    <p>{lot.reason}</p>
                    </div>}
                <div className="double">
                    <p>Edit listing</p>
                    {lot.status==="active"||"approved" && <p>Mark inactive</p>}
                    <p style={{color:"#FB0000"}}>Delete listing</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default ArtistLotDetails;