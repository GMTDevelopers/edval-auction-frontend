'use client'
import { useState } from 'react';
import Styles from '@/app/(components)/gallerySearch/galSearch.module.css'
import styles from './add.module.css';
import Select from 'react-select'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
const AddNewArt = () => {
    const data = {
        "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
        "img": "/images/auction/2.webp"
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
                <div style={{display:"flex"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <h4>Add New Exhibition</h4> </div>
                <div className={` double`}>
                    <div className={`small`}>
                        <div className="galleryContainer">
                            {/* Main Large Image */}
                            <div className="mainImageContainer">
                                <img src={data.img} alt='exhibition ' className="mainImage" />
                            </div>
                        </div>

                    </div>
                    <div className="big">
                        <form action="">
                            <input placeholder="Exhibition name" type="text" name="exhibitioName" id="" />
                            <input placeholder="Venue" type="text" name="venue" id="" />

                            <textarea name="artDesc" placeholder="Artwork description"></textarea>

                            <div style={{marginTop:"0px"}} className="row2">
                                <div style={{gap:"5px"}} className="double">
                                    <label htmlFor="">Date</label>
                                    <input type="date" name="date" />  
                                </div>
                                <div style={{gap:"5px"}} className="double">
                                    <label  htmlFor="">Time</label>
                                    <input type="time" name="time" />  
                                </div>
                            </div>
                            <div>
                                <div className="double">
                                    <label style={{whiteSpace:"nowrap"}} htmlFor="">Deadline for artist submissions</label>
                                    <input type="date" name="date" />  
                                </div>
                            </div>
                            <div className="btn submit">Add exhibition</div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default AddNewArt;