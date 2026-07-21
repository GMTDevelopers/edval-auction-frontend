'use client'
import styles from './overview.module.css';
import StatsCard from "@/app/(components)/statsCard/page";
import { Banknote, Brush, Hourglass, Palette, UserRound } from "lucide-react";
import { useEffect, useRef } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Overview = () => {
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
                <StatsCard title="Total Artworks" data="317" icon={Palette} />
                <StatsCard title="Pending Approval" data="3" icon={Brush} />
                <StatsCard title="Total Sales" data="147,234" icon={UserRound} />
                <StatsCard title="Total Artworks" data="14" icon={Hourglass} />
                <StatsCard title="Pending Approval" data="3" icon={Banknote} />
                <StatsCard title="Total Sales" data="147,234" icon={Banknote} />
            </div>
            <div className="double">                
                <div className="big">
                    <div className=''>
                        <div style={{alignItems:"center", marginBottom:"40px"}} className={"double"}>
                            <p> <span>PLATFORM ACTIVITIES</span> </p>
                            <select className={styles.graphType} name="graphType" id="">
                                <option value="">Art Auctions</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={385}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" x3="0" y3="1">
                                        <stop offset="25%" stopColor="#807D67" stopOpacity={1}/>
                                        <stop offset="50%" stopColor="#D5D3BE" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#F2F0DB" stopOpacity={1}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Area type="monotone" dataKey="value" stroke="#807D67" fill="url(#color)" strokeWidth={2.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="small">
                    <div ref={scrollRef} onMouseEnter={() => { isHoveredRef.current = true; }} onMouseLeave={() => { isHoveredRef.current = false; }} className={styles.systemUpdates}>
                        <li className={styles.updateHeader}>
                            SYSTEM UPDATES
                        </li>
                        <li className="updateHeader">
                            <p><span>New user registration</span></p>
                            <p>10:24 PM</p>
                        </li>
                        <li className="updateHeader">
                            <p><span>New user registration</span></p>
                            <p>10:24 PM</p>
                        </li>
                        <li className="updateHeader">
                            <p><span>New user registration</span></p>
                            <p>10:24 PM</p>
                        </li>
                        <li className="updateHeader">
                            <p><span>New user registration</span></p>
                            <p>10:24 PM</p>
                        </li>
                        <li className="updateHeader">
                            <p><span>New user registration</span></p>
                            <p>10:24 PM</p>
                        </li>
                
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Overview;