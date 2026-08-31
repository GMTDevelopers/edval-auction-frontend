'use client';
import { useEffect, useState } from 'react';
import styles from './exhibition.module.css';
import { useParams, useRouter } from 'next/navigation';
import Loader from '@/app/(components)/loader/loader';
import { toast } from 'sonner';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { ChevronLeft } from 'lucide-react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getExhibitionData = async (slug) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/exhibitions/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching auction data:', err);
        return {
            success: false,
            error: err.message,
        };
    }
}
const ExhibitionDetails = () => {
    const { openModal, closeModal } = useModal();
    const [auctionData, setAuctionData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("access_token");
    const {slug} = useParams();
    const router = useRouter();

    const handleAttendance = async () =>{
        try {
            const response = await fetch(`${BASE_URL}/exhibitions/${auctionData.id}/attend`, { 
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const rejctData = await response.json();
            if (!response.ok) {
                if(response.status===401){
                    toast.error("Sign in to register for exhibition");
                }else{
                    toast.error("Failed to register.");
                    console.error('Failed to register.');
                }
            }
            if (response.ok) {
                toast.success("Registered successfully.");
                console.log('Registered successfully:', response);
               
                fetchAuctionData()
              
            }
            
            return rejctData;
        } catch (err) {
            console.error('Error creating auction:', err);
            return false;
        }
    }
        const fetchAuctionData = async () => {
            try {
                setLoading(true);
                const result = await getExhibitionData(slug);
                setAuctionData(result.data);
                setLoading(false);
                console.log('exhibition data:', result.data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
    useEffect(() => {

        fetchAuctionData();
    }, []);
    return ( 
        <>
            {loading ? <div className='emptyCont'><Loader /></div> : 
                <>
                    <div className={styles.container}>                   
                        <div  style={{display:"flex", width:"100%", justifyContent:"space-between", alignSelf:"flex-start"}}>
                            <div onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <p><span>go back</span></p> </div>
                        </div>
                    </div> 
                    <div className={styles.container}>
                        
                        <div className={styles.galleryContainer}>
                            {/* Main Large Image */}
                            <img src={auctionData.banner_url} alt="exhibition" className={styles.mainImage} />
                        </div>
                        <div className={styles.detailsContainer}>
                            
                            <div className={styles.otherDetailsPack}>
                                <li>
                                    <p>Venue</p>
                                    <p>{auctionData.venue}</p>
                                </li>
                                <li>
                                    <p>Date</p>
                                    <p>{new Date(auctionData.start_date).toDateString()}</p>
                                </li>
                                <li>
                                    <p>Time</p>
                                    <p>{new Date(auctionData.start_date).toLocaleTimeString()}</p>
                                </li>
                                <li>
                                    <p>Attendance</p>
                                    <p>{auctionData.attendance_count} Attendance</p>
                                </li>
                            </div>
                            <p style={{lineHeight:"24px"}}>
                                {auctionData.description}
                            </p>
                            <div onClick={handleAttendance} className={`btn ${styles.addToCart}`}>{auctionData.is_attending ? 'click to unregister' : 'click to register'}</div>
                        </div>
                        
                    </div>
                </>
            
            }
            <section className="artFeature">
                <div className="container">       
                    <div className="artFeatureTxt">
                        <h2>Do you want your artwork featured on Edval Art Auction?</h2>
                        <p>We welcome submissions from emerging and established artists interested in exhibition opportunities, gallery representation, and auction consideration. Provide details about yourself and the artwork you would like reviewed. Our curatorial team will assess submissions and contact selected artists regarding next steps.</p>
                        <div onClick={()=> {openModal()}} className="btn artFeatureBtn">Fill request form</div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default ExhibitionDetails;