'use client'
import { useEffect, useState } from 'react';
import Styles from '@/app/(components)/gallerySearch/galSearch.module.css'
import styles from '../../myArtworks/addNewArt/add.module.css';
import Select from 'react-select'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Theme from '@/app/data/theme.json';
import artType from '@/app/data/artType.json';
import category from '@/app/data/category.json';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
import { useAuth } from '@/app/context/authContext';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetExhibition = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/exhibitions?status=active,upcoming`, { 
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
                data.error|| "failed to get Commissions"
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
const AddArtwork = async (formData) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/artworks`, { 
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
                data.error|| "Create Artwork function failed"
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

const AddSubmissions = () => {
    const [exhibitions, setExhibitions] = useState([]);
    useEffect(() => {
        const fetchExhibitions = async () => {
            const result = await GetExhibition();
            if (result.success) {
                setExhibitions(result.data || {"data": [{
                    id: 0,
                    title: "No exhibitions available",
                }]});
            } else {
                setExhibitions({"data": [{
                    id: 0,
                    title: "No exhibitions available",
                }]});
                console.error('Failed to fetch exhibitions:', result.err);
            }
        };

        fetchExhibitions();
    }, []);

    const {user} = useAuth()
    const router = useRouter();
    const [formData, setformData] = useState({
        artist_id: 0,
        artwork_type: "",
        category: "",
        depth: '',
        description: "",
        dimensions: "",
        exhibition_id: 0,
        framed: true,
        image_urls: [""],
        is_unlisted: true,
        length: '',
        medium: "",
        price: '',
        proof_of_authenticity: true,
        quantity: 1,
        request_type: "",
        themes: ["" ],
        title: "",
        width: '',
        year_created: ''
    });
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dimensionParts = [formData.length, formData.width, formData.depth];

        // 2. Filter out any empty fields or strings, then join them with 'x'
        const cleanDimensions = dimensionParts
        .filter(part => part !== undefined && part !== null && part !== '')
        .join('x');
        if (user?.id){
            const payload = {
                ...formData,
                artist_id: user?.id,
                medium: formData.artwork_type, // Copies the value over instantly
                dimensions: cleanDimensions,
            };
        

            const result = await AddArtwork(payload);
            console.log('handle submit result', result)
            if(!result.success){
                toast.error(result.err.message);
                console.log(result)
            }
            if(result.success){
                toast.success("Artwork created successfully.");
                console.log('Artwork created successfully:', result);
                setTimeout(() => {
                    router.push('/user/artist/submissions');
                }, 2000);
            }  
        }
    };

    return (         
        <div className={`container ${styles.overallContainer}`}>
            <div style={{display:"flex"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <h4>Submit New Request</h4>  </div>
            <form onSubmit={handleSubmit}>
                <div className={`double`}>
                    <div className={`small`}>
                        <div className={`galleryContainer ${styles.galleryContainer}`}>
                            {/* Main Large Image */}
                            <div className={styles.bigImageContainer}>
                                <ImageUploader
                                    className="mainImageContainer"
                                    value={formData.image_urls[0]}
                                    placeholder={`Add Image`}
                                    onUpload={(url) => {
                                        const media = [...formData.image_urls];
                                        media[0] = url;
                                        setformData(prev => ({
                                            ...prev,
                                            image_urls: media
                                        }));
                                    }}
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className={`thumbnailsContainer ${styles.thumbnailsContainer}`}>
                                {[1,2,3,4].map(index => (
                                    <ImageUploader
                                        key={index}
                                        value={formData.image_urls[index]}
                                        placeholder={`Add Image`}
                                        onUpload={(url) => {
                                            const media = [...formData.image_urls];
                                            media[index] = url;
                                            setformData(prev => ({
                                                ...prev,
                                                image_urls: media
                                            }));
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="big">
                        <input value={formData.title} onChange={(e)=>setformData(prev=>({...prev, title: e.target.value}))} placeholder="Artwork name" type="text" name="artworkName" id="" />
                        <div className='double'>
                            <select value={formData.category} onChange={(e)=>setformData(prev=>({...prev, category:e.target.value}))} name="category">
                                <option value="">Artwork category</option>                 
                                {category.map((type, index) => (
                                    <option key={index} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}                                                                  
                            </select>
                            <select value={formData.artwork_type} onChange={(e)=>setformData(prev=>({...prev, artwork_type:e.target.value}))} name="type">
                                <option value="" disabled>
                                    Select artwork type
                                </option>
                                {artType.map((type, index) => (
                                    <option key={index} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}                                                               
                            </select>
                        </div>
                        <textarea value={formData.description} onChange={(e)=>setformData(prev=>({...prev, description: e.target.value}))} name="artDesc" placeholder="Artwork description"></textarea>
                        <Select value={Theme.filter(option => formData.themes.includes(option.value))} instanceId="add-artwork-select" isMulti placeholder="Theme" className={Styles.selectWrapper} classNamePrefix="select" options={Theme}
                            onChange={(selectedOptions) =>
                                setformData(prev => ({
                                    ...prev,
                                    themes: selectedOptions
                                        ? selectedOptions.map(option => option.value)
                                        : "",
                                }))
                            }
                        />                         
                        <div className="double">
                            <p>Dimensions (m):</p>
                            <input value={formData.length} onChange={(e)=>setformData(prev=>({...prev, length: Number(e.target.value)}))} placeholder="Length" type="tel" name="length" required />
                            <input value={formData.width} onChange={(e)=>setformData(prev=>({...prev, width: Number(e.target.value)}))} placeholder="Width" type="tel" name="width" required />
                            <input value={formData.depth} onChange={(e)=>setformData(prev=>({...prev, depth: Number(e.target.value)}))} placeholder="Depth" type="tel" name="depth" required />
                        </div>
                        <input value={formData.year_created} onChange={(e)=>setformData(prev=>({...prev, year_created:Number(e.target.value)}))} placeholder="Year created" type="tel" name="yearCreated" />   
                        <div className='double'>
                            <div>
                                <label htmlFor="">Frame?</label>
                                <select value={formData.framed} onChange={(e)=>setformData(prev=>({...prev, framed:e.target.value}))} name="frame">
                                    <option value="" disabled>Frame?</option>                 
                                    <option value="true">
                                    Yes
                                    </option>                                
                                    <option value="false">
                                        No
                                    </option>                                                              
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Proof of authenticity?</label>                             
                                <select value={formData.proof_of_authenticity} onChange={(e)=>setformData(prev=>({...prev, proof_of_authenticity:e.target.value}))} name="auth">
                                    <option value="" disabled>Proof of authenticity?</option>                 
                                    <option value="true">
                                        Yes
                                    </option>                                
                                    <option value="false">
                                        No
                                    </option>                                                              
                                </select>
                            </div>
                        </div>
                        <input value={formData.price} onChange={(e)=>setformData(prev=>({...prev, price:Number(e.target.value)}))} placeholder="Selling price (If Applicable)" type="tel" name="sellPrice" />
                        <select value={formData.request_type} onChange={(e)=>setformData(prev=>({...prev, request_type:e.target.value}))} name="reqType">
                            <option >Request type</option>                 
                            <option value="Exhibition">
                                Exhibition
                            </option>                                
                            <option value="Auction">
                                Auction sale
                            </option>                                                              
                        </select>
                        <select value={formData.exhibition_id} onChange={(e)=>setformData(prev=>({...prev, exhibition_id:Number(e.target.value)}))} name="exhibition">
                            <option >Select Exhibition</option>
                            {exhibitions?.data?.map((exhibition, index) => (
                                <option key={index} value={exhibition.id}>
                                    {exhibition.title}
                                </option>
                            ))}                                                            
                        </select>
                        <button className="btn submit">Submit for review</button>                                
                    </div>
                    
                </div>
            </form>   
        </div>
        
    );
}
 
export default AddSubmissions;