'use client';
import {useState } from 'react';
import styles from './lotDetail.module.css';

const ArtistLotDetails = ({data}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

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
            <div className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data.name}</h2>
                    <p className={styles.price}>${data.price}</p>
                    <p>Status:<span style={{textTransform:"uppercase", color: data.status==="rejected"? "#FB0000": "#419E5A"}}> {data.status} </span></p>
                </div>
                {data.status==="active" && <p style={{lineHeight:"24px"}}>
                    {data.description}
                </p>}
                {data.status==="active" && <div className={styles.otherDetailsPack}>
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
                </div>}
                {data.status==="rejected" && <div>
                    <p><span>Rejection Reason</span></p>
                    <p>{data.reason}</p>
                    </div>}
                <div className="double">
                    <p>Edit listing</p>
                    {data.status==="active" && <p>Mark inactive</p>}
                    <p style={{color:"#FB0000"}}>Delete listing</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default ArtistLotDetails;