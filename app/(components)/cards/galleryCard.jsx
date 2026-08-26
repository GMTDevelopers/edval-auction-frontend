'use client'
import { useRouter } from 'next/navigation';
import styles from './cards.module.css'
const GalleryCard = ({img,name,artist,artistFirst,artistLast,price,slug,category}) => {
    
    const router =  useRouter()
    return ( 
         <div onClick={()=> router.push(`/pages/gallery/${slug}?category=${category}`)} className={styles.card}>
            <div className={styles.imgContainer}>
                <img className={styles.galImg} src={img} alt="auction item" />
            </div>
            <div className={`${styles.cardTxt} ${styles.GallerycardTxt}`}>
                <h4>{name}</h4>
                <p>Artist: <span>{artistFirst} {artistLast}</span></p>
                <p className={styles.cardPrice}>₦{price}</p>
            </div>
        </div>
    );
}
 
export default GalleryCard;
