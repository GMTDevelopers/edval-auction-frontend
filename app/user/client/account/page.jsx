'use client'
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from'./account.module.css'
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
import { useAuth } from '@/app/context/authContext';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditProfileFunction = async (formData) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/users/me`, { 
        method: "PUT",
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
                data.error|| "Edit user function failed"
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
const Account = () => {
    const { user } = useAuth();
    
    const [formData, setformData] = useState({
        phone:  "",
        profile_image_url:  "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
        };

        const result = await EditProfileFunction(payload);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("Profile updated successfully.");
            console.log('Profile updated successfully:', result);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }  
    };

    useEffect( () => {
        if (!user) return;
        setformData({
            phone: user?.phone || "",
            profile_image_url: user?.profile_image_url,
        });
    }, [user]);

    return ( 
        <div>
            <div className="upcomingAuctions">
                <div className={`container double`}>
                    <div className="small">
                        <div className={Styles.imgPack}>
                            <ImageUploader
                                className="mainImageContainer"
                                value={formData.profile_image_url || "/images/comission/comission.webp" }
                                placeholder={`Add Image`}
                                onUpload={(url) => {
                                    const media = url;                                   
                                    setformData(prev => ({
                                        ...prev,
                                        profile_image_url: media
                                    }));
                                }}
                            />
                        </div>
                    </div>
                    <div className="big">
                        <h2>Fill the form below to request your personalized portrait commission.</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="double">
                                <input value={user?.first_name} disabled placeholder="First name" type="text" name="firstName"/>
                                <input value={user?.last_name} disabled placeholder="Last name" type="text" name="lastName"/>
                            </div>
                            
                            <input value={user?.email} disabled placeholder="Email address" type="email" name="email"/>
                            <input value={formData.phone} onChange={(e)=>setformData(prev=>({...prev, phone: e.target.value}))} placeholder="Phone number" type="tel" name="phoneNum"/>                            
                            <button type='submit' className='submit btn'>Save changes</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Account;