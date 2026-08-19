'use client'
import LotSide from '@/app/(components)/sideCard/lot';
import styles from './prodDet.module.css';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import Tab from '@/app/(components)/tab/tabs';
import { useEffect, useState } from 'react';
import AuctionRegistration from '@/app/(components)/auctionReg/page';
import { Ban } from 'lucide-react';
import LotDetails from '@/app/(components)/lotDetail/page';
import Winner from '@/app/(components)/sideCard/winner';
import { useParams, useSearchParams } from 'next/navigation';
import Countdown from '@/app/(components)/counter/page';
import { refreshUser } from '@/app/services/authServices';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const availableLot = [
    {
      "id":1,
      "name":"Black or Beauty?",
      "artist":"Sharon Bailey",
      "startingBid":"400",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/auction/3.webp"
    },
    {
      "id":2,
      "name":"Dancing in the Wind",
      "artist":"GMTarts Studio",
      "startingBid":"300",
      "year": 2025,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/auction/1.webp"
    },
    {
      "id":3,
      "name":"Calm, Open, Free",
      "artist":"GMT campaign",
      "startingBid":"400",
      "year": 2026,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/auction/2.webp"
    }
  ]

const ProdDetPage =  () => {
    const { openModal } = useModal();
    const [isLogin, setIsLogin] = useState(false);
    const [isWinner, setIsWinner] = useState(true);
    const {slug} = useParams();
    const searchParams = useSearchParams()
    const auctId = searchParams.get('auctionID')
    const [auctionData, setAuctionData] = useState(null);
    const [auctionLotData, setAuctionLotData] = useState(null);
    const [auctionLotDataPass, setAuctionLotDataPass] = useState(null);
    const [status, setStatus] = useState();

    const getAuction = async () => {
        console.log('slug data', slug)
        try {
            const response = await fetch(`${BASE_URL}/auctions/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setAuctionData(data?.data);
            setStatus(data?.data?.status)
            console.log("auction data:", data);
        } catch (err) {
        /*   setError(err); */
            return {
                success: false,
                error: err.message,
                status: err.status,
            };
        }
    }

    const getAuctionLots = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auctions/${auctId}/lots`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setAuctionLotData(data?.data);
            setAuctionLotDataPass(data);
            
            console.log("auction lots data:", data.data);
        } catch (err) {
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
            <div className={`container ${styles.double}`}>
                <div className={styles.big}>
                    <img className={styles.streamVideo} src="/images/auction/live.webp" alt="live" />
                    <h2>{auctionData?.name||"Sisters of the Sound - Art Auction (LIVE)"}</h2>
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
                                {/*the button (components) needs to have conditional rendering */}
                                <div className={`btn ${styles.timerBtn}`} onClick={()=>isLogin ? openModal(<Tab />): openModal(<AuctionRegistration auctionId={auctionData.id} auctionLot={auctionLotData} />)}>Register to participate</div>
                            </div>
                        </div> : 
                        <div className={styles.endsIn}>
                            <p>Auction Starts in</p>
                            <div className={styles.timerPack}>
                                <div className={styles.timerPackUp}>
                                    <p>{new Date(auctionData?.scheduled_at).toDateString()}</p>
                                    <p>{new Date(auctionData?.scheduled_at).toLocaleTimeString()}</p>
                                </div>
                                
                                {/*the button (components) needs to have conditional rendering */}
                                <div className={`btn ${styles.timerBtn}`} onClick={()=>isLogin ? openModal(<Tab />): openModal(<AuctionRegistration auctionId={auctionData.id} auctionLot={auctionLotData} />)}>Register to participate</div>
                            </div>
                        </div>
                    }
                    {/* Conditionaly rendered */}
                    {auctionData?.status==='live'&&<form className={styles.placeBid} action="">
                        <input type="number" step={0.01} id='bid' name="bid" placeholder='Enter your bid here...' />
                        <button className=''> place bid</button>
                    </form> }
                    {auctionData?.status==='live'&&<div className={styles.statsPack}>
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
                    </div>}
                </div>
                <div className={styles.small}>
                    <div className={styles.smallPack}>
                        <h3>Available Lots (3)</h3>
                        <div className={styles.sideLots}>
                        
                            {
                                auctionLotData?.map((lot)=>(
                                    <div onClick={() => {openModal(<LotDetails data={lot}/>)} } key={lot.id}>    
                                        <LotSide id={lot.id} name={lot.artwork.title} img={lot?.artwork?.images[1]?.url} artist={lot.artwork.artist_details.first_name} year={lot.artwork.year_created} bid={lot.artwork.price} status={lot.artwork.status} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Conditional Rendering */}
                    <div style={{backgroundColor: isWinner ? "#FADB5D" : "#F2F0DB"}} className={`${styles.winners}`}>
                        <h3>Winnings</h3>
                        <br />
                        {
                            isWinner ? 
                     
                            <Winner name={"Black or Beauty?"} img={"/images/auction/3.webp"} artist={"Sharon Bailey"} startBid={400} endBid={3000} time={"29:58"} />
                            : <div className={styles.noWinner}>
                                    <Ban color={"var(--text-primary)"} size={37}/>
                                    <p className={styles.noWinnerHeading}>No Winnings Yet</p>
                                    <p>The lots you win will appear here. Payment window for each winning lot is 30 minutes after which the lot will be re-awarded to another participant.</p>
                                </div> 
                                        
                        }
                    </div> 
                </div>
            </div>
        </div>
    );
}
 
export default ProdDetPage;