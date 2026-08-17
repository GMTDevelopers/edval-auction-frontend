import { useState } from 'react';
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from './settings.module.css';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import ButtonLoader from '@/app/(components)/loader/buttonloader';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CreateAdmin = async (formData) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/users/admin`, { 
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "Create admin function failed"
            )
        }
        return {
            success:true,
            data: data
        };
    } catch (err) {
        console.log(err)
        return {
            success: false,
            err,
        };
    }
};
const CreateNewAdmin = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const [signupData, setSignupData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(signupData.password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        const result = await CreateAdmin(signupData);
        if (result.success) {
            setLoading(false);
            toast.success("Admin created successfully.");
            console.log('Admin created successfully:', result);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            setLoading(false);
            console.log(result);
            toast.error(result.err.message);
        }
    };


    return ( 
        <div className={Styles.createAdminCont}>
            <div className="headerCenter">
                <h1>Create Admin Account</h1>
                <p>This creates a new admin account with full platform access and admin controls.</p>
            </div>
            <form onSubmit={handleSignupSubmit}>
                <div className={styles.Double}>
                    <input value={signupData.first_name} onChange={(e) => setSignupData(prev => ({...prev, first_name: e.target.value}))} name='firstName' type="text" placeholder='First Name' />
                    <input value={signupData.last_name} onChange={(e) => setSignupData(prev => ({...prev, last_name: e.target.value}))} name='lastName' type="text" placeholder='Last Name' />
                </div>
                <input value={signupData.phone} onChange={(e) => setSignupData(prev => ({...prev, phone: e.target.value}))} name='phoneNum' type="tel" placeholder='Phone number' />
                <input value={signupData.email} onChange={(e) => setSignupData(prev => ({...prev, email: e.target.value}))} name='email' type="email" placeholder='Email address' />
                <div className={styles.passVisible}>                                
                    <input value={signupData.password} onChange={(e) => setSignupData(prev => ({...prev, password: e.target.value}))} type={isVisible ? "text" : "password"} placeholder='Password' />
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
                <button disabled={loading} className="btn submit">{loading ? <ButtonLoader /> : "Create account"}</button>
            </form>
        </div>        
    );
}
 
export default CreateNewAdmin;