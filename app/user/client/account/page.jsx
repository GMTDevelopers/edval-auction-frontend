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
                        <h2>Fill the form below to request your personalized portrait commission.</h2>
                        <form action="">
                            <div className="double">
                                <input placeholder="First name" type="text" name="firstName" required />
                                <input placeholder="Last name" type="text" name="lastName" required />
                            </div>
                            
                            <input placeholder="Email address" type="email" name="email" required />
                            <input placeholder="Phone number" type="tel" name="phoneNum" required />
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