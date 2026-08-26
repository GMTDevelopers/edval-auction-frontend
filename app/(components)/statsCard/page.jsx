import styles from "./statscard.module.css";

const StatsCard = ({title, data, icon}) => {

    return ( 
        <div className={styles.card}>
            <p className={styles.cardTitle}>{title}</p>
            <div className={styles.statPack}>
                <div className={styles.stat} style={{fontStyle:'normal'}}>{data}</div>
                <div className={styles.icon}>
                   <icon/>
                </div>
            </div>
        </div>
    );
}
 
export default StatsCard;