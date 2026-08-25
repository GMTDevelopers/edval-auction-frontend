'use client';
import {useEffect, useState } from 'react';
import styles from './lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import { toast } from 'sonner';
import RejectListing from '../admin/rejectArtwork/page';
import EditArtwork from '../ArtistEdit/artworkEdit';
import ApproveListing from '../admin/acceptArtwork/page';

const AdminArtistLotDetails = ({data}) => {
    const { openModal } = useModal();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [approved, setIsapproved] = useState(false);
    const accessToken = localStorage.getItem("access_token");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    console.log('artwork details',data)

    useEffect(() => {
        if(data?.display_status==="Approved"){
            setIsapproved(true)
        }
    }, []);
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/artworks/${data?.id}`, { 
            method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const rejctData = await response.json();
            if (!response.ok) {
                toast.error("Failed to delete artwork.");
                console.error('Failed to delete artwork');
            }
            if (response.ok) {
                toast.success("Artwork deleted successfully.");
                console.log('Artwork deleted successfully:', response);
                setTimeout(() => {
                    /* closeModal() */
                    window.location.reload();
                }, 3000);
            }
            
            return rejctData;
        } catch (err) {
            console.error('Error creating auction:', err);
            return false;
        }
    }

    if (!data?.images?.length) {
        return <p>No images provided.</p>;
    }
    
    return ( 
        <div className={styles.container}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={styles.mainImageContainer}>
                    <img src={data.images[currentIndex].url || null} alt={`Artwork image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {data?.images?.map((image, index) => (
                        <div key={index} className={`${styles.thumbnailWrapper} ${index === currentIndex ? styles.active : '' }`} onClick={() => handleThumbnailClick(index)} >
                            <img src={image.url || null} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{gap:"14px"}} className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data.title}</h2>
                    <p>Artist:<span> {data?.artist_details?.first_name} {data?.artist_details?.last_name} </span></p>
                    <p>Email address:<span> {data?.artist_details?.email} </span></p> 
                    <p>Phone number:<span> {data?.artist_details?.phone} </span></p>  
                    <p className={styles.price}>${data?.price?.toLocaleString()}</p>
                   {/*  <p>Status:<span style={{textTransform:"uppercase", color: data.status==="rejected"? "#FB0000": "#419E5A"}}> {data.status} </span></p> */}
                </div>
                <p style={{lineHeight:"24px"}}>
                    {data.description}
                </p>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Year</p>
                        <p>{data.year_created}</p>
                    </li>
                    <li>
                        <p>Category</p>
                        <p>{data.category}</p>
                    </li>
                    <li>
                        <p>Themes</p>
                        <p>{data.themes}</p>
                    </li>
                    <li>
                        <p>Type</p>
                        <p>{data?.artwork_type}</p>
                    </li>
                    <li>
                        <p>Size</p>
                        <p>{data?.length} x {data?.width} x {data?.depth}  (L x W x D cm)</p>
                    </li>
                    <li>
                        <p>Frame</p>
                        <p>{data?.framed?.toString()}</p>
                    </li>
                    <li>
                        <p>Proof of Authenticy</p>
                        <p>{data?.proof_of_authenticity?.toString()}</p>
                    </li>
                </div>
                <br />
                <div className="double">
                    {!approved && <p style={{color:"#419E5A", cursor: "pointer"}} onClick={()=>openModal(<ApproveListing artworkID={data.id} thumb={data?.images[0].url} title={data.title} artist={data?.artist_details?.first_name} year={data.year_created} dateSubmitted={data.created_at.toLocaleString()} />)}>Approve listing</p>}
                    <p onClick={() => openModal(<EditArtwork lot={data} />)} style={{cursor: "pointer"}}>Edit listing</p>
                    {approved && <p style={{cursor: "pointer"}}>Mark inactive</p>}
                    {approved &&  <p style={{color:"#FB0000", cursor: "pointer"}} onClick={handleDelete}>Delete listing</p>}
                    {!approved && <p onClick={()=>openModal(<RejectListing artworkID={data.id} thumb={data?.images[0].url} title={data.title} artist={data?.artist_details?.first_name} year={data.year_created} dateSubmitted={data.created_at.toLocaleString()} />)} style={{color:"#FB0000", cursor: "pointer"}}>Reject listing</p>}
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminArtistLotDetails;