'use client';
import ExhibitionCard from '@/app/(components)/cards/exhibitionCard';
import styles from './exhibition.module.css';
import PastExhibitionCard from '@/app/(components)/cards/pastExhibition';
import { useEffect, useState } from 'react';
import Loader from '@/app/(components)/loader/loader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

 const galleryData = [
    {
      "id":1,
      "name": "Lagos Art Exhibition - Summer 2026",
      "slug":"lagos-art-exhibition",
      "attending":112,
      "time": " 10:00 AM",
      "venue": "102, Allen Avenue, Bypass Junction, Ikeja, Lagos",
      "date": "June 23, 2026",
      "status":"Available",
      "img": "/images/exhibition/ex1.webp"
    },
    {
      "id":2,
      "name": "Contemporary Art Fair ",
      "slug": "contemporary-art-fair ",
      "attending":112,
      "time": " 10:00 AM",
      "venue": "102, Allen Avenue, Bypass Junction, Ikeja, Lagos",
      "date": "June 23, 2026",
      "status":"Available",
      "img": "/images/exhibition/ex2.webp"
    },
]

const getUpcomingExhibitionData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/exhibitions?status=upcoming&limit=100&offset=0`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
const getCompletedExhibitionData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/exhibitions?status=ended&limit=100&offset=0`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

const Exhibition = () => {
    const [upcomingData, setUpcomingData] = useState([]);
    const [endedData, setEndedData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                setLoading(true);
                const upData = await getUpcomingExhibitionData();
                const endData = await getCompletedExhibitionData();
                setUpcomingData(upData.data);
                setEndedData(endData.data);
                setLoading(false);
                console.log('upcoming data:', upData);
                console.log('ended data:', endData);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchAuctionData();
    }, []);
    return ( 
        <div>
            <div className='headerCenter pageHeader'>
                <h1>Art Meant to Be Experienced, Not Simply Viewed.</h1>
                <p>
                    Explore exhibitions that transform artworks into immersive encounters through atmosphere, storytelling, curation, and contemporary visual culture
                </p>
            </div>
            <div className={styles.banner}>
                <img src="/images/exhibition/exhibition.webp" alt="banner" />
            </div>
            <div className="upcomingAuctions">
                <div className="container">
                    <div>
                        <p className="subHeading">EDVAL ART AUCTION</p>
                        <h2>Upcoming Exhibitions</h2>
                    </div>
                    {loading ? <div className='emptyCont'> <Loader /> </div> :
                        <div className="row2">
                            {
                                upcomingData?.map((data)=>(
                                    <ExhibitionCard key={data.id} slug={data.slug} name={data.title} venue={data.venue} img={data.banner_url} time={new Date(data.time).toLocaleTimeString()} date={new Date(data.start_date).toDateString()} status={data.status} attending={data.attendance_count}/>))
                            }
                        </div>
                    }
                </div>
            </div>
            <section className={styles.pastExhibition}>
                <div className='container'>
                    <div className="headerCenter">
                        <p className="subHeading">EDVAL ART AUCTION</p>
                        <h2>Past Exhibitions</h2>
                    </div>
                    {
                        loading ? <div className='emptyCont'> <Loader /> </div> :
                        <div className="row3">
                            {
                                endedData?.map((data)=>(
                                    <PastExhibitionCard key={data.id} name={data.title} img={data.banner_url} date={new Date(data.start_date).toDateString()} attending={data.attendance_count}/>))
                            }
                        </div>
                    }
                </div>
            </section>
            <section className="artFeature">
                <div className="container">       
                    <div className="artFeatureTxt">
                        <h2>Do you want your artwork featured on Edval Art Auction?</h2>
                        <p>We welcome submissions from emerging and established artists interested in exhibition opportunities, gallery representation, and auction consideration. Provide details about yourself and the artwork you would like reviewed. Our curatorial team will assess submissions and contact selected artists regarding next steps.</p>
                        <div className="btn artFeatureBtn">Fill request form</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default Exhibition;