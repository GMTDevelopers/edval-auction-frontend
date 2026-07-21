'use client';
import { useState } from 'react';
import styles from './artistReg.module.css';
const ArtistRegistration  = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');
    return ( 
        <div>
            <div className='headerCenter pageHeader'>
                <h1>Artist Registration</h1>
                <p>
                    Fill the form below to register as an artist on Edval Art Auction to be able to submit your artworks. 
                </p>
            </div>
            <div className={styles.banner}>
                <img src="/images/artistReg.webp" alt="banner" />
            </div>
            <div className={styles.regForm}>
                <div className={styles.regContainer}>
                    <h2>Artist Request Form</h2>
                    <form action="">
                        <section className={styles.section}>
                            <p>SECTION A: <span>PERSONAL INFORMATION</span></p>
                            <div className="double">
                                <input placeholder="First name" type="text" name="firstName" required />
                                <input placeholder="Last name" type="text" name="lastName" required />
                            </div>
                            <input placeholder="Email address" type="email" name="email" required />
                            <input placeholder="Phone number" type="tel" name="phoneNum" required />
                            <textarea name="address" placeholder="Address"></textarea>
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
                        </section>

                        <section className={styles.section}>
                            <p>SECTION B: <span>ARTIST INFORMATION</span></p>
                            <div className='double'>
                                <select defaultValue="Artistic style" name="artisticStyle">
                                    <option disabled>Artistic style</option>                 
                                    <option value="Delivery">
                                        kongo
                                    </option>                                
                                    <option value="Pickup">
                                        DRC
                                    </option>                                                              
                                </select>
                                <select defaultValue="Years of experience" name="YearsOfExperience">
                                    <option disabled>Years of experience</option>                 
                                    <option value="Delivery">
                                        Address delivery
                                    </option>                                
                                    <option value="Pickup">
                                        Physical Pickup
                                    </option>                                                              
                                </select>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <p>SECTION C: <span>BANK INFORMATION</span></p>
                            <input placeholder="Bank name" type="text" name="bankName" />
                            <input placeholder="Account number" type="tel" name="accountNumber" />
                        </section>
                        <section className={styles.section}>
                            <div className="checkboxPack">
                                <input 
                                    type="checkbox"
                                    name="agree"
                                    checked={isAgreed}
                                    onChange={(e) => {setIsAgreed(e.target.checked); setError('')}}
                                />
                                <div className="checkboxTxt">
                                    <p>I agree to the Terms and Conditions</p>
                                </div>                                
                            </div>
                        </section>
                        <button className="btn submit">Create my account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default ArtistRegistration;