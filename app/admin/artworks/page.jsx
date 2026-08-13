'use client';
import styles from './artworks.module.css';
import { Plus } from "lucide-react";
import AdminArtworkTable from '@/app/(components)/tables/AdminArtworksTable';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loader from '@/app/(components)/loader/loader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetArtworks = async (filter) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/artworks?limit=10000&offset=0&status=${filter.status}&request_type=gallery`, { 
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

const Artworks = () => {
    const router = useRouter();
    const [artworks, setArtworks] = useState([]);
    const [filter, setFilter] = useState({status:''});
    const [loading, setLoading] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFilter(prev=>({
            ...prev, 
            status:e.target.value
        }))
    }
    useEffect(() => {
        const trying = async () => {           
            const result = await GetArtworks(filter);
            setArtworks(result.data || []);
            setLoading(false);
            console.log('artworks',result);
        }
        trying()
    }, [filter]);
    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>Artworks ({artworks?.data?.length || 0})</h3>
                <form className={`row3 ${styles.searchBar}`}>
                    <div className="double">
                        Now showing
                        <select style={{cursor:'pointer'}} value={filter.status} onChange={handleSubmit} name="nowShowing">
                            <option value={''}>All items</option>                 
                            <option value="sold">
                                Sold
                            </option>                                
                            <option value="rejected">
                                Rejected
                            </option>                                                              
                            <option value="approved">
                                Approved
                            </option>                                                              
                        </select>
                    </div>
                    {/* <input placeholder="Search here" type="text" name="search" /> */}
                    <div style={{justifyContent:"center"}} className="btn submit" onClick={()=>router.push('/admin/artworks/addNewArt/')}> <Plus /> Add new artwork</div>
                </form>
            </div>
            <br /><br /><br />
            {loading ? <Loader /> : <AdminArtworkTable data={artworks.data}/>}
        </div>
    );
}
 
export default Artworks;