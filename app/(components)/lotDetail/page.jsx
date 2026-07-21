'use client';
import { useEffect, useState } from 'react';
import styles from './lotDetail.module.css';
import { useCart } from '@/app/context/cartContext';
const LotDetails = ({data}) => {

const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const {setCart,addItem,cart} = useCart()
    //Function to save to localStorage
   
    if (!data.images.length) {
        return <p>No images provided.</p>;
    }
    
    const artwork = {
        id: data.id,
        image:data.img,
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
                    <p>Artist:<span> {data.artist} </span></p>
                    {data.price? <p className={styles.price}>${data.price}</p> : <p>Starting Bid:<span> ${data.startingBid} </span></p>}
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
                {data.price && <div onClick={()=>addItem(artwork)} className={`btn ${styles.addToCart}`}>Add to cart</div>}
            </div>
            
        </div>
    );
}
 
export default LotDetails;