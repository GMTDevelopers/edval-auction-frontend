'use client';
import { useEffect, useState } from 'react';
import styles from './shipping.module.css';
import countries from '@/app/data/countries.json'
import PaymentDue from '@/app/(components)/sideCard/paymentDue';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import ButtonLoader from '@/app/(components)/loader/buttonloader';
import { useCart } from '@/app/context/cartContext';

const ShippingDetails = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');
/*     const searchParams = useSearchParams();
    const winer = searchParams.get('winner'); */
    const searchString = window.location.search;
    const winer = new URLSearchParams(searchString);
    const [isDelivery, setIsDevlivery] = useState(false);
    const {cartCheckoutFunction} = useCart();
    const [loading, setLoading] = useState(false)
    const [winner, setWinnerData] = useState({})
    const [date,setDate] = useState(new Date().toISOString().split('T')[0])
    const [formData, setformData] = useState({
        contact_person: "",
        contact_phone: "",
        delivery_method: "pickup",
        insurance_selected: false,
        pickup_date: date,
        pickup_office: "",
        postal_code: "",
        shipping_address: "",
        shipping_city: "",
        shipping_country: "",
        shipping_state: ""
    })
    useEffect(() => {
        if (winer) {
            try {
                setWinnerData(JSON.parse(decodeURIComponent(winer)));
            } catch (e) {
                console.error("Error parsing filters from URL:", e);
            }
        }
    }, [winer]);
    const [payinitData, setPayInitData] = useState({
        callback_url: "",
        item_id: 0,
        item_type: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAgreed){
            setError('You must accept the terms to continue.');
            return;
        } 
        setLoading(true);
        const pickupDate = new Date(date);
        const dataToSubmit = {
            ...formData,
            pickup_date: pickupDate
        }
        const result = await cartCheckoutFunction(dataToSubmit);
        console.log('checkout result', result)
        if (result.success) {
            try {
                
                const callbackUrl = `${window.location.origin}/payment/callback`;
                const initData = {
                    ...payinitData,
                    callback_url: callbackUrl ,
                    lot_id: winner.lotID,
                    item_type: "auction_lot"
                }
                const data = await initializePayment(initData);

                // Most backends (and Paystack) return an authorization_url
                if (data.data?.authorization_url) {
                    window.location.href = data.data.authorization_url;
                } else if (data.authorization_url) {
                    window.location.href = data.authorization_url;
                } else {
                    console.log("Full response:", data);
                    toast.error("Payment initialized but no redirect URL found");
                }
            } catch (err) {
                console.error(err);
                toast.error( err.details.delivery_method || err.message || "Payment failed");
            }           
          /*   toast.success('checkout successful') */
        }
        if(!result.success){
            setLoading(false);
            console.log('check out',result)
            toast.error(result.error);
        }
        setError('');
        setLoading(false);
        console.log(error);
    };



    return ( 
        <div className={styles.shippingContainer}>
            <div className={`container ${styles.double}`}>
                <div className={styles.big}>
                    <div className={styles.part1}>
                        <h3>Confirm Shipping Details {winner.title}</h3>
                        <p>Artworks: <span>{winner.title}</span> </p>
                        <p>Artist: <span>{winner.firstName} {winner.lastName}</span> </p>
                        <p>Year: <span>2022</span> </p>
                        <p>Payment window expiring in: <span style={{color:"#FB0000"}}>29:57</span> </p>
                    </div>
                    <div className={styles.part2}>
                        <form onSubmit={handleSubmit}>
                            <select value={formData.delivery_method} onChange={(e)=>{setIsDevlivery(!isDelivery); setformData(prev=>({...prev, delivery_method:e.target.value}))}}  name="deliveryMethod">                                   
                                <option value="pickup">
                                    Physical Pickup
                                </option>      
                                  <option value="delivery">
                                    Address delivery
                                </option>                                                         
                            </select>
                            {isDelivery && <textarea value={formData.shipping_address} onChange={(e)=>{setformData(prev=>({...prev, shipping_address:e.target.value}))}} placeholder='Delivery address' name="deliveryAddress" id=""></textarea>}
                            {isDelivery &&  <div className='double'>
                                <select value={formData.shipping_country} onChange={(e)=>{setformData(prev=>({...prev, shipping_country:e.target.value}))}} name="country">
                                    <option disabled>Country</option>                 
                                    {(countries).map((country, index) => (
                                        <option key={index} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}                                                                
                                </select>
                                <input value={formData.shipping_state} onChange={(e)=>{setformData(prev=>({...prev, shipping_state:e.target.value}))}} name='state' type="text" placeholder='State' />
                            </div>}
                            {isDelivery &&  <div className='double'>
                                <input name='city' value={formData.shipping_city} onChange={(e)=>{setformData(prev=>({...prev, shipping_city:e.target.value}))}} type="text" placeholder='City' />
                                <input name='zipCode' value={formData.postal_code} onChange={(e)=>{setformData(prev=>({...prev, postal_code:e.target.value}))}} type="text" placeholder='ZIP Code' />
                            </div>}
                            {!isDelivery &&  <select value={formData.pickup_office} onChange={(e)=>{setformData(prev=>({...prev, pickup_office:e.target.value}))}} placeholder='Select Pickup Office' name="pickupLocation">
                                <option>Select Pickup Office</option>                 
                                <option value="HQ">
                                Headquaters office Porthacurt
                                </option>                                
                                <option value="Asaba branch Office">
                                    Asaba branch Office
                                </option>                                                              
                            </select>}
                            {!isDelivery &&  <input value={date} onChange={(e)=>{setDate(e.target.value)}} type="date" name='pickupDate' />}
                               
                            <input value={formData.contact_person} onChange={(e)=>{setformData(prev=>({...prev, contact_person:e.target.value}))}} name='contactPerson' type="text" placeholder='Contact Person' />
                            <input value={formData.contact_phone} onChange={(e)=>{setformData(prev=>({...prev, contact_phone:e.target.value}))}} name='phoneNumber' type="tel" placeholder='Phone number' />
                            
                            <div className="checkboxPack">
                                <input 
                                    type="checkbox"
                                    name="agree"
                                    checked={isAgreed}
                                    onChange={(e) => {setIsAgreed(e.target.checked); setformData(prev=>({...prev, insurance_selected:e?.target?.checked})) ;setError('')}}
                                />
                                <div className="checkboxTxt">
                                    <p>Include insurance?</p>
                                    <p>Insurance attracts a standard charge to cover for the haulage of the products from our pickup office till it gets to you. any damage incurred in transit is fully covered and on us.</p>
                                </div>                                
                            </div>
                            <div className={styles.summaryPack}>
                                <h4>Summary</h4>
                                {!isDelivery &&  <p className="double">
                                    Pickup Address:
                                    <span>{formData.pickup_office}</span>
                                </p>}
                                {isDelivery &&  <p className="double">
                                    Delivery Address:
                                    <span>{formData.shipping_address}</span>
                                </p>}
                                {isDelivery &&  <p className="double">
                                    Contact Person:
                                    <span>{formData.contact_person} ({formData.contact_phone}).</span>
                                </p>}
                                {!isDelivery &&  <p className="double">
                                    Pickup Date:
                                    <span>{new Date(formData.pickup_date).toDateString()}</span>
                                </p>}
                                <p className="double">
                                    Item amount
                                    <span>${winner?.amount}</span>
                                </p>
                                {isDelivery && <p className="double">
                                    Shipping fee
                                    <span>₦15.00</span>
                                </p>}
                                {isAgreed && <p className="double">
                                    Insurance
                                    <span>₦50.00</span>
                                </p>}
                                <p className="double">
                                    VAT
                                    <span>₦0.00</span>
                                </p>
                            </div>
                            <button type='submit' className={`btn ${styles.submit}`}>{loading ? <ButtonLoader /> : "Proceed to payment"}</button>
                        </form>
                    </div>
                </div>
                <div className={styles.small}>
                    <div className={styles.smallPack}>
                        <h5>Payment Due</h5>
                        <div className={styles.sideLots}>                        
                            <PaymentDue  name={winner.title} img={winner.image} artist={winner.firstName} price={winner.amount} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ShippingDetails;