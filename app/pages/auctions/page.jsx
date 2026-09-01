'use client';
import AuctionCard from "@/app/(components)/cards/auctionCard";
import styles from "./auctions.module.css";
import { useEffect, useState } from "react";
import Loader from "@/app/(components)/loader/loader";
import { useAuth } from "@/app/context/authContext";

const defaultAuctionData = [
    {
      "id":1,
      "name":"Modern & Contemporary",
      "startingBid":"400",
      "time":"02:14:59",
      "status":"live now",
      "img": "/images/homepage/auction1.png"
    },
    {
      "id":2,
      "name":"Surreal Abstract Gaze",
      "startingBid":"400",
      "time":"02:14:59",
      "status":"upcoming",
      "img": "/images/homepage/auction2.png"
    },
    {
      "id":3,
      "name":"Nature - Calm & Gentle",
      "startingBid":"400",
      "status":"upcoming",
      "time":"02:14:59",
      "img": "/images/homepage/auction3.png"
    },
]
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const getAuctionData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auctions?status=upcoming,live&limit=9&offset=0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
  });
  const data = await response.json();
  return data;
  } catch (err) {
/*     console.error('Error fetching auction data:', err); */
    return {
      success: false,
      error: err.message,
    };
  }
}

const AuctionPage = () => {
   /*  const {user} = useAuth(); */
    const [auctionData, setAuctionData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAuctionData = async () => {
          try {
            setLoading(true);
            const data = await getAuctionData();
            setAuctionData(data.data);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }finally{
            setLoading(false);
          }
        }
        fetchAuctionData();
    }, []);
    return ( 
        <div className={styles.auctionPage}>
            <div className='headerCenter pageHeader'>
                <h1>Edval Art Auctions</h1>
                <p>
                    Watch the live stream and follow the active lot status as curated artworks take the stage one at a time. Exclusive phone-in bidding is reserved entirely for our approved, pre-registered participants
                </p>
            </div>
            <div className="upcomingAuctions">
                <div className="container">
                    <div>
                        <p className="subHeading">LIVE BIDDING</p>
                        <h2>Upcoming Auctions</h2>
                    </div>
                    {loading? 
                      <div className="emptyCont">
                        <Loader /> 
                      </div>:
                      <div className="row3">
                        {auctionData?.length > 0 && auctionData?.map((data)=>(
                          <AuctionCard key={data.id} auctionId={data.id} name={data.name} price={data.min_participation_amount} img={data.img || `/images/homepage/auction1.png`} duration={data.duration_minutes} time={data.scheduled_at} auctStatus={data.status} slug={data.slug}/>
                        ))}
                        {auctionData?.length===0 && defaultAuctionData?.map((data)=>(
                          <AuctionCard key={data.id} auctionId={data.id} name={data.name} price={data.startingBid} img={data.img} time={data.time} status={data.status}/>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    );
}
 
export default AuctionPage;