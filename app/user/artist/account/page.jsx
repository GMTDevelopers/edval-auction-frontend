'use client'
import styles from '@/app/(components)/tab/tabs.module.css';
import Styles from'./account.module.css'
import { Eye, EyeOff } from 'lucide-react';
import countries from '@/app/data/countries.json'
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/authContext';
import { toast } from 'sonner';
import Select from 'react-select';
import ArtStyle from '@/app/data/artStyle.json';
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

const Account =  () => {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");
    const toggleVisibility = () => setIsVisible((prev) => !prev);

    
    const [formData, setformData] = useState({
        account_number:"",
        address:"",
        artistic_style: [''],
        bank_name:  "",
        bio: "",
        country: "",
        first_name:  "",
        last_name:  "",
        phone:  "",
        portfolio_url: "",
        profile_image_url:  "",
        state:  "",
        studio_name: "",
        years_of_experience:  0
    });
  
    useEffect(() => {
        if (!user) return;

        setformData({
            account_number: user?.artist_profile?.account_number || "",
            address: user?.artist_profile?.address || "",
            artistic_style: user?.artist_profile?.artistic_style || [''],
            bank_name: user?.artist_profile?.bank_name || "",
            bio: user?.artist_profile?.bio || "",
            country: user?.artist_profile?.country || "",
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            phone: user?.phone || "",
            portfolio_url: user?.artist_profile?.portfolio_url || "",
            profile_image_url: user?.artist_profile?.profile_image_url || "",
            state: user?.artist_profile?.state || "",
            studio_name: user?.artist_profile?.studio_name || "",
            years_of_experience: user?.artist_profile?.years_of_experience || ""
        });
    }, [user]);

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
           /* if(result.err.details){
                result.err.details?.password && toast.error(result.err.details?.password);
                result.err.details?.studio_name && toast.error(result.err.details?.studio_name);
            } */
        }
        if(result.success){
            toast.success("Profile updated successfully.");
            console.log('Profile updated successfully:', result);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }  
    };

    return ( 
        <div>
            <div className="upcomingAuctions">
                
                <div style={{ alignItems:"start" }} className={`container double`}>
                    <div className="small">
                        <div className={Styles.imgPack}>
                            <img src="/images/comission/comission.webp" alt="comission" />
                        </div>
                        <button type='submit' className='submit btn'>Upload Profile Photo</button>
                    </div>
                    <div className="big">
                        <form onSubmit={handleSubmit}>
                            <div className="double">
                                <div>
                                    <label htmlFor="firstName">First name</label>
                                    <input placeholder="First name" onChange={(e)=>setformData(prev=>({...prev, first_name: e.target.value}))} value={formData?.first_name} type="text" id="firstName" />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last name</label>
                                    <input placeholder="Last name" onChange={(e)=>setformData(prev=>({...prev, last_name: e.target.value}))} value={formData?.last_name} type="text" id="lastName" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="studioName">Studio name</label>
                                <input placeholder="Studio name" onChange={(e)=>setformData(prev=>({...prev, studio_name: e.target.value}))} value={formData?.studio_name} type="text" id="studioName" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input placeholder="Email address"  defaultValue={user?.email||''} type="email" id="email" disabled />
                            </div>
                            <div>
                                <label htmlFor="phoneNum">Phone number</label>
                                <input placeholder="Phone number" onChange={(e)=>setformData(prev=>({...prev, phone: e.target.value}))} value={formData?.phone} type="tel" id="phoneNum" />
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <textarea id="address" placeholder="address" onChange={(e)=>setformData(prev=>({...prev, address: e.target.value}))} style={{ height: "83px" }} value={formData?.address}></textarea>
                            </div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <select value={formData?.country} onChange={(e)=>setformData(prev=>({...prev, country: e.target.value}))} id="country">
                                    <option value="Country">Country</option> 
                                    {(countries).map((country, index) => (
                                        <option key={index} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}                                                                             
                                </select>
                            </div>
                            <div>
                                <label htmlFor="state">State</label>
                                <input placeholder="State" onChange={(e)=>setformData(prev=>({...prev, state: e.target.value}))} value={formData?.state} type="text" id="state" />
                            </div>
                            <div>
                                <label htmlFor="city">Artistic Style</label>
                                <Select value={ArtStyle.filter(option => formData.artistic_style.includes(option.value))} instanceId="add-artwork-select" isMulti placeholder="Artistic Style" className={Styles.selectWrapper} classNamePrefix="select" options={ArtStyle}
                                    onChange={(selectedOptions) =>
                                        setformData(prev => ({
                                            ...prev,
                                            artistic_style: selectedOptions
                                                ? selectedOptions.map(option => option.value)
                                                : "",
                                        }))
                                    }
                                /> 
                            </div>
                            <div>
                                <label htmlFor="experience">Years of Experience</label>
                                <input placeholder="Years of Experience" onChange={(e)=>setformData(prev=>({...prev, years_of_experience: e.target.value}))} value={formData?.years_of_experience} type="text" id="experience" />
                            </div>
                            <div>
                                <label htmlFor="portfolio">Portfolio link</label>
                                <input placeholder="Portfolio link" onChange={(e)=>setformData(prev=>({...prev, portfolio_url: e.target.value}))} value={formData?.portfolio_url} type="url" id="portfolio" />
                            </div>
                            <div>
                                <label htmlFor="bio">Bio</label>
                                <textarea name="bio" placeholder="Bio" onChange={(e)=>setformData(prev=>({...prev, bio: e.target.value}))} value={formData?.bio} id="bio"></textarea>
                            </div>
                            <div>
                                <label htmlFor="accountNumber">Account number</label>
                                <input placeholder="Account Number" onChange={(e)=>setformData(prev=>({...prev, account_number: e.target.value}))} value={formData?.account_number} type="tel" id="accountNumber" />
                            </div>
                            <div>
                                <label htmlFor="bankName">Bank name</label>
                                <input placeholder="Bank name" onChange={(e)=>setformData(prev=>({...prev, bank_name: e.target.value}))} value={formData?.bank_name} type="text" id="bankName" />
                            </div>
                            {/* <div className={styles.passVisible}>
                                <input value={password}  onChange={(e) => setPassword(e.target.value)} type={isVisible ? "text" : "password"} placeholder='Password' />
                                <span type="button" onClick={toggleVisibility} className={styles.visibility} aria-label={isVisible ? "Hide password" : "Show password"} >
                                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div> */}
                            
                            <button type='submit' className='submit btn'>Save changes</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Account;