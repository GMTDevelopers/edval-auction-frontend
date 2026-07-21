import { Trash2 } from 'lucide-react';
import styles from './page.module.css';
import { useCart } from '@/app/context/cartContext';
const CartCard = ({id, name, artist, description, price, img}) => {
    console.log("name:", name)
    const{removeItem} = useCart()
    return ( 
        <div className={styles.sideCardCont}>
            <div className={styles.left}>
                <img src={img} alt="" />
            </div>
            <div style={{justifyContent:"center", height:"auto"}} className={`${styles.right} ${styles.payDueRight}`}>
                <div className={styles.right} >
                    <h3>{name}</h3>
                    <p>Artist: <span>{artist}</span></p>
                </div>
                <p className={styles.description}>{description}</p>
                <br />
                <div className="double">
                    <p className={styles.payDuePrice}>${price}</p>
                    <Trash2 onClick={()=>removeItem(id)} color="#FB0000" size={24} />
                </div>
            </div>
        </div>
    );
}
 
export default CartCard;