'use client'
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from'./account.module.css'
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/app/context/authContext';
const Account = () => {
    const {user} = useAuth();
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
                                <div>
                                    <label htmlFor="firstName">First name</label>
                                    <input placeholder="First name" value={user?.first_name} type="text" name="firstName" required />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last name</label>
                                    <input placeholder="Last name" value={user?.last_name} type="text" name="lastName" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="studioName">Studio name</label>
                                <input placeholder="Studio name" value={user?.artist_profile?.studio_name} type="text" name="studioName" required />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input placeholder="Email address" value={user?.email} type="email" name="email" required />
                            </div>
                            <div>
                                <label htmlFor="phoneNum">Phone number</label>
                                <input placeholder="Phone number" value={user?.phone} type="tel" name="phoneNum" required />
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <textarea name="address" placeholder="address" value={user?.artist_profile?.address}></textarea>
                            </div>
                            <div className='double'>
                                <div>
                                    <label htmlFor="country">Country</label>
                                    <select value={user?.artist_profile?.country} name="country">
                                        <option>Country</option>                 
                                        <option value="Delivery">
                                            kongo
                                        </option>                                
                                        <option value="Pickup">
                                            DRC
                                        </option>                                                              
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="state">State</label>
                                    <input placeholder="State" value={user?.artist_profile?.state} type="text" name="state" />
                                </div>
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
                            <div className="double">
                                <p style={{whiteSpace:"nowrap"}}>Portfolio link</p>
                                <input placeholder="Portfolio link" type="url" name="website" required />
                            </div>
                            <textarea name="address" placeholder="address"></textarea>
                            <div className="double">
                                <p style={{whiteSpace:"nowrap"}}>Account number</p>
                                <input placeholder="Account Number" type="tel" name="acctNum" required />
                            </div>
                            <div className="double">
                                <p style={{whiteSpace:"nowrap"}}>Bank name</p>
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