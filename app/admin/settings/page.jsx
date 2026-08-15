'use client';
import { useAuth } from '@/app/context/authContext';
import { Plus } from 'lucide-react';
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from './settings.module.css';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import AdminAccountTable from '@/app/(components)/tables/AdminAccountTable';
import CreateNewAdmin from './newAdmin';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import Loader from '@/app/(components)/loader/loader';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetAdminUsers = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/users?role='admin`, { 
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "failed to get Admin"
            )
        }
        console.log(data)
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
const Setting = () => {
    const { user } = useAuth();
    const { openModal } = useModal();
    const [activeTab, setActiveTab] = useState('GeneralSettings');
    const tabs = [
        { key: 'GeneralSettings', label: 'General settings' },
        { key: 'AdminAccounts', label: 'Admin accounts' }
    ];
    const [loading, setLoading] = useState(true);
    const [adminAccts, setAdminAccts] = useState([]);
    const [activeAdmin, setActiveAdmin] = useState({
        first_name:  "",
        last_name:  "",
        phone:  "",
        profile_image_url:  "",

    });

    useEffect(() => {
        const getinitUser = async () => {
            const initUser = await user
            setActiveAdmin(initUser);
            setLoading(false);
            console.log('this init admin', initUser)
        }
        const getUsers = async () => {
            const admins = await GetAdminUsers()
            setAdminAccts(admins?.data || [])
            setLoading(false);
            console.log('this are the admins', admins?.data)
        }
        getinitUser()
        getUsers()
        console.log(activeTab)
    }, [activeTab]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...activeAdmin,
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


    const renderContent = () => {
        switch (activeTab) {
            case 'GeneralSettings':
                return (
                    <div>
                        <div className="upcomingAuctions">
                            <form onSubmit={handleSubmit}>
                                <div className={`container double`}>
                                    <div className="small">
                                        <div className={Styles.imgPack}>
                                            <ImageUploader
                                                className="mainImageContainer"
                                                value={activeAdmin?.profile_image_url || "/images/comission/comission.webp"}
                                                placeholder={`Add Image`}
                                                onUpload={(url) => {
                                                    const media = activeAdmin.profile_image_url;
                                                    setActiveAdmin(prev => ({
                                                        ...prev,
                                                        profile_image_url: media
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="big">                                    
                                        <div className="double">
                                            <input value={activeAdmin?.first_name} onChange={(e)=>setActiveAdmin(prev=>({...prev, first_name: e.target.value}))} placeholder="First name" type="text" name="firstName"/>
                                            <input value={activeAdmin?.last_name} onChange={(e)=>setActiveAdmin(prev=>({...prev, last_name: e.target.value}))} placeholder="Last name" type="text" name="lastName"/>
                                        </div>
                                        
                                        <input value={activeAdmin?.email} onChange={(e)=>setActiveAdmin(prev=>({...prev, email: e.target.value}))} placeholder="Email address" type="email" name="email"/>
                                        <input value={activeAdmin?.phone} onChange={(e)=>setActiveAdmin(prev=>({...prev, phone: e.target.value}))} placeholder="Phone number" type="tel" name="phoneNum"/>
                                        
                                        <button type='submit' className='submit btn'>Save changes</button>                                        
                                    </div>                                    
                                </div>
                            </form>
                        </div>
                    </div>
                )

            case 'AdminAccounts':
                return ( 
                    <div>
                        <div  style={{justifyContent:"flex-end", marginBottom:"12px"}}   className="double">
                            <div onClick={()=>openModal(<CreateNewAdmin />)} style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className="btn"> <Plus /> Create new admin account</div>

                        </div>

                        <AdminAccountTable />
                    </div>
                     
                );

        default:
            return null;
        }
    };
    return (  
        <div style={{paddingTop:"0px"}} /* className={`${styles.container}`} */>
            {/* Pill Tabs */}
            
            <div className={`double ${styles.tabBar}`}>
                {tabs.map((tab) => (
                <div
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`btn ${styles.tab} ${
                    activeTab === tab.key ? styles.active : ''
                    }`}
                >
                    {tab.label}
                </div>
                ))}
            </div>

        {/* Content */}
        {loading? <Loader /> : <div className='container'>{renderContent()}</div>}
    </div>
    );
}
 
export default Setting;