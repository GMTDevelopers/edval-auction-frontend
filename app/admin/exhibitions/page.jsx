'use client';
import AdminExhibitionTable from '@/app/(components)/tables/AdminExhibitionTable';
import styles from '../artworks/artworks.module.css';
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Loader from '@/app/(components)/loader/loader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetExhibitions = async (filter) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/exhibitions?limit=100&offset=0&status=${filter}`, { 
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "failed to get Artworks"
            )
        }
        console.log(data)
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
const Exhibitions = () => {
    const router = useRouter();
    const [exDetails, setExDetails] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFilter(e.target.value)
    }
    useEffect(() => {
        setLoading(true);
        const trying = async () => {

            const exhibition = await GetExhibitions(filter)
            setExDetails(exhibition?.data || [])
            setLoading(false);
            console.log('exhibition', exhibition?.data)
        }
        trying()
        console.log(filter)
    }, [filter]);

    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>Exhibitions ({exDetails?.data?.length})</h3>
                <form  className={`row3 ${styles.searchBar}`} action="">
                    <div className="double">
                        Now showing
                        <select value={filter} style={{cursor:'pointer'}} onChange={handleSubmit} name="nowShowing"> 
                            <option value="">
                                All items
                            </option>              
                            <option value="upcoming">
                                upcoming
                            </option>                                
                            <option value="active">
                                active
                            </option>                                
                            <option value="ended">
                                ended
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    <input placeholder="Search here" type="text" name="search" />
                    <div style={{justifyContent:"center"}} className="btn submit" onClick={()=>router.push('/admin/exhibitions/addNewExhibition/')}> <Plus /> Add new exhibition</div>
                </form>
            </div>
            <br /><br />
            {loading ? <div className='emptyCont'><Loader /></div>  : <AdminExhibitionTable data={exDetails.data}/>}
        </div>
    );
}
 
export default Exhibitions;