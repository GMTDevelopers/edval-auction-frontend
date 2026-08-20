'use client';
import { useEffect, useState } from 'react';
import styles from './lotDetail.module.css';
/* import { useCart } from '@/app/context/cartContext'; */

const LotDetails = ({data}) => {
    console.log('lotdetails:', data)
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

  /*   const {setCart,addItem,cart} = useCart() */
    //Function to save to localStorage
   
    if (!data?.artwork?.images?.length) {
        return <p>No images provided.</p>;
    };
    
    const artwork = {
        id: data.id,
        image:data.artwork.images,
        name:data.name,
        artist:data.artist,
        description:data.description,
        price:data.price

    } 
    return ( 
        <div className={styles.container}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={styles.mainImageContainer}>
                    <img src={data?.artwork?.images[currentIndex].url} alt={`Gallery image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {data?.artwork?.images?.map((image, index) => (
                        <div key={index} className={`${styles.thumbnailWrapper} ${index === currentIndex ? styles.active : '' }`} onClick={() => handleThumbnailClick(index)} >
                            <img src={image.url} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data?.title}</h2>
                    <p>Artist:<span> {data.artwork.artist_details.first_name} {data.artwork.artist_details.lasst_name} </span></p>
                    {data.reserve_price? <p className={styles.price}>${data.reserve_price}</p> : <p>Starting Bid:<span> ${data.reserve_price} </span></p>}
                </div>
                <p style={{lineHeight:"24px"}}>
                    {data.artwork.description}
                </p>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Year</p>
                        <p>{data.artwork.year_created}</p>
                    </li>
                    <li>
                        <p>Category</p>
                        <p>{data.artwork.category}</p>
                    </li>
                    <li>
                        <p>Themes</p>
                        <p><span>{data.artwork.themes} </span></p>
                    </li>
                    {/* <li>
                        <p>Themes</p>
                        <p>{data.theme.map(them=>(
                            <span>{them}, </span>
                        ))}</p>
                    </li> */}
                    <li>
                        <p>Type</p>
                        <p>{data?.artwork.artwork_type}</p>
                    </li>
                    <li>
                        <p>Size</p>
                        <p>{data?.artwork.dimension} (h x w x d in inches)</p>
                    </li>
                    <li>
                        <p>Frame</p>
                        <p>{data?.artwork.framed.toString()}</p>
                    </li>
                    <li>
                        <p>Proof of Authenticy</p>
                        <p>{data?.artwork.proof_of_authenticity.toString()}</p>
                    </li>
                </div>
                {data.artwork.listing_type==='gallery' && <div /* onClick={()=>addItem(artwork)} */ className={`btn ${styles.addToCart}`}>Add to cart</div>}
            </div>
            
        </div>
    );
}
 
export default LotDetails;