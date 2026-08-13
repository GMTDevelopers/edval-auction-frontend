'use client';
import Loader from '@/app/(components)/loader/loader';
import styles from './auction.module.css';
import AuctionTable from "@/app/(components)/tables/AdminAuctionsTable";
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getAuctionData = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/auctions?limit=100&offset=0`, {
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

const Auction = () => {
    const [auctionData, setAuctionData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                setLoading(true);
                const data = await getAuctionData();
                setAuctionData(data);
                setLoading(false);
                console.log('Auction data fetched successfully:', data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchAuctionData();
    }, []);
    const router = useRouter();
    return ( 
        <div>
            <div style={{alignItems:"center"}} className={`double ${styles.double}`}>
                <h3>Auctions ({auctionData.data.length})</h3>
                <div onClick={() => router.push('/admin/auctions/addNewAuction')} style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className="btn"> <Plus />  Add new auction event</div>
            </div>
            {error && <p style={{color:"red"}}>Error: {error}</p>}
            {auctionData.length === 0 && !loading && !error && <p>No auction data available.</p>}
            {loading ? <Loader /> : <AuctionTable Data={auctionData} />}
        </div>
    );
}
 
export default Auction;