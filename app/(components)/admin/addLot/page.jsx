'use client'
import Select from 'react-select'
import styles from './addLot.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
import altStyles from '@/app/(components)/gallerySearch/galSearch.module.css'
import { useState } from 'react';
const AddNewLot = () => {
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
    const [searchData, setSearchData] = useState({
        themes: [],
        artType: [],
    })
    return ( 
        <div className={styles.container}>
            <div style={{marginBottom:"20px"}} className="headerCenter">
                <h2>Add New Lot</h2>
            </div>
            <form action="">
                <section className={styles.section}>
                    <input placeholder="Name of lot" type="text" name="lotName" required />
                    <input placeholder="Artist" type="text" name="artist" required />
                    <textarea name="artDesc" placeholder="Description" />
                    <input placeholder="Starting bid" type="tel" name="startingBid" required />
                    <div style={{marginTop:"0px"}} className="row2"> 
                        <input placeholder="Year" type="tel" name="year" required />
                        <select defaultValue="Country" name="country">
                            <option disabled>Country</option>                 
                            <option value="Delivery">
                                kongo
                            </option>                                
                            <option value="Pickup">
                                DRC
                            </option>                                                              
                        </select>                           
                    </div>
                    <Select value={searchData.themes} instanceId="gallery-search-select" isMulti placeholder="Theme" className={altStyles.selectWrapper} classNamePrefix="select" options={Theme}
                        onChange={(selectedOptions) =>
                            setSearchData((prev) => ({
                            ...prev, 
                            themes: selectedOptions || [],
                            }))
                        }
                    />
                    <select defaultValue="Type" name="type">
                        <option disabled>Type</option>                 
                        <option value="Delivery">
                            Address delivery
                        </option>                                
                        <option value="Pickup">
                            Physical Pickup
                        </option>                                                              
                    </select>
                    <div style={{marginTop:"0px"}} className="row3">
                        <input placeholder="Length" type="tel" name="length" required />
                        <input placeholder="Width" type="tel" name="width" required />
                        <input placeholder="Depth" type="tel" name="depth" required />
                    </div>
                    <select defaultValue="Frame?" name="frame">
                        <option disabled>Frame?</option>                 
                        <option value="Delivery">
                            Address delivery
                        </option>                                
                        <option value="Pickup">
                            Physical Pickup
                        </option>                                                              
                    </select>
                    <select defaultValue="Proof of authenticity?" name="proofOfAuth">
                        <option disabled>Proof of authenticity?</option>                 
                        <option value="Delivery">
                            Address delivery
                        </option>                                
                        <option value="Pickup">
                            Physical Pickup
                        </option>                                                              
                    </select>
                    <div>
                        <div className="btn">Add image</div>
                        <div className="btn">Add image</div>
                        <div className="btn">Add image</div>
                        <div className="btn">Add image</div>
                    </div>
                </section>
                <button className="btn submit">Add lot to auction event</button>
            </form>
        </div>
    );
}
 
export default AddNewLot;