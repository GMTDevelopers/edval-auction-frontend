'use client'
import { Banknote, Loader, Palette, Plus } from 'lucide-react';
import styles from '../myArtworks/myArtworks.module.css';
import StatsCard from '@/app/(components)/statsCard/page';
import ArtistCommissionsTable from '@/app/(components)/tables/artistCommission';
import { useRouter } from 'next/navigation';

const MySubmissions = () => {
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
                    <h2>Submissions</h2>
                    <div onClick={()=>router.push('/user/artist/submissions/addSubmission')} className={`btn ${styles.btn}`}><Plus /> Submit new request</div>
                </div>
                <ArtistCommissionsTable />
            </div>
        </div>
    );
}
 
export default MySubmissions;