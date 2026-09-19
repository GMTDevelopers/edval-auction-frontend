'use client';
import { toast } from 'sonner';
import { useState } from 'react';
import { useModal } from '../(components)/ModalProvider/ModalProvider';
import ResetPasswordComponent from '../(components)/resetPassword/page';
import styles from './forgotPassword.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ForgotPassword = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/forgot-password`, { 
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
const ForgotPasswordPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
    });
    const { openModal } = useModal();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await ForgotPassword(loginData);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if (result.success) {
            console.log('Forgot Password successfull:', result);
            
            openModal(<ResetPasswordComponent userEmail={loginData.email} />);
        }
    };
  return (
        <div className={styles.forgotPasswordContainer}>
            
            <div className='container'>
                <h2>Forgot Password Page</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={loginData.email} onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))} name='email' placeholder='Email address' />
                    
                    <button className="btn submit" /* disabled={loading} */>
                        send reset link
                    </button>
                </form>
            </div>
        </div>
    )
};
export default ForgotPasswordPage