'use client'
import { Banknote, CircleOff, Loader, Palette, Plus } from 'lucide-react';
import styles from './myArtworks.module.css';
import ArtistArtworksTable from '@/app/(components)/tables/artistArtworksTable';
import StatsCard from '@/app/(components)/statsCard/page';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';
import { useEffect, useState } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetArtworks = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/artworks?artist_id=${id}&limit=100&offset=0`, { 
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
const MyArtworks = () => {
   const {user} = useAuth(); 
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [artworks, setArtworks] = useState([]);
    useEffect(() => {
        const trying = async () => {
            console.log('user',user)
            if (user){
                const artworks = await GetArtworks(user?.id)
                setArtworks(artworks.data || [])
                console.log('artworks',artworks)
                setLoading(false)
            }           
        }
        trying()
    }, [user]);
    return ( 
        <div className={styles.container}>
            {loading? <div className='emptyCont'> <Loader /> </div>  : <div className="container">
                <div className="row3">
                    <StatsCard title="Total Artworks" data={user?.stats?.total_artworks} icon={Palette} />
                    <StatsCard title="Pending Approval" data={user?.stats?.pending_approval} icon={Loader} />
                    <StatsCard title="Total Sales" data={user?.stats?.total_sales} icon={Banknote} />
                </div>
                
                <div className={`double ${styles.pack}`}>
                    <h2>My Artworks ({artworks?.data?.length || 0})</h2>
                    <div onClick={()=>router.push('/user/artist/myArtworks/addNewArt')} className={`btn ${styles.btn}`}><Plus /> Add new artwork</div>
                </div>
                {artworks?.data?.length > 0 ? <ArtistArtworksTable data={artworks.data} /> 
                : 
                <div className='emptyCont'>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
                        <CircleOff />
                        <p>Add an Artwork to see them here</p>
                    </div>    
                </div>}
            </div>}
        </div>
    );
}
 
export default MyArtworks;