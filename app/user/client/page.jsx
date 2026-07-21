import styles from './client.module.css';
import Table from "@/app/(components)/tables/client";

const MyOrders = () => {
  
    return ( 
        <div className={styles.container}>
            <div className="container">
                <h2>My Orders (5)</h2>
                <Table />
            </div>
        </div>
    );
}
 
export default MyOrders;