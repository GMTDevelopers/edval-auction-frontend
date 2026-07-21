'use client';
import { useState } from 'react';
import styles from './commission.module.css';
const Commission = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');
    return ( 
        <div>
            <div className='headerCenter pageHeader'>
                <h1>Request Your Personalized Portrait or Custom Artwork</h1>
                <p>
                    Create custom portraits, paintings, memorial pieces, and expressive artworks made specifically around your story, space, or occasion.
                </p>
            </div>
            <div className="upcomingAuctions">
                <div className={`container double`}>
                    <div className="small">
                        <div className={styles.imgPack}>
                            <img src="/images/comission/comission.webp" alt="comission" />
                        </div>
                    </div>
                    <div className="big">
                        <h2>Fill the form below to request your personalized portrait commission.</h2>
                        <form action="">
                            <div className="double">
                                <input placeholder="First name" type="text" name="firstName" required />
                                <input placeholder="Last name" type="text" name="lastName" required />
                            </div>
                            <div className="double">
                                <input placeholder="Email address" type="email" name="email" required />
                                <input placeholder="Phone number" type="tel" name="phoneNum" required />
                            </div>
                            <textarea name="location" placeholder="Location"></textarea>
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
                            <select defaultValue="Type of artwork requested" name="typeRequested">
                                <option disabled>Type of artwork requested</option>                 
                                <option value="Delivery">
                                    kongo
                                </option>                                
                                <option value="Pickup">
                                    DRC
                                </option>                                                              
                            </select>
                            <select defaultValue="Preferred style" name="preferredStyle">
                                <option disabled>Preferred style</option>                 
                                <option value="oil">
                                    oil
                                </option>                                
                                <option value="oil">
                                    oil
                                </option>                                                              
                            </select>
                            <textarea name="description" placeholder="Describe the artwork. Be as detailed and specific as possible."></textarea>
                            <input placeholder="Intended Purpose" type="text" name="IntendedPurpose" id="" />
                            <h4>Image goes here</h4>
                            <div className="double">
                                <p>Dimensions (m):</p>
                                <input placeholder="Length" type="tel" name="length" required />
                                <input placeholder="Width" type="tel" name="width" required />
                                <input placeholder="Depth" type="tel" name="depth" required />
                            </div>
                            <select defaultValue="Budget range" name="budgetRange">
                                <option disabled>Budget range</option>                 
                                <option value="oil">
                                    oil
                                </option>                                
                                <option value="oil">
                                    oil
                                </option>                                                              
                            </select>
                            <input placeholder="Preferred deadline" type="date" name="deadline" />
                            <div className="checkboxPack">
                                <input 
                                    type="checkbox"
                                    name="agree"
                                    checked={isAgreed}
                                    onChange={(e) => {setIsAgreed(e.target.checked); setError('')}}
                                />
                                <div className="checkboxTxt">
                                    <p>Request for a specific artist?</p>
                                </div>                                
                            </div>
                            {
                                isAgreed && <select defaultValue="Select artist" name="artist">
                                <option disabled>Select artist</option>                 
                                <option value="oil">
                                    oil
                                </option>                                
                                <option value="oil">
                                    oil
                                </option>                                                              
                            </select>
                            }
                            {
                                isAgreed && <textarea name="instructions" placeholder="Additional instructions"></textarea>
                            }
                            <button type='submit' className='submit btn'>Submit request</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Commission;