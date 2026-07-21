import { useState } from 'react';
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from './settings.module.css';
import { Eye, EyeOff } from 'lucide-react';
const CreateNewAdmin = () => {
        const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toggleVisibility = () => setIsVisible((prev) => !prev);
    return ( 
        <div className={Styles.createAdminCont}>
            <div className="headerCenter">
                <h1>Create Admin Account</h1>
                <p>This creates a new admin account with full platform access and admin controls.</p>
            </div>
            <form action="">
                <div className={styles.Double}>
                    <input name='firstName' type="text" placeholder='First Name' />
                    <input name='lastName' type="text" placeholder='Last Name' />
                </div>
                <input name='phoneNum' type="tel" placeholder='Phone number' />
                <input name='email' type="email" placeholder='Email address' />
                <div className={styles.passVisible}>                                
                    <input value={password}  onChange={(e) => setPassword(e.target.value)} type={isVisible ? "text" : "password"} placeholder='Password' />
                    <span type="button" onClick={toggleVisibility} className={styles.visibility} aria-label={isVisible ? "Hide password" : "Show password"} >
                        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>
                <div className={styles.passVisible}>                                
                    <input value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} type={isVisible ? "text" : "password"} placeholder='Confirm Password' />
                    <span type="button" onClick={toggleVisibility} className={styles.visibility} aria-label={isVisible ? "Hide password" : "Show password"} >
                        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>
                <button className="btn submit">Create account</button>
            </form>
        </div>        
    );
}
 
export default CreateNewAdmin;