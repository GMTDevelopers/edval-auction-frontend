'use client'
import styles from '@/app/pages/auctions/productDetails/prodDet.module.css';
import pageStyles from './page.module.css';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { useState } from 'react';
import { Ban, ChevronLeft } from 'lucide-react';
import LotDetails from '@/app/(components)/lotDetail/page';
import AdminWinner from '@/app/(components)/sideCard/adminWinner';
import { useRouter } from 'next/navigation';
import RegisteredBidders from '@/app/(components)/admin/registeredBidders/page';
import AdminLotSide from '@/app/(components)/sideCard/adminLot';

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

const ProdDetPage = () => {
    const { openModal } = useModal();
    const [isLogin, setIsLogin] = useState(false)
    const [isWinner, setIsWinner] = useState(true)
    const router = useRouter();
    return ( 
        <div className={styles.auctionPack}>
            <div style={{display:"flex", alignSelf:"flex-start"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <p><span>go back</span></p> </div>
            <br /><br />
            <div className={`container double`}>
                <div className={styles.big}>
                    <img className={styles.streamVideo} src="/images/auction/live.webp" alt="live" />
                    <h2>Sisters of the Sound - Art Auction (LIVE)</h2>
                    <p>Artworks: <span> Black or Beauty?, Dancing in the Wind, Calm & Open </span> </p>
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
                    <div>
                        <form className={pageStyles.form} action="">
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
                        </form>
                    </div>
                </div>
                <div className={styles.small}>
                    <div className={styles.smallPack}>
                        <h3>Available Lots (3)</h3>
                        <div className={styles.sideLots}>
                            {
                                availableLot.map((lot)=>(
                                    <div key={lot.id}>    
                                        <AdminLotSide name={lot.name} img={lot.img} artist={lot.artist} year={lot.year} bid={lot.startingBid} status={lot.status} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Conditional Rendering */}
                    <div style={{backgroundColor:"#F2F0DB"}} className={`${styles.winners}`}>
                        <h3>Winnings</h3>
                        <br />
                        {
                            isWinner ? 
                            <AdminWinner name={"Black or Beauty?"} img={"/images/auction/3.webp"} artist={"Sharon Bailey"} startBid={400} endBid={3000} time={"29:58"} />
                            :   <div className={styles.noWinner}>
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