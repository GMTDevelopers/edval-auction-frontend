'use client';
import { Download } from 'lucide-react';
import styles from './orderDet.module.css';
import { initializePayment } from '@/app/services/payment';
import { toast } from 'sonner';
import { useState } from 'react';
const OrderDet = ({data, status}) => {

    const [loading, setLoading] = useState(false);
    const [payinitData, setPayInitData] = useState({
        callback_url: "",
        item_id: 0,
        item_type: ""
    });
    const handlePay = async () => {
        try {
            setLoading(true);

            // Replace with your real success page

            const callbackUrl = `${window.location.origin}/payment/callback`;

            const initData = {
                ...payinitData,
                callback_url: callbackUrl,
                item_id: data?.id,
                item_type: "gallery_order"
            }
            const resData = await initializePayment(initData);

            // Most backends (and Paystack) return an authorization_url
            if (resData.data?.authorization_url) {
                window.location.href = resData.data.authorization_url;
            } else if (resData.authorization_url) {
                window.location.href = resData.authorization_url;
            } else {
                console.log("Full response:", resData);
                toast.error("Payment initialized but no redirect URL found");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };


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
                {
                    status==='pending'? <div className='btn' onClick={handlePay}> Make Payment </div>:
                    <li style={{listStyleType:"none", gap:"8px !important"}}><Download size={15} /> Download invoice (.pdf)</li>}
            </div>

        </div>
    );
}
    
export default OrderDet;