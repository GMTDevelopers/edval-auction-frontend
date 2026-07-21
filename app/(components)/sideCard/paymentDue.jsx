import styles from './page.module.css';
const PaymentDue = ({name, artist, price, img}) => {
    return ( 
        <div className={styles.sideCardCont}>
            <div className={styles.left}>
                <img src={img} alt="" />
            </div>
            <div className={`${styles.right} ${styles.payDueRight}`}>
                <div className={styles.right} >
                    <h3>{name}</h3>
                    <p>Artist: <span>{artist}</span></p>
                </div>
                
                
                <p className={styles.payDuePrice}>{price}</p>
            </div>
        </div>
    );
}
 
export default PaymentDue;