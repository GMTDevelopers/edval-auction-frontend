'use client'
import { useState } from 'react';
import Styles from '@/app/(components)/gallerySearch/galSearch.module.css'
import styles from './add.module.css';
import Select from 'react-select'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Theme from '@/app/data/theme.json';
import artType from '@/app/data/artType.json';
import category from '@/app/data/category.json';
import { useAuth } from '@/app/context/authContext';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
const AddNewArt = () => {
   const {user} = useAuth()

    const router = useRouter();

    const [formData, setformData] = useState({
        artist_id: user?.id || 0,
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
        quantity: '',
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
        const payload = {
            ...formData,
            medium: formData.artwork_type, // Copies the value over instantly
            dimensions: cleanDimensions,
            request_type: "gallery"
        };

        const result = await AddArtwork(payload);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("Artwork created successfully.");
            console.log('Artwork created successfully:', result);
            router.back()
        }  
    };
    return ( 
        <div>
            <div className={`container ${styles.overallContainer}`}>
                <div style={{display:"flex"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <h4>Add New Artwork</h4> </div>
                <form onSubmit={handleSubmit}>
                    <div className={` double`}>
                        <div className={`small`}>
                            <div className="galleryContainer">
                                {/* Main Large Image */}
                                    <div className={'mainImageContainer'}>
                                        <ImageUploader
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
                                <div className="thumbnailsContainer">
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
                            <div className="double">
                                <input value={formData.year_created} onChange={(e)=>setformData(prev=>({...prev, year_created:Number(e.target.value)}))} placeholder="Year created" type="tel" name="yearCreated" />  
                                <input value={formData.quantity} onChange={(e)=>setformData(prev=>({...prev, quantity:Number(e.target.value)}))} placeholder="Quantity" type="tel" name="quantity" />
                            </div>                            
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
                            <input value={formData.price} onChange={(e)=>setformData(prev=>({...prev, price:Number(e.target.value)}))}placeholder="Selling price" type="tel" name="sellPrice" />
                            <button className="btn submit">Submit request</button>
                        </div>            
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default AddNewArt;