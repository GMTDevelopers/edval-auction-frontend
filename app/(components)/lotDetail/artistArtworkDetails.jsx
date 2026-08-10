'use client';
import {useState } from 'react';
import styles from './lotDetail.module.css';
import { toast } from 'sonner';
import EditArtwork from '@/app/(components)/ArtistEdit/artworkEdit';
import { useModal } from '../ModalProvider/ModalProvider';

const ArtistLotDetails = ({lot}) => {
      const { openModal, closeModal } = useModal();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = localStorage.getItem("access_token");
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
   
    console.log("lot", lot);
    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/artworks/${lot.id}`, { 
            method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error("Failed to delete artwork.");
                console.error('Failed to delete artwork');
            }
            if (response.ok) {
                toast.success("Artwork deleted successfully.");
                console.log('Artwork deleted successfully:', response);
                setTimeout(() => {
                    closeModal()
                    /* window.location.reload(); */
                }, 3000);
            }
            
            return data;
        } catch (err) {
            console.error('Error creating auction:', err);
            return false;
        }
    }

    if (!lot?.images?.length) {
        return <p>No images provided.</p>;
    }
    
    return ( 
        <div className={styles.container}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={styles.mainImageContainer}>
                    <img src={lot.images[currentIndex].url || null} alt={`Gallery image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {lot.images.map((image, index) => (
                        <div key={index} className={`${styles.thumbnailWrapper} ${index === currentIndex ? styles.active : '' }`} onClick={() => handleThumbnailClick(index)} >
                            <img src={image.url || null} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
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
                        <p>{lot?.length} x {lot?.width} x {lot?.depth}  (L x W x D cm)</p>
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
                    <p onClick={() => openModal(<EditArtwork lot={lot} />)} style={{cursor: "pointer"}}>Edit listing</p>
                    {lot.status==="active"||"approved" && <p style={{cursor: "pointer"}}>Mark inactive</p>}
                    <p style={{color:"#FB0000", cursor: "pointer"}} onClick={handleDelete}>Delete listing</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default ArtistLotDetails;