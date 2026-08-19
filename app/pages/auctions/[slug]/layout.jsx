import AuctionCard from "@/app/(components)/cards/auctionCard";
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
const AuctionLayout = ({ children }) => {
    return ( 
        <div>
            {children}
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
 
export default AuctionLayout;