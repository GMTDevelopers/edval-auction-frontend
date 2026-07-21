import styles from './cards.module.css'
const PastExhibitionCard = ({name,img,date,attending}) => {
    return ( 
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={img} alt="auction item" />
            </div>
            <div className={`${styles.cardTxt} ${styles.cardTxtExhibition}`}>
                <h4>{name}</h4>
                <p>{date} | {attending} attended</p>                
            </div>
        </div>
    );
}
 
export default PastExhibitionCard;
