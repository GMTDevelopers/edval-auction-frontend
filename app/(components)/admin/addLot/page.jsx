'use client'
import Select from 'react-select'
import styles from './addLot.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
import altStyles from '@/app/(components)/gallerySearch/galSearch.module.css'
import { useState } from 'react';
import { toast } from 'sonner';
import ImageUploader from '../../imageUploader/ImageUploader';
import { useModal } from '../../ModalProvider/ModalProvider';


const CreateLot = async (formData, id) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = localStorage.getItem("access_token");
     
    try {
        const response = await fetch(`${BASE_URL}/admin/auctions/${id}/lots`, { 
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            console.log("response not ok", data)
            /* throw {
                status: response.status,
                message: data.message || "Create lot function failed",
            }; */
        }
        return data;
    } catch (err) {
        console.error('Error creating lot:', err);
        return false;
    }
};

const AddNewLot = ({id}) => {
    const { closeModal } = useModal();
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
    const artType = [
        'Oil on Canvas',
        'Acrylic on Canvas',
        'Watercolor',
        'Mixed Media',
        'Charcoal',
        'Pencil Drawing',
        'Pastel',
        'Ink',
        'Digital Art',
        'Photography',
        'Sculpture',
        'Wood Carving',
        'Bronze Sculpture',
        'Ceramics',
        'Printmaking'
    ]
    const categories = [
        "Human Portrait",
        "Landscape",
        "Still Life",
        "Abstract",
        "Wildlife",
        "Cityscape",
        "Seascape",
        "Religious & Spiritual",
    ];
    const [lotData, setLotData] = useState({
        "artist_id": 0,
        "artwork_id": 0,
        "artwork_type": "",
        "category": "",
        "depth": "",
        "description": "",
        "exhibition_artwork_id": 0,
        "framed": true,
        "image_urls": [
            "",
            "",
            "",
            ""
        ],
        "length": "",
        "lot_number": "",
        "proof_of_authenticity": true,
        "reserve_price": "",
        "starting_bid": "",
        "themes": '',
        "title": "",
        "width": "",
        "year_created": ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await CreateLot(lotData, id);
        if (result) {
            toast.success("Auction Lot created successfully.");
            console.log('Lot created successfully:', result);
            setTimeout(() => {
                closeModal()
                window.location.reload();
            }, 3000);
            /* openModal(<AddNewLot id={result.data?.id} />) */
        } else {
            toast.error("Failed to create auction lot.");
            console.error('Failed to create lot do not proceed to create lot');
        }
    }
    console.log(id)
    return ( 
        <div className={styles.container}>
            <div style={{marginBottom:"20px"}} className="headerCenter">
                <h2>Add New Lot</h2>
            </div>
            <form onSubmit={handleSubmit} action="">
                <section className={styles.section}>
                    <div>
                        <label htmlFor="lotName">Name of lot</label>
                        <input value={lotData.title} onChange={(e) => setLotData(prev => ({ ...prev, title: e.target.value }))} placeholder="" type="text" id="lotName" required />
                    </div>
                    <div>
                        <label htmlFor="artistID">Artist Id (optional)</label>
                        <input value={lotData.artist_id} onChange={(e) => setLotData(prev => ({ ...prev, artist_id: Number(e.target.value) }))} placeholder="" type="text" id="artistID" />
                    </div>
                    <div>
                        <label htmlFor="artworkID">Artwork Id (optional)</label>
                        <input value={lotData.artwork_id} onChange={(e) => setLotData(prev => ({ ...prev, artwork_id: Number(e.target.value) }))} placeholder="" type="text" id="artworkID" />
                    </div>
                    <div>
                        <label htmlFor="artDesc">Artwork Description</label>
                        <textarea value={lotData.description} onChange={(e) => setLotData(prev => ({ ...prev, description: e.target.value }))} id="artDesc" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="startingBid">Starting bid</label>
                        <input value={lotData.starting_bid} onChange={(e) => setLotData(prev => ({ ...prev, starting_bid: Number(e.target.value) }))} placeholder="" type="tel" id="startingBid" required />
                    </div>
                    <div>
                        <label htmlFor="lotNumber">Lot Number</label>
                        <input value={lotData.lot_number} onChange={(e) => setLotData(prev => ({ ...prev, lot_number: Number(e.target.value) }))} placeholder="" type="text" id="lotNumber" required />
                    </div>
                    
                    <div style={{marginTop:"0px"}} className="row2"> 
                     
                        <input value={lotData.year_created} onChange={(e) => setLotData(prev => ({ ...prev, year_created: Number(e.target.value) }))} placeholder="Artwork Creation Year" type="tel" id="year" required />                     
                        <select value={lotData.category} onChange={(e) => setLotData(prev => ({ ...prev, category: e.target.value }))} id="category">
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                {category}
                                </option>
                            ))}                                                             
                        </select>        
                                             
                    </div>
                    <Select value={Theme.filter(option => lotData.themes.includes(option.value))} instanceId="lot-theme-select" isMulti placeholder="Theme" className={altStyles.selectWrapper} classNamePrefix="select" options={Theme}
                        onChange={(selectedOptions) =>
                            setLotData(prev => ({
                                ...prev,
                                themes: selectedOptions
                                    ? selectedOptions.map(option => option.value).join(", ")
                                    : "",
                            }))
                        }
                    />
                    <select value={lotData.artwork_type} onChange={(e) => setLotData(prev => ({ ...prev, artwork_type: e.target.value }))} name="type">
                        <option value="" disabled>
                            Select artwork type
                        </option>
                        {artType.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}                                                               
                    </select>
                    <div style={{marginTop:"0px"}} className="row3">
                        <div>
                            <label htmlFor="length">Length(cm)</label>
                            <input value={lotData.length} onChange={(e) => setLotData(prev => ({ ...prev, length: Number(e.target.value) }))} placeholder="" type="tel" id="length" required />
                        </div>
                        <div>
                            <label htmlFor="width">Width(cm)</label>
                            <input value={lotData.width} onChange={(e) => setLotData(prev => ({ ...prev, width: Number(e.target.value) }))} placeholder="" type="tel" id="width" required />
                        </div>
                        <div>
                            <label htmlFor="depth">Depth(cm)</label>
                            <input value={lotData.depth} onChange={(e) => setLotData(prev => ({ ...prev, depth: Number(e.target.value) }))} placeholder="" type="tel" id="depth" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="frame">Is The Artwork Framed?</label>                    
                        <select value={lotData.framed} onChange={(e) => setLotData(prev => ({ ...prev, framed: e.target.value === "true" }))} id="frame">
                            <option value="" disabled>
                                Frame?
                            </option>                 
                            <option value="true">
                                True
                            </option>                                
                            <option value="false">
                                False
                            </option>                                                              
                        </select>
                    </div>
                    <div>
                        <label htmlFor="proofOfAuth">Proof of authenticity?</label>                    
                        <select value={lotData.proof_of_authenticity} onChange={(e) => setLotData(prev => ({ ...prev, proof_of_authenticity: e.target.value === "true" }))} id="proofOfAuth">
                            <option value="" disabled>
                                Proof of authenticity?
                            </option>                 
                            <option value="true">
                                True
                            </option>                                
                            <option value="false">
                                False
                            </option>                                                              
                        </select>
                    </div>
                   <div>
                        <label htmlFor="reservePrice">Artwork Reserve Price</label>
                        <input value={lotData.reserve_price} onChange={(e) => setLotData(prev => ({ ...prev, reserve_price: Number(e.target.value) }))} placeholder="" type="tel" id="reservePrice" required />
                    </div>
                    
                    <div className="double">
                        {[1,2,3,4].map(index => (
                            <ImageUploader
                                key={index}
                                value={lotData.image_urls[index]}
                                placeholder={`Add Image`}
                                onUpload={(url) => {
                                    const media = [...lotData.image_urls];
                                    media[index] = url;
                                    setLotData(prev => ({
                                        ...prev,
                                        image_urls: media
                                    }));
                                }}
                            />
                        ))}
                    </div>
                </section>
                <button className="btn submit">Add lot to auction event</button>
            </form>
        </div>
    );
}
 
export default AddNewLot;