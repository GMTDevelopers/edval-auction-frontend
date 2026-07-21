import { Download } from 'lucide-react';
import styles from './orderDet.module.css';
const OrderDet = () => {
    return ( 
        <div className={styles.OrderDet}>
            <div className="container">
                <h2>Order Details</h2>
                <ul>
                    <li>
                        <p><span>Product</span></p>
                        <p><span>Cost</span></p>
                    </li>
                    <li>
                        <p>Whispers of Dawn  x1</p>
                        <p><span>$150.00</span></p>
                    </li>
                    <li>
                        <p>Shipping Fee</p>
                        <p><span>$15.00</span></p>
                    </li>
                    <li>
                        <p>Insurance</p>
                        <p><span>$50.00</span></p>
                    </li>
                    <li>
                        <p>VAT</p>
                        <p><span>$7.50</span></p>
                    </li>
                    <li>
                        <p>Total amount</p>
                        <p><span>$172.50</span></p>
                    </li>
                </ul>
                <div className={`${styles.shippingDet} ${styles.OrderDet}`}>
                    <div className="container">
                        <p><span>Shipping Details</span></p>
                        <p style={{marginTop:"12px"}}>Sharon Willouby</p>
                        <p>Off, Newtown Bypass way</p>
                        <p>Lagos, Nigeria</p>
                        <p>Phone: +1 (654) 495-9092</p>
                        <p>Email: kosiposo@mailinator.com</p>
                    </div>
                </div>
                <li style={{listStyleType:"none", gap:"8px !important"}}><Download size={15} /> Download invoice (.pdf)</li>
            </div>

        </div>
    );
}
    
export default OrderDet;