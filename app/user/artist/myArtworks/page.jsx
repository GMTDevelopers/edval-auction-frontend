'use client'
import { Banknote, Loader, Palette, Plus } from 'lucide-react';
import styles from './myArtworks.module.css';
import ArtistArtworksTable from '@/app/(components)/tables/artistArtworksTable';
import StatsCard from '@/app/(components)/statsCard/page';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';
import { useEffect } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetArtworks = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/artworks?artist_id=${id}`, { 
        method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "failed to get Artwork"
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
    const router = useRouter()
    useEffect(() => {
        const trying = async () => {
            const result = await GetArtworks(user?.id)
            console.log(result)
        }
        trying()
    }, [user]);
    return ( 
        <div className={styles.container}>
            <div className="container">
                <div className="row3">
                    <StatsCard title="Total Artworks" data={user?.stats?.total_artworks} icon={Palette} />
                    <StatsCard title="Pending Approval" data={user?.stats?.pending_approval} icon={Loader} />
                    <StatsCard title="Total Sales" data={user?.stats?.total_sales} icon={Banknote} />
                </div>
                
                <div className={`double ${styles.pack}`}>
                    <h2>My Artworks (5)</h2>
                    <div onClick={()=>router.push('/user/artist/myArtworks/addNewArt')} className={`btn ${styles.btn}`}><Plus /> Add new artwork</div>
                </div>
                <ArtistArtworksTable />
            </div>
        </div>
    );
}
 
export default MyArtworks;