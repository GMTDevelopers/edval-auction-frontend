import AuctionCard from "@/app/(components)/cards/auctionCard";
import styles from "./auctions.module.css";

const auctionData = [
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
const AuctionPage = () => {
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
                    <div className="row3">
                        {
                            auctionData.map((data)=>(
                                <AuctionCard key={data.id} name={data.name} price={data.startingBid} img={data.img} time={data.time} status={data.status}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AuctionPage;