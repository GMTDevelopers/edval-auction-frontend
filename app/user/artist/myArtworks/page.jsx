'use client'
import { Banknote, Loader, Palette, Plus } from 'lucide-react';
import styles from './myArtworks.module.css';
import ArtistArtworksTable from '@/app/(components)/tables/artistArtworksTable';
import StatsCard from '@/app/(components)/statsCard/page';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

const MyArtworks = () => {
   const {user} = useAuth(); 
    const router = useRouter()
    return ( 
        <div className={styles.container}>
            <div className="container">
                <div className="row3">
                    <StatsCard title="Total Artworks" data={user?.stats?.total_artworks} icon={Palette} />
                    <StatsCard title="Pending Approval" data={user?.stats?.pending_approval} icon={Loader} />
                    <StatsCard title="Total Sales" data={user?.stats?.total_sales} icon={Banknote} />
                </div>
                
                <div className={`double ${styles.pack}`}>
                    <h2>My Orders (5)</h2>
                    <div onClick={()=>router.push('/user/artist/myArtworks/addNewArt')} className={`btn ${styles.btn}`}><Plus /> Add new artwork</div>
                </div>
                <ArtistArtworksTable />
            </div>
        </div>
    );
}
 
export default MyArtworks;