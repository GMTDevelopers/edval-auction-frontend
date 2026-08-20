'use client';
import { useEffect, useState } from 'react';
import styles from './galSearch.module.css';
import Select from 'react-select'
import artType from "@/app/data/artType.json";
import Theme from "@/app/data/theme.json";
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
    useEffect(() => {
        onSubmit({
            keywords,
            artist,
            themes: searchData.themes.map(item => item.value),
            artType: searchData.artType.map(item => item.value),
        });
    }, [keywords, artist, searchData]);

    return ( 
        <div>
            <form onSubmit={handleSubmit} className={styles.searchForm} action="">
                
                <Select value={searchData.artType} instanceId="gallery-search-select" isMulti placeholder="Artwork type" className={styles.selectWrapper} classNamePrefix="select" options={artType} 
                    onChange={(selectedOptions) =>
                        setSearchData((prev) => ({
                        ...prev,
                        artType: selectedOptions || [],
                        }))
                    }
                />
                <input value={keywords} type="text" name="search" placeholder='Search here' id="" 
                    onChange={(e) => setKeywords(e.target.value) }
                />
              {/*   <input value={artist} type="text" placeholder='Artist' name='artist' 
                    onChange={(e) => setArtist(e.target.value)}
                /> */}
                <Select value={searchData.themes} instanceId="gallery-search-select" isMulti placeholder="Theme" className={styles.selectWrapper} classNamePrefix="select" options={Theme}
                    onChange={(selectedOptions) =>
                        setSearchData((prev) => ({
                        ...prev, 
                        themes: selectedOptions || [],
                        }))
                    }
                />
                {/* <button className='btn' type="submit"> Submit </button> */}
            </form>
        </div>
    );
}
 
export default GalSearch;