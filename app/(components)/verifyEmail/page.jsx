'use client'
import { useState } from 'react';
import styles from '@/app/user/artist/myArtworks/addNewArt/add.module.css';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/authContext';
import { useModal } from '../ModalProvider/ModalProvider';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const VerifyEmailFunction = async (formData, id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/auth/verify-email`, { 
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
                data.error|| "Verify email function failed"
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

const VerifyEmailComponent = ({userEmail}) => {
    const {user} = useAuth();
    const router = useRouter();
   const { closeModal } = useModal();
    const [formData, setformData] = useState({
        email: user?.email || userEmail,
        otp: ''
    });

    console.log('user email', userEmail)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await VerifyEmailFunction(formData);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("email verified successfully.");
            console.log('email verified successfully:', result);
            setTimeout(() => {
                closeModal()
                router.push('/user/artist/myArtworks');
            }, 3000);
        }  
    };
    return ( 
        <div >
            <div className={styles.overallContainer}>
                <h2>Email Verification</h2> 
                <p>An otp has been sent to {user?.email || userEmail}</p>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="big">
                        <div>
                            <label htmlFor="quantity">OTP</label>
                            <input value={formData.otp} onChange={(e)=>setformData(prev=>({...prev, otp:e.target.value}))} placeholder="* * * * * *" type="tel" name="otp" />
                        </div>
                                            
                        <button className="btn submit">Verify Email</button>
                    </div>
                </form>    
            </div>
        </div>
    );
}
 
export default VerifyEmailComponent;