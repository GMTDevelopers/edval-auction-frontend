import { Download } from 'lucide-react';
import styles from './orderDet.module.css';
const OrderDet = ({data}) => {
    return ( 
        <div className={styles.OrderDet}>
            <div className="container">
                <h2>Order Details</h2>
                <ul>
                    <li>
                        <p><span>Product</span></p>
                        <p><span>Cost</span></p>
                    </li>
                    {data.items.map((b,index)=>(<li key={index}>
                        <p>{b.title}</p>
                        <p><span>₦{b.price}</span></p>
                    </li>))}
                    <li>
                        <p>Shipping Fee</p>
                        <p><span>₦{data.shipping_fee}</span></p>
                    </li>
                    {data.insurance_selected && <li>
                        <p>Insurance</p>
                        <p><span>₦{data?.insurance_fee}</span></p>
                    </li>}
                    <li>
                        <p>VAT</p>
                        <p><span>₦{data?.vat}</span></p>
                    </li>
                    <li>
                        <p>Total amount</p>
                        <p><span>₦{data?.total_amount}</span></p>
                    </li>
                </ul>
                <div className={`${styles.shippingDet} ${styles.OrderDet}`}>
                    <div className="container">
                        {data.delivery_method==='shiping'&&<p><span>Shipping Details</span></p>}
                        {data.delivery_method==='pickup'&&<p><span>Pickup Details</span></p>}
                        <p style={{marginTop:"12px"}}>{data.shipping_address || data.pickup_office}</p>
                        <p>Off, Newtown Bypass way</p>
                        <p>{data.shipping_city}, Nigeria</p>
                        <p>Phone: {data.contact_phone}</p>
                        {/* <p>Email: kosiposo@mailinator.com</p> */}
                    </div>
                </div>
                <li style={{listStyleType:"none", gap:"8px !important"}}><Download size={15} /> Download invoice (.pdf)</li>
            </div>

        </div>
    );
}
    
export default OrderDet;