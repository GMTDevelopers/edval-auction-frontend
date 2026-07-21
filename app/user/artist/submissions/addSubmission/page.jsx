'use client'
import { useState } from 'react';
import Styles from '@/app/(components)/gallerySearch/galSearch.module.css'
import styles from '../../myArtworks/addNewArt/add.module.css';
import Select from 'react-select'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
const AddSubmissions = () => {
    const data = {
        "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
        "img": "/images/auction/1.webp"
    }
    const Theme = [
        { value: 'Nature', label: 'Nature' },
        { value: 'Portraiture', label: 'Portraiture' },
        { value: 'Abstract', label: 'Abstract' },
        { value: 'Spirituality', label: 'Spirituality' },
        { value: 'Culture & Heritage', label: 'Culture & Heritage' },
        { value: 'Identity', label: 'Identity' },
        { value: 'Family & Relationships', label: 'Family & Relationships' },
        { value: 'Love', label: 'Love' },
        { value: 'History', label: 'History' },
        { value: 'Social Commentary', label: 'Social Commentary' },
        { value: 'Urban Life', label: 'Urban Life' },
        { value: 'Fantasy & Mythology', label: 'Fantasy & Mythology' },
        { value: 'Animals & Wildlife', label: 'Animals & Wildlife' },
        { value: 'Politics & Power', label: 'Politics & Power' },
        { value: 'Hope & Resilience', label: 'Hope & Resilience' },
    ]
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
   
    if (!data?.images?.length) {
        return <p>No images provided.</p>;
    }

    const [searchData, setSearchData] = useState({
        themes: [],
        artType: [],
    })

  
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            themes:searchData.themes.map((items)=>items.value),
            artType:searchData.artType.map((items)=>items.value)
        });
    };
    return ( 
        <div>
            <div className={`container ${styles.overallContainer}`}>
                <div style={{display:"flex"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <h4>Submit New Request</h4>  </div>
                <div className={`double`}>
                    <div className={`small`}>
                        <div className="galleryContainer">
                            {/* Main Large Image */}
                            <div className="mainImageContainer">
                                <img src={data.images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} className="mainImage" />
                            </div>

                            {/* Thumbnails */}
                            <div className="thumbnailsContainer">
                                {data.images.map((image, index) => (
                                    <div key={index} className={`thumbnailWrapper ${index === currentIndex ? "active" : '' }`} onClick={() => handleThumbnailClick(index)} >
                                        <img src={image} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="big">
                        <form action="">
                            <input placeholder="Artist / Studio name" type="text" name="artistName" id="" />
                            <div className='double'>
                                <select defaultValue="Artwork category" name="category">
                                    <option disabled>Artwork category</option>                 
                                    <option value="Delivery">
                                        kongo
                                    </option>                                
                                    <option value="Pickup">
                                        DRC
                                    </option>                                                              
                                </select>
                                <select defaultValue="Artwork type" name="type">
                                    <option disabled>Artwork type</option>                 
                                    <option value="Delivery">
                                        Address delivery
                                    </option>                                
                                    <option value="Pickup">
                                        Physical Pickup
                                    </option>                                                              
                                </select>
                            </div>
                            <textarea name="artDesc" placeholder="Artwork description"></textarea>
                            <Select value={searchData.themes} instanceId="gallery-search-select" isMulti placeholder="Theme" className={Styles.selectWrapper} classNamePrefix="select" options={Theme}
                                onChange={(selectedOptions) =>
                                    setSearchData((prev) => ({
                                    ...prev, 
                                    themes: selectedOptions || [],
                                    }))
                                }
                            />
                            
                            <div className="double">
                                <p>Dimensions (m):</p>
                                <input placeholder="Length" type="tel" name="length" required />
                                <input placeholder="Width" type="tel" name="width" required />
                                <input placeholder="Depth" type="tel" name="depth" required />
                            </div>
                            <input placeholder="Year created" type="date" name="yearCreated" />  
                            <div className='double'>
                                <select defaultValue="Frame?" name="frame">
                                    <option disabled>Frame?</option>                 
                                    <option value="yes">
                                       Yes
                                    </option>                                
                                    <option value="No">
                                        No
                                    </option>                                                              
                                </select>
                                <select defaultValue="ProofOfAuth?" name="auth">
                                    <option disabled>Proof of authenticity?</option>                 
                                    <option value="yes">
                                        Yes
                                    </option>                                
                                    <option value="no">
                                        No
                                    </option>                                                              
                                </select>
                            </div>
                            <input placeholder="Selling price" type="tel" name="sellPrice" />
                            <select defaultValue="Request type" name="reqType">
                                <option disabled>Request type</option>                 
                                <option value="Delivery">
                                    Address delivery
                                </option>                                
                                <option value="Pickup">
                                    Physical Pickup
                                </option>                                                              
                            </select>
                            <select defaultValue="Select Exhibition" name="exhibition">
                                <option disabled>Select Exhibition</option>                 
                                <option value="Delivery">
                                    Address delivery
                                </option>                                
                                <option value="Pickup">
                                    Physical Pickup
                                </option>                                                              
                            </select>

                            <button className="btn submit">Submit request</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default AddSubmissions;