'use client'
import Loader from '@/app/(components)/loader/loader';
import styles from './overview.module.css';
import StatsCard from "@/app/(components)/statsCard/page";
import { Banknote, Brush, Hourglass, Palette, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetDashboardStats = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/dashboard`, { 
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
                data.error|| "failed to get stats"
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

const Overview = () => {
    const [dashStats, setDashStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedActivity, setSelectedActivity] = useState("art_auctions");
    const data = [
        { month: "Jan", value: 90 },
        { month: "Feb", value: 62 },
        { month: "Mar", value: 90 },
        { month: "Apr", value: 80 },
        { month: "May", value: 86 },
        { month: "Jun", value: 63 },
        { month: "Jul", value: 77 },
        { month: "Aug", value: 64 },
        { month: "Sep", value: 79 },
        { month: "Oct", value: 65 },
        { month: "Nov", value: 79 },
        { month: "Dec", value: 73 },
    ];
    const scrollRef = useRef(null);
    const isHoveredRef = useRef(false);

    useEffect(() => {
        const getStats = async () => {
            const stats = await GetDashboardStats()
            setDashStats(stats?.data.data || [])
            setLoading(false);
            console.log('this are the admins stats', stats?.data.data)
        };
        getStats();
        const container = scrollRef.current;
        if (!container) return;
        let animationFrameId;
        const scrollSpeed = 0; // Pixels per frame. Increase for faster scrolling.
        const autoScroll = () => {
            // Only scroll if the user isn't hovering over it
            if (!isHoveredRef.current) {
                container.scrollTop += scrollSpeed;
                // Reset to the top when reaching the absolute bottom
                const maxScroll = container.scrollHeight - container.clientHeight;
                if (container.scrollTop >= maxScroll) {
                container.scrollTop = 0;
                }
            }
            // Smooth loop syncing with browser refresh rate
            animationFrameId = requestAnimationFrame(autoScroll);
            };
        // Start the scrolling animation loop
        animationFrameId = requestAnimationFrame(autoScroll);
        // Clean up animation frame when component unmounts to prevent memory leaks
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return ( 
        <div className={styles.overviewContainer}>
            <div className="row3">
                <StatsCard title="Total Artworks" data={loading? <Loader /> : dashStats.kpi.total_artworks} icon={Palette} />
                <StatsCard title="Total Artist" data={loading? <Loader /> : dashStats.kpi.total_artists} icon={Brush} />
                <StatsCard title="Total Users" data={loading? <Loader /> : dashStats.kpi.total_users} icon={UserRound} />
                <StatsCard title="Upcoming Auctions" data={loading? <Loader /> : dashStats.kpi.upcoming_auctions} icon={Hourglass} />
                <StatsCard title="Total Sales" data={loading? <Loader /> : dashStats.kpi.total_sales} icon={Banknote} />
                <StatsCard title="Pending Payments" data={loading? <Loader /> : dashStats.kpi.pending_payments} icon={Banknote} />
            </div>
            <div className="double">                
                <div className="big">
                    <div className=''>
                        <div style={{alignItems:"center", marginBottom:"40px"}} className={"double"}>
                            <p> <span>PLATFORM ACTIVITIES</span> </p>
                            <select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)} className={styles.graphType} name="graphType" id="">
                                <option value="art_auctions">Art Auctions</option>
                                <option value="gallery">Gallery</option>
                                <option value="exhibitions">Exhibitions</option>
                                <option value="commissions">Commissions</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={385}>
                            <AreaChart data={dashStats?.platform_activities}>
                                <defs>
                                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" x3="0" y3="1">
                                        <stop offset="25%" stopColor="#807D67" stopOpacity={1}/>
                                        <stop offset="50%" stopColor="#D5D3BE" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#F2F0DB" stopOpacity={1}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey={selectedActivity} stroke="#807D67" fill="url(#color)" strokeWidth={2.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="small">
                    <div ref={scrollRef} onMouseEnter={() => { isHoveredRef.current = true; }} onMouseLeave={() => { isHoveredRef.current = false; }} className={styles.systemUpdates}>
                        <li className={styles.updateHeader}>
                            SYSTEM UPDATES
                        </li>
                        {dashStats.system_updates.length > 0 ? dashStats.system_updates.map((updates, index)=> (

                            <li className="updateHeader" key={index}>
                                <p><span>{updates?.actions}</span></p>
                                <p>{new Date(updates.created_at).toLocaleTimeString('en-US',{hour: '2-digit', minute: '2-digit', hour12: true})}</p>
                            </li>
                        )) :
                        
                            <li className="updateHeader">
                                <p><span>No Activity yet</span></p>
                                <p>create an activity to generate stats</p>
                            </li>
                        }                
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Overview;