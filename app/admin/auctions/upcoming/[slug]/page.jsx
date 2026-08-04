'use client'
import styles from '@/app/pages/auctions/productDetails/prodDet.module.css';
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

const ProdDetPage = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const { openModal } = useModal();
    const [auctionData, setAuctionData] = useState(null);
    const [auctionLotData, setAuctionLotData] = useState(null);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
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
            setAuctionLotData(data?.data);
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
    useEffect(() => {
        getAuction();
        getAuctionLots();
    }, []);

    return ( 
        <div className={styles.auctionPack}>
            <div style={{display:"flex", width:"100%", justifyContent:"space-between", alignSelf:"flex-start"}}>
                <div onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <p><span>go back</span></p> </div>
                <div className={`btn ${styles.timerBtn}`} onClick={()=> openModal(<AddNewLot id={id} />)}><Plus /> add lots</div>
            </div>
            
            <br /><br />
            <div style={{alignItems:"normal"}} className={`container double`}>
                <div className={styles.big}>
                    <iframe className={styles.streamVideo} src="https://www.youtube.com/embed/G4yQtdtkO80?si=D6t7epPXS9-bXVnm" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    {/* <img  src="/images/auction/live.webp" alt="live" /> */}
                    <h2>Sisters of the Sound - Art Auction (LIVE)</h2>
                    <p>Artworks: <span> Black or Beauty?, Dancing in the Wind, Calm & Open {auctionData?.name} </span> </p>
                    <div className={styles.endsIn}>
                        <p>Auction ends in</p>
                        <div className={styles.timerPack}>
                            <div className={styles.timer}>
                                <img src="/images/auction/timer.png" alt="timmer" />
                            </div>
                            {/*the button (components) needs to have conditional rendering */}
                            <div className={`btn ${styles.timerBtn}`} onClick={()=> openModal(<RegisteredBidders />)}>View registered bidders (77)</div>
                        </div>

                    </div>
                    {/* Conditionaly rendered */}
                    {auctionData?.status === "live" && (
                        <div className={styles.statsPack}>
                            <div style={{backgroundColor:"#F2F0DB"}} className={styles.statsCard}>
                                <h3>Auction Overview</h3>
                                <div className={styles.statsList}>
                                    <li>
                                        <p>Active Lot: <span> Dancing in the Wind </span></p>
                                    </li>
                                    <li>
                                        <p>Starting Bid: <span>$ 300.00</span></p>
                                    </li>
                                    <li>
                                        <p>Highest Bid: <span>  $1,850.00 </span></p>
                                    </li>
                                    <li>
                                        <p>Bidder: <span> Michael Johnson </span></p>
                                    </li>
                                    <li>
                                        <p>Auction Status: <span> Open </span></p>
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
                            (<form className={pageStyles.form} action="">
                                <p> <span>ADMIN ACTIONS</span></p>
                                <div className="rowMultiple">
                                    <p>Bidding phone number</p>
                                    <input type='tel' name='bidPhone' placeholder='12345678910' />
                                </div>
                                <div className="rowMultiple">
                                    <p>Active lot</p>
                                    <select className={styles.graphType} name="activeLot" id="">
                                        <option value="Active lot">Active lot</option>
                                    </select>
                                </div>
                                <div className="rowMultiple">
                                    <p>Current bid (User)</p>
                                    <select className={styles.graphType} name="activeLot" id="">
                                        <option value="Active lot">Select user</option>
                                    </select>
                                </div>
                                <div className="rowMultiple">
                                    <p>Amount bid</p>
                                    <input type='tel' name='amount' placeholder='12345678910' />
                                </div>
                                <div className="rowMultiple">
                                    <p>Current bid (User)</p>
                                    <select className={styles.graphType} name="activeLot" id="">
                                        <option value="Open">Open</option>
                                    </select>
                                </div>
                                <button style={{width:"fit-content", background:"#3A3930", color:"#FDFBEC"}} className='btn artFeatureBtn'> Save live update</button>
                            </form>):
                            (<form className={pageStyles.form} action="">
                                <p> <span>ADMIN ACTIONS</span></p>
                                <div className="rowMultiple">
                                    <p>Bidding phone number</p>
                                    <input type='tel' name='bidPhone' placeholder='12345678910' />
                                </div>
                                <div className="rowMultiple">
                                    <p>Auction status</p>
                                    <select className={styles.graphType} name="auctionStatus" id="">
                                        <option value="Active lot">Upcoming</option>
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
                                        <AdminLotSide name={lot.artwork.title} img={lot?.artwork?.images[1]?.url} artist={lot.artwork.artist_details.first_name} year={lot.artwork.year_created} bid={lot.artwork.price} status={lot.artwork.status} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Conditional Rendering */}
                    
                        <div style={{backgroundColor:"#F2F0DB"}} className={`${styles.winners}`}>
                            {auctionData?.status === "live" ? (
                                <>
                                    <h3>Winnings</h3>
                                    <br />
                                    <AdminWinner name={"Black or Beauty?"} img={"/images/auction/3.webp"} artist={"Sharon Bailey"} startBid={400} endBid={3000} time={"29:58"} />
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