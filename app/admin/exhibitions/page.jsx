'use client';
import AdminExhibitionTable from '@/app/(components)/tables/AdminExhibitionTable';
import styles from '../artworks/artworks.module.css';
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
const Exhibitions = () => {
    const router = useRouter();
    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>Exhibitions (32)</h3>
                <form  className={`row3 ${styles.searchBar}`} action="">
                    <div className="double">
                        Now showing
                        <select /* value={showing} */ /* onChange={(e)=> setShowing(e.target.value)} */ defaultValue="all" name="nowShowing"> 
                            <option value="all">
                                All items
                            </option>              
                            <option value="users">
                                Users
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    <input placeholder="Search here" type="text" name="search" />
                    <div style={{justifyContent:"center"}} className="btn submit" onClick={()=>router.push('/admin/exhibitions/addNewExhibition/')}> <Plus /> Add new exhibition</div>
                </form>
            </div>
            <br /><br />
            <AdminExhibitionTable />
        </div>
    );
}
 
export default Exhibitions;