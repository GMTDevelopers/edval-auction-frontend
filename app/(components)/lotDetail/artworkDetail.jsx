'use client';
import { useEffect, useState } from 'react';
import styles from './lotDetail.module.css';
import { useCart } from '@/app/context/cartContext';
import { toast } from 'sonner';

const ArtworkDetail = ({data}) => {
    console.log('lotdetails:', data)
    const [currentIndex, setCurrentIndex] = useState(0);
    const {addItemFunction} = useCart()
 
    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
 
    const handleAddToCart = async () => {
        const result = await addItemFunction({artwork_id: data.id})
        if (result.success) {
            toast.success('item added to cart')
        }
        if(!result.success){
            if(result.error==="invalid or expired token"){
                toast.error("Login to add item to cart");
            }else{
                console.log('add to cart',result)
                toast.error(result.error);
            }
            
        }
    }

    if (!data?.images?.length) {
        return <p>No images provided.</p>;
    };
    
    return ( 
        <div className={styles.container}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={styles.mainImageContainer}>
                    <img src={data?.images[currentIndex].url} alt={`Gallery image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {data?.images?.map((image, index) => (
                        <div key={index} className={`${styles.thumbnailWrapper} ${index === currentIndex ? styles.active : '' }`} onClick={() => handleThumbnailClick(index)} >
                            <img src={image.url} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data?.title}</h2>
                    <p>Artist:<span> {data.artist_details.first_name} {data.artist_details.lasst_name} </span></p>
                    {data.price? <p className={styles.price}>${data.price.toLocaleString()}</p> : <p>Starting Bid:<span> ${data.price.toLocaleString()} </span></p>}
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
                        <p><span>{data.themes} </span></p>
                    </li>
                    {/* <li>
                        <p>Themes</p>
                        <p>{data.theme.map(them=>(
                            <span>{them}, </span>
                        ))}</p>
                    </li> */}
                    <li>
                        <p>Type</p>
                        <p>{data?.artwork_type}</p>
                    </li>
                    <li>
                        <p>Size</p>
                        <p>{data?.dimension} (h x w x d in inches)</p>
                    </li>
                    <li>
                        <p>Frame</p>
                        <p>{data?.framed.toString()}</p>
                    </li>
                    <li>
                        <p>Proof of Authenticy</p>
                        <p>{data?.proof_of_authenticity.toString()}</p>
                    </li>
                </div>
                {data.request_type==='gallery' && <div onClick={handleAddToCart} className={`btn ${styles.addToCart}`}>Add to cart</div>}
            </div>
            
        </div>
    );
}
 
export default ArtworkDetail;