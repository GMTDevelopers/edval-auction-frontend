'use client'
import { useState } from 'react';
import Styles from '@/app/(components)/gallerySearch/galSearch.module.css'
import styles from '@/app/user/artist/myArtworks/addNewArt/add.module.css';
import Select from 'react-select'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Theme from '@/app/data/theme.json';
import artType from '@/app/data/artType.json';
import category from '@/app/data/category.json';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditArtworkFunction = async (formData, id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/artworks/${id}`, { 
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
                data.error|| "Edit Artwork function failed"
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

const EditArtwork = ({lot}) => {

    const router = useRouter();
   
    const [formData, setformData] = useState({
        artwork_type: lot.artwork_type || "",
        category: lot.category || "",
        depth: lot.depth || '',
        description: lot.description || "",
        dimensions: lot.dimensions || "",
        exhibition_id: lot.exhibition_id || 0,
        framed: lot.framed || false,
        length: lot.length || '',
        medium: "",
        price: lot.price || "0.00",
        proof_of_authenticity: lot.proof_of_authenticity || false,
        quantity: lot.quantity || "",
        request_type: lot.request_type || "",
        themes: [lot.themes] || [""],
        title: lot.title || "",
        width: lot.width || '',
        year_created: lot.year_created || ''
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
        };

        const result = await EditArtworkFunction(payload, lot.id);
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
            toast.success("Artwork edited successfully.");
            console.log('Artwork edited successfully:', result);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }  
    };
    return ( 
        <div className={styles.editContainer}>
            <div className={`container ${styles.overallContainer}`}>
                <div style={{display:"flex"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <h4>Edit Artwork</h4> </div>
                <form onSubmit={handleSubmit}>
                    <div className="big">
                        <div>   
                            <label htmlFor="title">Artwork Title</label>  
                            <input value={formData.title} onChange={(e)=>setformData(prev=>({...prev, title: e.target.value}))} placeholder="Artwork name" type="text" name="artworkName" id="" />
                        </div>
                        <div className='double'>
                            <div>
                                <label htmlFor="category">Artwork category</label>   
                                <select value={formData.category} onChange={(e)=>setformData(prev=>({...prev, category:e.target.value}))} name="category">
                                    <option value="">Artwork category</option>                 
                                    {category.map((type, index) => (
                                        <option key={index} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}                                                                  
                                </select>
                            </div>
                            <div>
                                <label htmlFor="artworkType">Artwork Type</label>                           
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
                        </div>
                        <div>
                            <label htmlFor="artDesc">Artwork Description</label>
                            <textarea value={formData.description} onChange={(e)=>setformData(prev=>({...prev, description: e.target.value}))} name="artDesc" placeholder="Artwork description"></textarea>
                        </div>
                        <div>
                            <label htmlFor="themes">Themes</label>                        
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
                        </div>                        
                        <div className="double">
                            <p>Dimensions (cm):</p>
                            <div>
                                <label htmlFor="length">Length</label>
                                <input value={formData.length} onChange={(e)=>setformData(prev=>({...prev, length: Number(e.target.value)}))} placeholder="Length" type="tel" name="length"/>
                            </div>
                            <div>
                                <label htmlFor="width">Width</label>
                                <input value={formData.width} onChange={(e)=>setformData(prev=>({...prev, width: Number(e.target.value)}))} placeholder="Width" type="tel" name="width"/>
                            </div>
                            <div>
                                <label htmlFor="depth">Depth</label>
                                <input value={formData.depth} onChange={(e)=>setformData(prev=>({...prev, depth: Number(e.target.value)}))} placeholder="Depth" type="tel" name="depth"/>
                            </div>
                        </div>
                        <div className="double">
                            <div>
                                <label htmlFor="yearCreated">Year created</label>
                                <input value={formData.year_created} onChange={(e)=>setformData(prev=>({...prev, year_created:Number(e.target.value)}))} placeholder="Year created" type="tel" name="yearCreated" />  
                            </div>
                            <div>
                                <label htmlFor="quantity">Quantity</label>
                                <input value={formData.quantity} onChange={(e)=>setformData(prev=>({...prev, quantity:Number(e.target.value)}))} placeholder="Quantity" type="tel" name="quantity" />
                            </div>
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
                        <div>
                            <label htmlFor="price">Price</label>
                            <input value={formData.price} onChange={(e)=>setformData(prev=>({...prev, price:Number(e.target.value)}))} min="0.00" step="0.01" type="number" name="sellPrice" />
                        </div>                        
                        <button className="btn submit">Edit Artwork</button>
                    </div>
                </form>    
            </div>
        </div>
    );
}
 
export default EditArtwork;