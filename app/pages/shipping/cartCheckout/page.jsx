'use client';
import { useState } from 'react';
import styles from '../shipping.module.css';
import PaymentDue from '@/app/(components)/sideCard/paymentDue';
import { Heading2 } from 'lucide-react';


//This is the shipping for the whole site
//this uses conditional rendering to show the right fields for the right purpose
const CartShippingDetails = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');
    const [isDelivery, setIsDevlivery] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAgreed){
            setError('You must accept the terms to continue.');
            return;
        } 


        setError('');
        console.log(error);
    };


    return ( 
        <div className={styles.shippingContainer}>
            <div className={`container ${styles.double}`}>
                <div className={styles.big}>
                   {isDelivery && <h2>is delivery true</h2>}
                    <div className={styles.part2}>
                        <form action="">
                            <select onChange={()=>setIsDevlivery(!isDelivery)} defaultValue="Delivery Method" name="deliveryMethod">
                                <option disabled>Delivery Method</option>                 
                                <option value="Delivery">
                                    Address delivery
                                </option>                                
                                <option value="Pickup">
                                    Physical Pickup
                                </option>                                                              
                            </select>
                                           
                            {isDelivery && <textarea placeholder='Delivery address' name="deliveryAddress" id=""></textarea>}
                            {isDelivery &&  <div className='double'>
                                <select defaultValue="Country" name="country">
                                    <option disabled>Country</option>                 
                                    <option value="Delivery">
                                    kongo
                                    </option>                                
                                    <option value="Pickup">
                                        DRC
                                    </option>                                                              
                                </select>
                                <select defaultValue="State" name="state">
                                    <option disabled>State</option>                 
                                    <option value="Delivery">
                                        Address delivery
                                    </option>                                
                                    <option value="Pickup">
                                        Physical Pickup
                                    </option>                                                              
                                </select>
                            </div>}
                            {isDelivery &&  <div className='double'>
                                <select defaultValue="City" name="city">
                                    <option disabled>City</option>                 
                                    <option value="Delivery">
                                        City
                                    </option>                                                                                  
                                </select>
                                <input name='zipCode' type="text" placeholder='ZIP Code' />
                            </div>}
                            {!isDelivery &&  <select defaultValue="Select Pickup Office" name="pickupLocation">
                                <option disabled>Select Pickup Office</option>                 
                                <option value="Delivery">
                                kongo
                                </option>                                
                                <option value="Pickup">
                                    DRC
                                </option>                                                              
                            </select>}
                            {!isDelivery &&  <input type="date" name='pickupDate' />}
                               
                           
                            <input name='contactPerson' type="text" placeholder='Contact Person' />
                            <input name='phoneNumber' type="tel" placeholder='Phone number' />
                            
                            <div className="checkboxPack">
                                <input 
                                    type="checkbox"
                                    name="agree"
                                    checked={isAgreed}
                                    onChange={(e) => {setIsAgreed(e.target.checked); setError('')}}
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
                                    <span>123, Willouby Street, Central Area, New Park.</span>
                                </p>}
                                {isDelivery &&  <p className="double">
                                    Delivery Address:
                                    <span>123, Willouby Street, Central Area, New Park.</span>
                                </p>}

                                {isDelivery &&  <p className="double">
                                    Contact Person:
                                    <span>Nissi Olamade (+234 801 234 5678).</span>
                                </p>}
                                {!isDelivery &&  <p className="double">
                                    Pickup Date:
                                    <span>June 17, 2026</span>
                                </p>}

                                <p className="double">
                                    Item amount
                                    <span>$15.00</span>
                                </p>
                                {isDelivery && <p className="double">
                                    Shipping fee
                                    <span>$15.00</span>
                                </p>}
                                {isAgreed && <p className="double">
                                    Insurance
                                    <span>$50.00</span>
                                </p>}
                                <p className="double">
                                    VAT
                                    <span>$7.50</span>
                                </p>
                                <div className="double">
                                    <p><span>ORDER TOTAL</span></p>
                                    <p><span>$770.00</span></p>
                                </div>
                            </div>
                            <div className={`btn ${styles.submit}`}>Proceed to payment</div>
                        </form>
                    </div>
                </div>
                <div className={styles.small}>
                    <div className={styles.smallPack}>
                        <h5>Item amount</h5>
                        <div className={styles.sideLots}>                        
                            <PaymentDue  name="Dancing in the Wind" img='/images/auction/3.webp' artist="Jane Fondant"  price="2150.00" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CartShippingDetails;