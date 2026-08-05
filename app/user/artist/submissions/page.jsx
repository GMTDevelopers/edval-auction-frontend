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
        const response = await fetch(`${BASE_URL}/artworks?artist_id=${id}&request_type=auction,exhibition&limit=100&offset=0`, { 
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
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const trying = async () => {
            console.log('user',user)
            if (user){
                const submissions = await GetSubmissions(user?.id)
                setSubmissions(submissions.data || [])
                console.log('submissions',submissions)
            }
        }
        trying()
    }, [user]);

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