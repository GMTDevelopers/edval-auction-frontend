import styles from './page.module.css';
const LotSide = ({name, artist, year, bid, status, img}) => {
    return ( 
        <div className={styles.sideCardCont}>
            <div className={styles.left}>
                <img src={img} alt="" />
            </div>
            <div className={styles.right}>
                <h3>{name}</h3>
                <p>Artist: <span>{artist}</span></p>
                <p>Year: <span>{year}</span></p>
                <p>Starting bid: <span>{bid}</span></p>
                <p>Status: <span>{status}</span></p>
            </div>
        </div>
    );
}
 
export default LotSide;