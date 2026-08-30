'use client'
import styles from '@/app/pages/auctions/[slug]/prodDet.module.css';
/* import styles from '@/app/pages/auctions/productDetails/prodDet.module.css'; */
import pageStyles from './page.module.css';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { useEffect, useState } from 'react';
import { Ban, ChevronLeft, Plus } from 'lucide-react';
import LotDetails from '@/app/(components)/lotDetail/page';
import { useRouter, useSearchParams } from 'next/navigation';
import RegisteredBidders from '@/app/(components)/admin/registeredBidders/page';
import AdminLotSide from '@/app/(components)/sideCard/adminLot';
import { refreshUser } from '@/app/services/authServices';
import AddNewLot from '@/app/(components)/admin/addLot/page';
import AdminWinner from '@/app/(components)/sideCard/adminWinner';
import { toast } from 'sonner';
import Countdown from '@/app/(components)/counter/page';
import { useAuth } from '@/app/context/authContext';
const ProdDetPage = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const { openModal } = useModal();
    const { user } = useAuth();
    const [auctionData, setAuctionData] = useState(null);
    const [auctionLotData, setAuctionLotData] = useState(null);
    const [regBidders, setRegBidders] = useState([]);
    const [activeLot, setActiveLot] = useState(null);
    const [activeLotData, setActiveLotData] = useState([]);
    const [winners, setWinners] = useState([]);
    const [liveBid, setLiveBid] = useState("");
    const [status, setStatus] = useState();
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    const [formData, setformData] = useState({
        amount: '',
        channel: "",
        placed_by_admin_id: user?.id,
        user_id: 0,
    });
    const [startAuctionForm, setStartAuctionForm] = useState({
        bidding_phone_number: "",
        status: ""
    });

    const getAuction = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${BASE_URL}/auctions/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setAuctionData(data?.data);
            setStatus(data?.data?.status)
            console.log("auction data:", data);
        } catch (err) {
            setError(err);
            if (err.status === 401) {
                const refreshed = await refreshUser();
                if (refreshed) {
                    console.log("Token refreshed successfully, retrying getAuction...");
                    return getAuction();
                }
            }
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    }
    const getAuctionLots = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${BASE_URL}/auctions/${id}/lots`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setAuctionLotData(data?.data.lots);
            console.log("auction lots data:", data.data);
        } catch (err) {
            setError(err);
            if (err.status === 401) {
                const refreshed = await refreshUser();
                if (refreshed) {
                    console.log("Token refreshed successfully, retrying getAuctionLots...");
                    return getAuctionLots();
                }
            }
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    } 
    const handleStartAuction = async () => {
        const accessToken = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${BASE_URL}/admin/auctions/${id}/status`, { 
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(startAuctionForm),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error.message);
                console.log(data)
            }
            if (response.ok) {
                toast.success("Auction status changed successfully.");
                console.log('Auction status changed successfully:', data);
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                err,
            };
        }
    }
    const getAuctionWinners = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${BASE_URL}/admin/auctions/${id}/winnings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setWinners(data?.data);
            console.log("auction winners:", data.data);
        } catch (err) {
            console.log('auction error', err)
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    }      
    const getActiveLot = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${BASE_URL}/auctions/${id}/active-lot`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setActiveLotData(data?.data);
            console.log("active lot data:", data);
        } catch (err) {
            setError(err);
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    }
      const handleSetActiveLot = async (activeLotID) => {
        const accessToken = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${BASE_URL}/admin/auctions/${id}/active-lot`, { 
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    lot_number: Number(activeLotID),
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error.message);
                console.log(data)
            }
            if (response.ok) {
                getActiveLot();
                toast.success("Active lot changed successfully.");
                console.log('Active lot changed successfully:', data);
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                err,
            };
        }
    }
    const getBidStreams = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${BASE_URL}/auctions/${id}/live`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setLiveBid(data);
            console.log("bid streams data:", data);
        } catch (err) {
            setError(err);
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    }
    const getRegBidders = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const response = await fetch(`${BASE_URL}/auctions/${id}/registrations?limit=20&offset=0`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setRegBidders(data?.data);
            console.log("Registered bidders:", data);
        } catch (err) {
            setError(err);
            if (err.status === 401) {
                const refreshed = await refreshUser();
                if (refreshed) {
                    console.log("Token refreshed successfully, retrying getRegBidders...");
                    return getRegBidders();
                }
            }
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    }
    const handlePlaceBid = async () => {
        const accessToken = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${BASE_URL}/lots/${activeLotData.id}/bids`, { 
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error.message);
                console.log(data)
            }
            if (response.ok) {
                getActiveLot();
                getBidStreams()
                toast.success("Bid placed successfully.");
                console.log('Bid placed successfully:', data);
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                err,
            };
        }
    }

    useEffect(() => {
        getAuction();
        getAuctionLots();
        getRegBidders();
        getActiveLot();
        getBidStreams();
        getAuctionWinners();
    }, [status, activeLot]);

    return ( 
        <div className={styles.auctionPack}>
            <div style={{display:"flex", width:"100%", justifyContent:"space-between", alignSelf:"flex-start"}}>
                <div onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <p><span>go back</span></p> </div>
                <div className={`btn ${styles.timerBtn}`} onClick={()=> openModal(<AddNewLot id={id} />)}><Plus /> add lots</div>
            </div>
            
            <br /><br />
            <div style={{alignItems:"normal"}} className={`container double formDoubleReverse`}>
                <div className={`${styles.big} ${styles.auctionBig}`}>
                    {
                        auctionData?.status==='live' ? 
                            <iframe className={styles.streamVideo} src={auctionData?.stream_url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        :   <img className={styles.streamVideo} src="/images/auction/live.webp" alt="live" />
                    }   
                   {/*  <iframe className={styles.streamVideo} src={auctionData?.stream_url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> */}
                    {/* <img  src="/images/auction/live.webp" alt="live" /> */}
                    <h2>{auctionData?.name}</h2>
                    <p>Artworks: 
                        {auctionLotData?.map((lot,index)=>(  
                            <span key={index}> {lot?.title}, </span> 
                        ))}
                    </p>
                     { auctionData?.status==='live' ? 
                        <div className={styles.endsIn}>
                            <p>Auction ends in</p>
                            <div className={styles.timerPack}>
                                <div className={styles.timer}>
                                    <Countdown startTime={auctionData?.scheduled_at} duration={auctionData?.duration_minutes}/>
                                </div>
                                {/*VIEW REGISTERED BIDDERS*/}
                                <div className={`btn ${styles.timerBtn}`} onClick={()=> openModal(<RegisteredBidders auctionID={id} bidders={regBidders}/>)}>View registered bidders ({regBidders.length})</div>
                            </div>
                        </div> : 
                        <div className={styles.endsIn}>
                            <p>Auction Starts in</p>
                            <div className={styles.timerPack}>
                                <div className={styles.timer}>
                                    <Countdown startTime={auctionData?.scheduled_at} duration={auctionData?.duration_minutes}/>
                                </div>
                                
                                {/*the button (components) needs to have conditional rendering */}
                               <div className={`btn ${styles.timerBtn}`} onClick={()=> openModal(<RegisteredBidders auctionID={id} bidders={regBidders}/>)}>View registered bidders ({regBidders.length})</div>
                            </div>
                        </div>
                    }
                    {/* AUCTION OVERVIEW */}
                    {auctionData?.status === "live" && (
                        <div className={styles.statsPack}>
                            <div style={{backgroundColor:"#F2F0DB"}} className={styles.statsCard}>
                                <h3>Auction Overview</h3>
                                <div className={styles.statsList}>
                                    <li>
                                        <p>Active Lot: <span> {activeLotData?.title} </span></p>
                                    </li>
                                    <li>
                                        <p>Starting Bid: <span>$ {activeLotData?.starting_bid}</span></p>
                                    </li>
                                    <li>
                                        <p>Current Bid: <span>  $ {activeLotData?.current_bid} </span></p>
                                    </li>
                                    <li>
                                        <p>Bidder: <span> {activeLotData?.current_bidder_name} </span></p>
                                    </li>
                                    <li>
                                        <p>Auction Status: <span> {auctionData?.status} </span></p>
                                    </li>
                                </div>
                            </div>
                            <div style={{backgroundColor:"#FDE4D3"}} className={styles.statsCard}>
                                <h3>Current Bid</h3>
                                <div className={styles.statsList}>
                                    <li>
                                        <p> <span> Maryam Rita </span> bidded <span> $1,900.00 </span></p>
                                        <p className={styles.time}>Just now</p>
                                    </li>
                                    <li>
                                        <p> <span> Mike Olumide  </span> bidded <span> $1,600.00 </span></p>
                                        <p className={styles.time}>Just now</p>
                                    </li>
                                    <li>
                                        <p> <span> Eliab Banjo </span> bidded <span> $1,450.00 </span></p>
                                        <p className={styles.time}>1 mins ago</p>
                                    </li>
                                    <li>
                                        <p> <span> Maryam Rita </span> bidded <span> $1,350.00 </span></p>
                                        <p className={styles.time}>2 mins ago</p>
                                    </li>
                                    <li>
                                        <p> <span> James Docka </span> bidded <span> $1,320.00 </span></p>
                                        <p className={styles.time}>5 mins ago</p>
                                    </li>
                                    <li>
                                        <p> <span>Mike Olumide  </span> bidded <span> $1,900.00 </span></p>
                                        <p className={styles.time}>6 mins ago</p>
                                    </li>
                                    
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        {
                            auctionData?.status === "live" ? 
                            (<div>
                                <form className={pageStyles.form}>
                                    <p> <span>CLOSE AUCTION</span></p>
                                    <div className="rowMultiple">
                                        <p>Auction status</p>
                                        <select className={styles.graphType} value={startAuctionForm?.status || auctionData?.status} onChange={(e)=>{const newStatus = e.target.value; setStartAuctionForm(prev=>({...prev, status:newStatus})); handleStartAuction()}} name="auctionStatus" >          
                                            <option value="draft">
                                                Draft
                                            </option>                                
                                            <option value="upcoming">
                                                Upcoming
                                            </option>                                
                                            <option value="live">
                                                Live
                                            </option>                                                                                                                          
                                            <option value="completed">
                                                Completed
                                            </option>                                                                                                                          
                                            <option value="cancelled">
                                                Cancelled
                                            </option>                                                                                                                          
                                        </select>
                                    </div>
                                    <div className="rowMultiple">
                                        <p>Bidding phone number</p>
                                        <input type='tel' name='bidPhone' placeholder='12345678910' />
                                    </div>
                                   {/*  <button style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className='btn artFeatureBtn'> Save update</button> */}
                                </form>
                                <form className={pageStyles.form}>
                                    <p> <span>CHANGE ACTIVE LOT</span></p>
                                    <div className="rowMultiple">
                                        <p>Active lot</p>
                                        <select value={activeLot} className={styles.graphType} onChange={(e)=>{e.preventDefault(); const activeLot = e.target.value; setActiveLot(activeLot), handleSetActiveLot(activeLot)}} name="activeLot" id="">
                                            <option value="Active lot">{activeLotData?.title}</option>
                                            {auctionLotData?.length && auctionLotData?.map((lot, index)=>(
                                                <option key={index} value={lot.lot_number}>{lot.artwork.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                                <form className={pageStyles.form} onSubmit={(e)=>{e.preventDefault(); handlePlaceBid()}}>
                                    <p> <span>PLACE BID </span></p>
                                    
                                    <div className="rowMultiple">
                                        <p>Bid Channel</p>
                                        <select className={styles.graphType} value={formData.channel} onChange={(e)=>setformData(prev=>({...prev, channel:e.target.value}))} name="activeLot" id="">
                                            <option value="Website Platform">Website Platform</option>
                                            <option value="Phone Bidding">Phone Bidding</option>
                                        </select>
                                    </div>
                                    <div className="rowMultiple">
                                        <p>Current bid (User)</p>
                                        <select className={styles.graphType} value={formData.user_id} onChange={(e)=>setformData(prev=>({...prev, user_id:Number(e.target.value)}))} name="activeLot" id="">
                                            <option value="Active lot">Select user</option>
                                            {regBidders?.length && regBidders?.map((user,index)=>(
                                                <option key={index} value={user.id}>{user.first_name} {user.last_name }</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="rowMultiple">
                                        <p>Amount bid</p>
                                        <input type="text" inputMode="decimal" value={formData.amount}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*(\.\d{0,2})?$/.test(value)) {
                                                    setformData(prev => ({
                                                        ...prev,
                                                        amount: Number(value)
                                                    }));
                                                }
                                            }}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <button style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className='btn artFeatureBtn'> Place bid</button>
                                </form>
                            </div>):
                            (<form className={pageStyles.form} onSubmit={(e)=>{e.preventDefault(); handleStartAuction()}}>
                                <p> <span>ADMIN ACTIONS</span></p>
                                <div className="rowMultiple">
                                    <p>Bidding phone number</p>
                                    <input value={startAuctionForm?.bidding_phone_number} onChange={(e)=>setStartAuctionForm(prev=>({...prev, bidding_phone_number:e.target.value}))} type='tel' name='bidPhone' placeholder='12345678910' />
                                </div>
                                <div className="rowMultiple">
                                    <p>Auction status</p>
                                    <select className={styles.graphType} value={startAuctionForm?.status || auctionData?.status} onChange={(e)=>setStartAuctionForm(prev=>({...prev, status:e.target.value}))} name="auctionStatus" >          
                                        <option value="draft">
                                            Draft
                                        </option>                                
                                        <option value="upcoming">
                                            Upcoming
                                        </option>                                
                                        <option value="live">
                                            Live
                                        </option>                                                                                                                          
                                        <option value="completed">
                                            Completed
                                        </option>                                                                                                                          
                                        <option value="cancelled">
                                            Cancelled
                                        </option>                                                                                                                          
                                    </select>
                                </div>
                                <button style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className='btn artFeatureBtn'> Save update</button>
                            </form>)
                        }
                    </div>
                </div>
                <div className={styles.small}>
                    <div className={styles.smallPack}>
                        <h3>Available Lots ({auctionLotData?.length})</h3>
                        <div className={styles.sideLots}>
                            {
                                auctionLotData?.map((lot)=>(
                                    <div key={lot.id}>    
                                        <AdminLotSide lots={lot} id={lot.id} bidders={regBidders} activeLot={activeLotData} name={lot.artwork.title} img={lot?.artwork?.images[1]?.url} artist={lot.artwork.artist_details.first_name} year={lot.artwork.year_created} bid={lot.artwork.price} status={lot.artwork.status} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Conditional Rendering */}
                    
                        <div style={{backgroundColor:"#F2F0DB"}} className={`${styles.winners}`}>
                            {winners?.length > 0 ? (
                                <>
                                    <h3>Winnings</h3>
                                    {winners.map((win, index)=>(
                                        <AdminWinner key={index} img={win?.winner?.profile_image_url} winner={win.winning_user_name} lotWon={win.title} payStatus={win.payment_status} /* img={win.artwork.images[0].url} */ endBid={win.winning_bid_amount} time={win.payment_due_at} />))}
                                </>
                            ) : ( 
                                <div className={styles.noWinner}>
                                    <Ban color={"var(--text-primary)"} size={37}/>
                                    <p className={styles.noWinnerHeading}>No Winnings Yet</p>
                                    <p>The lots you win will appear here. Payment window for each winning lot is 30 minutes after which the lot will be re-awarded to another participant.</p>
                                </div>  
                            )}
                        
                        </div>
                   
                    
                </div>
            </div>
        </div>
    );
}
 
export default ProdDetPage;