'use client'
import { Banknote, Loader, Palette, Plus } from 'lucide-react';
import styles from './myArtworks.module.css';
import ArtistArtworksTable from '@/app/(components)/tables/artistArtworksTable';
import StatsCard from '@/app/(components)/statsCard/page';
import { useRouter } from 'next/navigation';

const MyArtworks = () => {
    const router = useRouter()
    return ( 
        <div className={styles.container}>
            <div className="container">
                <div className="row3">
                    <StatsCard title="Total Artworks" data="14" icon={Palette} />
                    <StatsCard title="Pending Approval" data="3" icon={Loader} />
                    <StatsCard title="Total Sales" data="147,234" icon={Banknote} />
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