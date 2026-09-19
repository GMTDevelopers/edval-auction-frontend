'use client';
import { toast } from 'sonner';
import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import Tab from '../tab/tabs';
import styles from '../tab/tabs.module.css';
import { useModal } from '../ModalProvider/ModalProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ResetPassword = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/reset-password`, { 
        method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "forgot password function failed"
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


const ResetPasswordComponent = ({userEmail}) => {
    const [resetData, setResetData] = useState({
        email: userEmail,
        otp: '',
        new_password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);
    const { openModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (resetData.new_password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        const result = await ResetPassword(resetData);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if (result.success) {
            console.log('Reset Password successfull:', result);
            toast.success("Password reset successful. You can now log in with your new password.");
            openModal(<Tab />);
        }
    };
  return (
        <div className='container'>
            <h2>Forgot Password Page</h2>
            <p>An otp has been sent to your email</p>
            <form onSubmit={handleSubmit}>
                <input type="tel" value={resetData.otp} onChange={(e) => setResetData(prev => ({...prev, otp: e.target.value}))} name='otp' placeholder='OTP' />
                <div className={styles.passVisible}>                                
                    <input value={resetData.new_password} onChange={(e) => setResetData(prev => ({...prev, new_password: e.target.value}))} type={isVisible ? "text" : "password"} placeholder='Password' />
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
                <button className="btn submit" /* disabled={loading} */>
                    send reset link
{/*                     {loading ? <ButtonLoader /> : "Send Reset Link"} */}
                </button>
            </form>
        </div>
    )
};
export default ResetPasswordComponent;