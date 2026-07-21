'use client'
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from'./account.module.css'
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
const Account = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");
    const toggleVisibility = () => setIsVisible((prev) => !prev);
    return ( 
        <div>
            <div className="upcomingAuctions">
                
                <div className={`container double`}>
                    <div className="small">
                        <div className={Styles.imgPack}>
                            <img src="/images/comission/comission.webp" alt="comission" />
                        </div>
                        <button type='submit' className='submit btn'>Upload Profile Photo</button>
                    </div>
                    <div className="big">
                        <form action="">
                            <div className="double">
                                <input placeholder="First name" type="text" name="firstName" required />
                                <input placeholder="Last name" type="text" name="lastName" required />
                            </div>
                            <div className="double">
                                <p>Studio name</p>
                                <input placeholder="Studio name" type="text" name="studioName" required />
                            </div>
                            <div className="double">
                                <p>Email</p>
                                <input placeholder="Email address" type="email" name="email" required />
                            </div>
                            <div className="double">
                                <p>Phone number</p>
                                <input placeholder="Phone number" type="tel" name="phoneNum" required />
                            </div>
                            <textarea name="address" placeholder="address"></textarea>
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
                            <div className="rowMultiple">
                                <p>Portfolio link</p>
                                <input placeholder="Phone number" type="url" name="website" required />
                            </div>
                            <textarea name="address" placeholder="address"></textarea>
                            <div className="rowMultiple">
                                <p>Account number</p>
                                <input placeholder="Account Number" type="tel" name="acctNum" required />
                            </div>
                            <div className="rowMultiple">
                                <p>Bank name</p>
                                <input placeholder="Bank name" type="text" name="bankName" required />
                            </div>
                            <div className={styles.passVisible}>
                                <input value={password}  onChange={(e) => setPassword(e.target.value)} type={isVisible ? "text" : "password"} placeholder='Password' />
                                <span type="button" onClick={toggleVisibility} className={styles.visibility} aria-label={isVisible ? "Hide password" : "Show password"} >
                                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            
                            <button type='submit' className='submit btn'>Save changes</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Account;