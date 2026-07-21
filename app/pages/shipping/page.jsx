'use client';
import { useState } from 'react';
import styles from './shipping.module.css';
import PaymentDue from '@/app/(components)/sideCard/paymentDue';


const ShippingDetails = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');

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
                    <div className={styles.part1}>
                        <h3>Confirm Shipping Details</h3>
                        <p>Artworks: <span>Dancing in the Wind</span> </p>
                        <p>Artist: <span>Sharon Bailey</span> </p>
                        <p>Year: <span>2022</span> </p>
                        <p>Payment window expiring in: <span style={{color:"#FB0000"}}>29:57</span> </p>
                    </div>
                    <div className={styles.part2}>
                        <form action="">
                            <select defaultValue="Delivery Method" name="deliveryMethod">
                                <option disabled>Delivery Method</option>                 
                                <option value="Delivery">
                                    Address delivery
                                </option>                                
                                <option value="Pickup">
                                    Physical Pickup
                                </option>                                                              
                            </select>
                            <textarea placeholder='Delivery address' name="deliveryAddress" id=""></textarea>
                            <div className='double'>
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
                            </div>
                            <div className='double'>
                                <select defaultValue="City" name="city">
                                    <option disabled>City</option>                 
                                    <option value="Delivery">
                                        City
                                    </option>                                                                                  
                                </select>
                                <input name='zipCode' type="text" placeholder='ZIP Code' />
                            </div>
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
                                <p className="double">
                                    Artwork:
                                    <span>$2,150.00</span>
                                </p>
                                <p className="double">
                                    Shipping fee
                                    <span>$15.00</span>
                                </p>
                                {isAgreed && <p className="double">
                                    Insurance
                                    <span>$50.00</span>
                                </p>}
                                <p className="double">
                                    VAT
                                    <span>$7.50</span>
                                </p>
                            </div>
                            <div className={`btn ${styles.submit}`}>Proceed to pay $2,207.50</div>
                        </form>
                    </div>
                </div>
                <div className={styles.small}>
                    <div className={styles.smallPack}>
                        <h5>Payment Due</h5>
                        <div className={styles.sideLots}>                        
                            <PaymentDue  name="Dancing in the Wind" img='/images/auction/3.webp' artist="Jane Fondant"  price="2150.00" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ShippingDetails;