'use client'
import { Banknote, Loader, Palette, Plus } from 'lucide-react';
import styles from '../myArtworks/myArtworks.module.css';
import StatsCard from '@/app/(components)/statsCard/page';
import ArtistCommissionsTable from '@/app/(components)/tables/artistCommission';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/authContext';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;



const GetSubmissions = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/artworks?artist_id=${id}&limit=100&offset=0&request_type=exhibition,auction`, { 
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


const MySubmissions = () => {
    const {user} = useAuth(); 
    const router = useRouter()
    const [sub, setSub] = useState([]);
    useEffect(() => {
        const submissions = async () => {
            console.log('user',user)
            if (user){
                const artworks = await GetSubmissions(user?.id)
                setSub(artworks.data || [])
                console.log('submissions',artworks)
            }
        }
        submissions()
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
                    <h2>Submissions</h2>
                    <div onClick={()=>router.push('/user/artist/submissions/addSubmission')} className={`btn ${styles.btn}`}><Plus /> Submit new request</div>
                </div>
                <ArtistCommissionsTable sub={sub} />
            </div>
        </div>
    );
}
 
export default MySubmissions;