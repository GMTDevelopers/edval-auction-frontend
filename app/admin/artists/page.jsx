'use client'
import AdminArtistTable from '@/app/(components)/tables/AdminArtsistTable';
import styles from '../artworks/artworks.module.css';
import AdminUserTable from '@/app/(components)/tables/AdminUserTable';
import { useState } from 'react';
const Artists = () => {
    const [showing, setShowing] = useState('artist')
    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>Artworks (82)</h3>
                <form  className={`row2 ${styles.searchBar}`} action="">
                    <div className="double">
                        Now showing
                        <select value={showing} onChange={(e)=> setShowing(e.target.value)} defaultValue="artists" name="nowShowing"> 
                            <option value="artists">
                                Artists
                            </option>              
                            <option value="users">
                                Users
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    <input placeholder="Search here" type="text" name="search" />
                </form>
            </div>
            <br /><br />
            {showing==="artists" ? <AdminArtistTable /> :
            <AdminUserTable />}
        </div>
    );
}
 
export default Artists;