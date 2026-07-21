'use client';
import { useState } from 'react';
import styles from './galSearch.module.css';
import Select from 'react-select'
const artType = [
  { value: 'Oil on Canvas', label: 'Oil on Canvas' },
  { value: 'Acrylic on Canvas', label: 'Acrylic on Canvas' },
  { value: 'Watercolor', label: 'Watercolor' },
  { value: 'Mixed Media', label: 'Mixed Media' },
  { value: 'Charcoal', label: 'Charcoal' },
  { value: 'Pencil Drawing', label: 'Pencil Drawing' },
  { value: 'Pastel', label: 'Pastel' },
  { value: 'Ink', label: 'Ink' },
  { value: 'Digital Art', label: 'Digital Art' },
  { value: 'Photography', label: 'Photography' },
  { value: 'Sculpture', label: 'Sculpture' },
  { value: 'Wood Carving', label: 'Wood Carving' },
  { value: 'Bronze Sculpture', label: 'Bronze Sculpture' },
  { value: 'Ceramics', label: 'Ceramics' },
  { value: 'Printmaking', label: 'Printmaking' }
]
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
const GalSearch = ({ onSubmit }) => {
    const [searchData, setSearchData] = useState({
        themes: [],
        artType: [],
    })
    const [keywords, setKeywords] = useState('')
    const [artist, setArtist] = useState('')
  
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            keywords,
            artist, 
            themes:searchData.themes.map((items)=>items.value),
            artType:searchData.artType.map((items)=>items.value)
        });
    };

    return ( 
        <div>
            <form onSubmit={handleSubmit} className={styles.searchForm} action="">
                <input value={keywords} type="text" name="search" placeholder='Search here' id="" 
                    onChange={(e) => setKeywords(e.target.value) }
                />
                <Select value={searchData.artType} instanceId="gallery-search-select" isMulti placeholder="Artwork type" className={styles.selectWrapper} classNamePrefix="select" options={artType} 
                    onChange={(selectedOptions) =>
                        setSearchData((prev) => ({
                        ...prev,
                        artType: selectedOptions || [],
                        }))
                    }
                />
                <input value={artist} type="text" placeholder='Artist' name='artist' 
                    onChange={(e) => setArtist(e.target.value)}
                />
                <Select value={searchData.themes} instanceId="gallery-search-select" isMulti placeholder="Theme" className={styles.selectWrapper} classNamePrefix="select" options={Theme}
                    onChange={(selectedOptions) =>
                        setSearchData((prev) => ({
                        ...prev, 
                        themes: selectedOptions || [],
                        }))
                    }
                />
                <button className='btn' type="submit"> Submit </button>
            </form>
        </div>
    );
}
 
export default GalSearch;