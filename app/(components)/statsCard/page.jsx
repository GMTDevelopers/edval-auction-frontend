import styles from "./statscard.module.css";

const StatsCard = ({title, data, icon: Icon}) => {

    return ( 
        <div className={styles.card}>
            <p className={styles.cardTitle}>{title}</p>
            <div className={styles.statPack}>
                <p className={styles.stat} style={{fontStyle:'normal'}}>{data}</p>
                <div className={styles.icon}>
                   <Icon/>
                </div>
            </div>
        </div>
    );
}
 
export default StatsCard;