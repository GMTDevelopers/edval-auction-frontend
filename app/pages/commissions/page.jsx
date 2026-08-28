'use client';
import { useEffect, useState } from 'react';
import styles from './commission.module.css';
import { useAuth } from '@/app/context/authContext';
import countries from '@/app/data/countries.json';
import artType from '@/app/data/artType.json';
import ArtStyle from '@/app/data/artStyle.json';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CreateCommission = async (formData) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/commissions`, { 
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
                data.error|| "Create commission function failed"
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

const Commission = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState('');
    const [width, setWidth] = useState('')
    const [length, setLength] = useState('')
    const [depth, setDepth] = useState('')

    const [formData, setformData] = useState({
        additional_instructions: "",
        artist_id: 0,
        artwork_type: "",
        budget: '',
        country: user?.artist_profile?.country || "",
        deadline: "",
        description: "",
        dimensions: "",
        email: user?.email || "",
        first_name: user?.first_name || "",
        guest_country: "",
        guest_email: "",
        guest_first_name: "",
        guest_last_name: "",
        guest_location: "",
        guest_phone: "",
        guest_state: "",
        images: ['','','',''],
        intended_purpose: "",
        last_name: user?.last_name || "",
        location: "",
        medium: "",
        phone: user?.phone || "",
        preferred_artist_id: 0,
        preferred_style: "",
        state: "",
        title: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dimensionParts = [length, width, depth];

        // 2. Filter out any empty fields or strings, then join them with 'x'
        const cleanDimensions = dimensionParts
        .filter(part => part !== undefined && part !== null && part !== '')
        .join('x');
        const payload = {
            ...formData,
            medium: formData.artwork_type, // Copies the value over instantly
            dimensions: cleanDimensions,
          /*   request_type: "gallery" */
        };

        const result = await CreateCommission(payload);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("Commission submitted successfully.");
            console.log('Commission submitted successfully:', result);
            router.refresh()
        }  
    };
   useEffect( () => {
        if (!user) return;
        setformData(prev=> ({
            ...prev,
            state: user?.artist_profile?.state || "",
            country: user?.artist_profile?.country || "",
            email: user?.email || "",
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            phone: user?.phone || "",
        }));
    }, [user]);

    return ( 
        <div>
            <div className='headerCenter pageHeader'>
                <h1>Request Your Personalized Portrait or Custom Artwork</h1>
                <p>
                    Create custom portraits, paintings, memorial pieces, and expressive artworks made specifically around your story, space, or occasion.
                </p>
            </div>
            <div className="upcomingAuctions">
                <div className={`container double formDouble`}>
                    <div className="small">
                        <div className={styles.imgPack}>
                            <img src="/images/comission/comission.webp" alt="comission" />
                        </div>
                    </div>
                    <div className="big">
                        <h2>Fill the form below to request your personalized portrait commission.</h2>
                        <form onSubmit={handleSubmit}>
                            {user ? <div className="double">
                                <input placeholder="First name" onChange={(e)=>setformData(prev=>({...prev, first_name: e.target.value}))} value={formData?.first_name} type="text" name="firstName" required />
                                <input placeholder="Last name" onChange={(e)=>setformData(prev=>({...prev, last_name: e.target.value}))} value={formData?.last_name} type="text" name="lastName" required />
                            </div> :
                            <div className="double">
                                <input placeholder="First name" onChange={(e)=>setformData(prev=>({...prev, guest_first_name: e.target.value}))} value={formData?.guest_first_name} type="text" name="firstName" required />
                                <input placeholder="Last name" onChange={(e)=>setformData(prev=>({...prev, guest_last_name: e.target.value}))} value={formData?.guest_last_name} type="text" name="lastName" required />
                            </div>
                            }
                            {user ? <div className="double">
                                <input placeholder="Email address" onChange={(e)=>setformData(prev=>({...prev, email: e.target.value}))} value={formData?.email} type="email" name="email" required />
                                <input placeholder="Phone number" onChange={(e)=>setformData(prev=>({...prev, phone: e.target.value}))} value={formData?.phone} type="tel" name="phoneNum" required />
                            </div> : 
                            <div className="double">
                                <input placeholder="Email address" onChange={(e)=>setformData(prev=>({...prev, guest_email: e.target.value}))} value={formData?.guest_email} type="email" name="email" required />
                                <input placeholder="Phone number" onChange={(e)=>setformData(prev=>({...prev, guest_phone: e.target.value}))} value={formData?.guest_phone} type="tel" name="phoneNum" required />
                            </div>
                            }
                            <textarea onChange={(e)=>setformData(prev=>({...prev, location: e.target.value}))} value={formData?.location} name="location" placeholder="Location" />
                            <div className='double'>
                                {user ? <select value={formData?.country} onChange={(e)=>setformData(prev=>({...prev, country: e.target.value}))} id="country">
                                    <option value="Country">Country</option> 
                                    {(countries).map((country, index) => (
                                        <option key={index} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}                                                                             
                                </select>:
                                    <select value={formData?.guest_country} onChange={(e)=>setformData(prev=>({...prev, guest_country: e.target.value}))} id="country">
                                        <option value="Country">Country</option> 
                                        {(countries).map((country, index) => (
                                            <option key={index} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}                                                                             
                                    </select>
                                }
                                {user? <input placeholder="State" onChange={(e)=>setformData(prev=>({...prev, state: e.target.value}))} value={formData?.state} type="text" id="state" />
                                : <input placeholder="State" onChange={(e)=>setformData(prev=>({...prev, guest_state: e.target.value}))} value={formData?.guest_state} type="text" id="state" />
                                }
                            </div>
                            <select value={formData.artwork_type} onChange={(e)=>setformData(prev=>({...prev, artwork_type:e.target.value}))} name="type">
                                <option value="" disabled>
                                    Type of artwork requested
                                </option>
                                {artType.map((type, index) => (
                                    <option key={index} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}                                                               
                            </select>
                            <select placeholder="Preferred style" value={formData.preferred_style} onChange={(e)=>setformData(prev=>({...prev, preferred_style:e.target.value}))} name="preferredStyle">
                                <option>Preferred style</option>                 
                                {ArtStyle.map((type, index) => (
                                    <option key={index} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}                                                               
                            </select>
                            <textarea onChange={(e)=>setformData(prev=>({...prev, description: e.target.value}))} value={formData?.description} name="description" placeholder="Describe the artwork. Be as detailed and specific as possible."></textarea>
                            <input onChange={(e)=>setformData(prev=>({...prev, intended_purpose: e.target.value}))} value={formData?.intended_purpose} placeholder="Intended Purpose" type="text" name="IntendedPurpose" id="" />
                            <div className="double">
                                <p>Dimensions (m):</p>
                                <input value={length} onChange={(e)=>setLength(Number(e.target.value))} placeholder="Length" type="tel" name="length" required />
                                <input value={width} onChange={(e)=>setWidth(Number(e.target.value))} placeholder="Width" type="tel" name="width" required />
                                <input value={depth} onChange={(e)=>setDepth(Number(e.target.value))} placeholder="Depth" type="tel" name="depth" />
                            </div>                            
                            <input value={formData.budget} inputMode="decimal" onChange={(e)=>{
                                const value = e.target.value; 
                                if (/^\d*(\.\d{0,2})?$/.test(value)) {
                                    setformData(prev=>({...prev, 
                                    budget:Number(value)}))
                                
                                }
                            }} placeholder="Budget (₦ 0.00)" type="number" name="sellPrice" />
                            <div className='double'>
                                <label htmlFor="">Deadline</label>
                                <input value={formData.deadline} onChange={(e)=>setformData(prev=>({...prev, deadline: new Date(e.target.value)}))} placeholder="Preferred deadline" type="date" name="deadline" />
                            </div>
                            <div className={`thumbnailsContainer`}>
                                {[0,1,2,3]?.map(index => (
                                    <ImageUploader
                                        key={index}
                                        value={formData?.images[index] || ""}
                                        placeholder={`Reference image`}
                                        onUpload={(url) => {
                                            const media = [...formData.images];
                                            media[index] = url;
                                            setformData(prev => ({
                                                ...prev,
                                                images: media
                                            }));
                                        }}
                                    />
                                ))}
                            </div>
                            {/* <div className="checkboxPack">
                                <input 
                                    type="checkbox"
                                    name="agree"
                                    checked={isAgreed}
                                    onChange={(e) => {setIsAgreed(e.target.checked); setError('')}}
                                />
                                <div className="checkboxTxt">
                                    <p>Request for a specific artist?</p>
                                </div>                                
                            </div>
                            {
                                isAgreed && <select defaultValue="Select artist" name="artist">
                                <option disabled>Select artist</option>                 
                                <option value="oil">
                                    oil
                                </option>                                
                                <option value="oil">
                                    oil
                                </option>                                                              
                            </select>
                            }
                            {
                                isAgreed && <textarea name="instructions" placeholder="Additional instructions"></textarea>
                            } */}
                            <button type='submit' className='submit btn'>Submit request</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Commission;