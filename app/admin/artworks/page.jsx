'use client';
import styles from './artworks.module.css';
import { Plus } from "lucide-react";
import AdminAuctionTable from '@/app/(components)/tables/AdminAuctionsTable';
import AdminArtworkTable from '@/app/(components)/tables/AdminArtworksTable';
import { useRouter } from 'next/navigation';

const Artworks = () => {
    const router = useRouter()
    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>Artworks (82)</h3>
                <form  className={`row3 ${styles.searchBar}`} action="">
                    <div className="double">
                        Now showing
                        <select defaultValue="All items" name="nowShowing">
                            <option disabled>All items</option>                 
                            <option value="Delivery">
                                kongo
                            </option>                                
                            <option value="Pickup">
                                DRC
                            </option>                                                              
                        </select>
                    </div>
                    <input placeholder="Search here" type="text" name="search" />
                    <div style={{justifyContent:"center"}} className="btn submit" onClick={()=>router.push('/admin/artworks/addNewArt/')}> <Plus /> Add new artwork</div>
                </form>
            </div>
            <br /><br /><br />
            <AdminArtworkTable />
        </div>
    );
}
 
export default Artworks;