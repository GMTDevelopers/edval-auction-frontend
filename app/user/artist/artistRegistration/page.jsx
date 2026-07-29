'use client';
import { useState } from 'react';
import styles from './artistReg.module.css';
import { toast } from 'sonner';
import countries from '@/app/data/countries.json'
import artType from "@/app/data/artType.json";
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CreateArtist = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register/artist`, { 
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
                data.error|| "Create Artist function failed"
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

const ArtistRegistration  = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const toggleVisibility = () => setIsVisible((prev) => !prev);
    const {setIsAuthenticated} = useAuth();
    const [formData, setformData] = useState({
        account_number: "",
        address: "",
        artistic_style: "",
        bank_name: "",
        bio: "",
        country: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone: "",
        portfolio_url: "",
        state: "",
        studio_name: "",
        years_of_experience: 0
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await CreateArtist(formData);
        console.log('handle submit result', result)
        if(!result.success){
            toast.error(result.err.message);
            if(result.err.details){
                result.err.details?.password && toast.error(result.err.details?.password);
                result.err.details?.studio_name && toast.error(result.err.details?.studio_name);
            }
        }
        if(result.success){
            localStorage.setItem(
                "access_token",
                result.data.data.access_token
            );

            localStorage.setItem(
                "refresh_token",
                result.data.data.refresh_token
            );
            toast.success("Artist created successfully.");
            console.log('Artist created successfully:', result.data.data);
            setIsAuthenticated(true);
            setTimeout(() => {
                router.push('/user/artist/myArtworks');
                window.location.reload();
            }, 5000);
        }         
    }
    return ( 
        <div>
            <div className='headerCenter pageHeader'>
                <h1>Artist Registration</h1>
                <p>
                    Fill the form below to register as an artist on Edval Art Auction to be able to submit your artworks. 
                </p>
            </div>
            <div className={styles.banner}>
                <img src="/images/artistReg.webp" alt="banner" />
            </div>
            <div className={styles.regForm}>
                <div className={styles.regContainer}>
                    <h2>Artist Request Form</h2>
                    <form onSubmit={handleSubmit}>
                        <section className={styles.section}>
                            <p>SECTION A: <span>PERSONAL INFORMATION</span></p>
                            <div className="double">
                                <input value={formData.first_name} onChange={(e)=>setformData(prev=>({...prev, first_name:e.target.value}))} placeholder="First name" type="text" name="firstName" required />
                                <input value={formData.last_name} onChange={(e)=>setformData(prev=>({...prev, last_name:e.target.value}))} placeholder="Last name" type="text" name="lastName" required />
                            </div>
                            <input value={formData.email} onChange={(e)=>setformData(prev=>({...prev, email:e.target.value}))} placeholder="Email address" type="email" name="email" required />
                            <div className="passVisible">                                
                                <input value={formData.password} onChange={(e) => setformData(prev => ({...prev, password: e.target.value}))} type={isVisible ? "text" : "password"} placeholder='Password' required />
                                <span type="button" onClick={toggleVisibility} className="visibility" aria-label={isVisible ? "Hide password" : "Show password"} >
                                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            <input value={formData.phone} onChange={(e)=>setformData(prev=>({...prev, phone:e.target.value}))} placeholder="Phone number" type="tel" name="phoneNum" required />
                            <textarea value={formData.address} onChange={(e)=>setformData(prev=>({...prev, address:e.target.value}))} name="address" placeholder="Address" />
                            <div className='double'>
                                <select value={formData.country} onChange={(e)=>setformData(prev=>({...prev, country:e.target.value}))} name="country">
                                    <option value="Country">Country</option> 
                                    {(countries).map((country, index) => (
                                        <option key={index} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}                                                                             
                                </select>
                                <input value={formData.state} onChange={(e)=>setformData(prev=>({...prev, state:e.target.value}))} placeholder="State/City (optional)" type="text" name="state" />
                            </div>
                        </section>

                        <section className={styles.section}>
                            <p>SECTION B: <span>ARTIST INFORMATION</span></p>
                            <div className='double'>
                                <select value={formData.artistic_style} onChange={(e)=>setformData(prev=>({...prev, artistic_style:e.target.value}))} name="artisticStyle">
                                    <option value='Artistic style' >Artistic style</option>                 
                                    {(artType).map((type, index) => (
                                        <option key={index} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}                                                              
                                </select>
                                <select onChange={(e)=>setformData(prev=>({...prev, years_of_experience:Number(e.target.value)}))} value={formData.years_of_experience}  name="YearsOfExperience">
                                    <option value="Years of experience"> Years of experience</option>                 
                                    <option value={1}>
                                        1 year
                                    </option>                                
                                    <option value={2}>
                                        2 years
                                    </option>                                
                                    <option value={3}>
                                        3 years
                                    </option>                                
                                    <option value={4}>
                                        4 years
                                    </option>                                
                                    <option value={5}>
                                        5 years
                                    </option>                                
                                    <option value={6}>
                                        6 years
                                    </option>                                
                                    <option value={7}>
                                        7+ years
                                    </option>                                
                                                                                              
                                </select>
                            </div>
                            <input value={formData.portfolio_url} onChange={(e)=>setformData(prev=>({...prev, portfolio_url:e.target.value}))} placeholder="Portfolio link (optional)" type="url" name="portfolioLink" />
                            <input value={formData.studio_name} onChange={(e)=>setformData(prev=>({...prev, studio_name:e.target.value}))} placeholder="Studio Name" type="text" required  />
                            <textarea value={formData.bio} onChange={(e)=>setformData(prev=>({...prev, bio:e.target.value}))} name="artistBio" placeholder="Artist bio" required/>
                        </section>
                        <section className={styles.section}>
                            <p>SECTION C: <span>BANK INFORMATION</span></p>
                            <input value={formData.bank_name} onChange={(e)=>setformData(prev=>({...prev, bank_name:e.target.value}))} placeholder="Bank name" type="text" name="bankName" required/>
                            <input value={formData.account_number} onChange={(e)=>setformData(prev=>({...prev, account_number:e.target.value}))} placeholder="Account number" type="tel" name="accountNumber" required/>
                        </section>
                        <section className={styles.section}>
                            <div className="checkboxPack">
                                <input 
                                    type="checkbox"
                                    name="agree"
                                    checked={isAgreed}
                                    onChange={(e) => {setIsAgreed(e.target.checked); setError('')}}
                                />
                                <div className="checkboxTxt">
                                    <p>I agree to the Terms and Conditions</p>
                                </div>                                
                            </div>
                        </section>
                        <button disabled={!isAgreed} style={{background:!isAgreed?"#E0E0E0":"", cursor:!isAgreed?"not-allowed":""}} className="btn submit">Create my account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default ArtistRegistration;