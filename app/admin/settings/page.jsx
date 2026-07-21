'use client';
import { Eye, EyeOff, Plus } from 'lucide-react';
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from './settings.module.css';
import { useState } from 'react';
import AdminAccountTable from '@/app/(components)/tables/AdminAccountTable';
import CreateNewAdmin from './newAdmin';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
const Setting = () => {
    const { openModal } = useModal();
    const [activeTab, setActiveTab] = useState('GeneralSettings');
    const tabs = [
        { key: 'GeneralSettings', label: 'General settings' },
        { key: 'AdminAccounts', label: 'Admin accounts' }
    ];
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toggleVisibility = () => setIsVisible((prev) => !prev);
    const renderContent = () => {
        switch (activeTab) {
            case 'GeneralSettings':
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
        <div style={{paddingTop:"0px"}} className={`${styles.container}`}>
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
        <div className='container'>{renderContent()}</div>
    </div>
    );
}
 
export default Setting;