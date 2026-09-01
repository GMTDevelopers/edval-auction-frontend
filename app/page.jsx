'use client'
import styles from "./page.module.css";
import { ArrowRight, Minus, Plus } from "lucide-react";
import AuctionCard from "./(components)/cards/auctionCard";
import ProfileSlide from "./(components)/slider/page";
import GalleryCard from "./(components)/cards/galleryCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./(components)/loader/loader";
import { useAuth } from "./context/authContext";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const getAuctionData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auctions?status=upcoming,live&limit=3&offset=0`, {
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
const GetArtworks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/artworks?limit=8&offset=0&status=approved&request_type=gallery`, { 
    method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw( 
        response.status,
        data.error|| "failed to get Artworks"
      )
    }
/*     console.log(data) */
    return {
      success:true,
      data: data
    };
  } catch (err) {
/*     console.log(err) */
    return {
      success: false,
      err,
    };
  }
};

export default function Home() {
  const {user} = useAuth();
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

  const galleryData = [
    {
      "id":1,
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery1.webp"
    },
    {
      "id":2,
      "name":"The Morning Chorus",
      "price":"320",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery2.webp"
    },
    {
      "id":3,
      "name":"A Walk Through the Mist",
      "price":"150",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery3.webp"
    },
    {
      "id":4,
      "name":"Flight of the Fluid Phoenix",
      "price":"500",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery4.webp"
    },
    {
      "id":5,
      "name":"The Unfinished Journey",
      "price":"410",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery5.webp"
    },
    {
      "id":6,
      "name":"Sisters of the Sound",
      "price":"200",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery6.webp"
    },
    {
      "id":7,
      "name":"Strings Under the Brim",
      "price":"170",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery7.webp"
    },
    {
      "id":8,
      "name":"Drifting Through the Reeds",
      "price":"120",
      "artist":"Michael Scarlet",
      "img": "/images/homepage/gallery8.webp"
    },
  ]
  const [isOpen, setIsOpen] = useState("Q1");
  const router = useRouter()
  const [auctionData, setAuctionData] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        setLoading(true);
        const data = await getAuctionData();
        const result = await GetArtworks();
        setAuctionData(data.data);
        setArtworks(result.data || []);
       /*  console.log('artwork', result.data) */
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }finally{
        setLoading(false);
      }
    }
    fetchAuctionData();
  }, [user]);
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.bannerTxt}>
          <h1> Discover, Bid, & Collect Art from Around the World. </h1>
          <p>A curated destination for live art auctions, exhibitions, fine art sales, and artist discovery.</p>
        </div>
        <div className={`btn ${styles.bannerBtn}`} onClick={()=>router.push('/pages/gallery')}> Explore our collection</div>
        <img src="/images/homepage/bannerImgCroped.webp" alt="banner" />
      </header>
      <section className={styles.liveBidding}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.shrow1}>
              <p className="subHeading">LIVE BIDDING</p>
              <h2>Upcoming Auctions</h2>
            </div>
            <div onClick={()=>router.push('/pages/auctions')} className="btn">
              <p>View all</p>
              <ArrowRight />
            </div>
          </div>
          { loading? 
            <div className="emptyCont">
              <Loader /> 
            </div>:
            <div className="row3">
              {
                auctionData?.length > 0 && auctionData?.map((data)=>(
                  <AuctionCard key={data.id} auctionId={data.id} name={data.name} price={data.min_participation_amount} img={data.img || `/images/homepage/auction1.png`} duration={data.duration_minutes} time={data.scheduled_at} startTime={data.started_at} auctStatus={data.status} slug={data.slug}/>
                ))
              }
              {
                auctionData?.length===0 && defaultAuctionData?.map((data)=>(
                  <AuctionCard key={data.id} auctionId={data.id} name={data.name} price={data.startingBid} img={data.img} time={data.time} status={data.status}/>
                ))
              }
            </div>
          }
        </div>
      </section>
      <section className={styles.featuredArtists}>
        <div className='container'>
          <div className="headerCenter">
            <p className="subHeading">EDVAL ART AUCTION</p>
            <h2>Our Featured Artists</h2>
          </div>
          <ProfileSlide />
        </div>
      </section>
      <section className={styles.liveBidding}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.shrow1}>
              <p className="subHeading">MARKETPLACE</p>
              <h2>ART GALLERY</h2>
            </div>
            <div onClick={()=>router.push('/pages/gallery')} className="btn">
              <p>View all</p>
              <ArrowRight />
            </div>
          </div>
          { loading? 
            <div className="emptyCont">
              <Loader /> 
            </div>:
            <div className="row4">
              {
                artworks?.data?.length > 0 && artworks?.data?.map((data)=>(
                  <GalleryCard key={data.id} category={data.category} slug={data.slug} name={data.title} price={data.price} img={data.images[0].url} artistFirst={data.artist_details.first_name} artistLast={data.artist_details.last_name}/>
                ))
              }
              {
                artworks?.data?.length === 0 && galleryData.map((data)=>(
                  <GalleryCard key={data.id} name={data.name} price={data.price} img={data.img} artist={data.artist}/>
                ))
              }
            </div>
          }
        </div>
      </section>
      <section id="aboutUs" className={styles.aboutUs}>
        <div className={`container ${styles.aboutContainer}`}>
            <img src="/images/homepage/aboutUs.png" alt="about us" />
            <div className={styles.aboutTxt}>
              <div className={styles.aboutTxtHeader}>
                <p className="subHeading">ABOUT US</p>
                <h2>What Makes us Special</h2>
                <p>We operate as a central hub for showcasing live auctions, managing participants, and selling original artworks. We connect visionary creators with passionate collectors through a premium, world-class digital gallery experience.</p>
              </div>
              <div className={styles.aboutcardPack}>
                <div className={styles.aboutcard}>
                  <h3>Live Auctions</h3>
                  <p>Scheduled events streamed live on YouTube where individual artworks are sold as lots sequentially. Approved, pre-registered users place bids manually over direct phone calls.</p>
                </div>
                <div className={styles.aboutcard}>
                  <h3>Art Gallery</h3>
                  <p>An e-commerce marketplace separate from live auctions for immediate art purchases. Add items to your cart, check out securely online, and select either home delivery or physical gallery pickup.</p>
                </div>
                <div className={styles.aboutcard}>
                  <h3>Portrait Commissions</h3>
                  <p>Custom artwork tailored directly to your personal vision. Submit your project description, budget, and reference images, then track the progress of your order online.</p>
                </div>
                <div className={styles.aboutcard}>
                  <h3>Exhibitions & Artists</h3>
                  <p>Explore upcoming exhibition itineraries and virtual event live streams. Creators can register accounts and submit portfolios for curation, auction, or gallery sales placement.</p>
                </div>
              </div>

            </div>
        </div>
      </section>
      <section className={styles.FAQ}>
        <div className={styles.faqContainer}>
          <div className="headerCenter">
            <p className="subHeading">EDVAL ART AUCTION</p>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className={styles.questionPacks}>
            <div className={styles.questionPack}>
              <div className={styles.questionHeader} onClick={()=>isOpen!=="Q1"?setIsOpen("Q1"):setIsOpen("")}>
                <h3>What is an Art Auction?</h3>
                {isOpen==="Q1"? <Minus /> : <Plus className={`${styles.icon} ${isOpen === "Q1" ? styles.iconOpen : ""}`} />}
              </div>
              <p className={isOpen==="Q1"? styles.answer: styles.answerNoShow }>
                An art auction is a public sale where artwork is sold to the highest bidder. Auctions can be held in person, online, or as a combination of both.
              </p>
            </div>

            <div className={styles.questionPack}>
              <div className={styles.questionHeader} onClick={()=>isOpen!=="Q2"?setIsOpen("Q2"):setIsOpen("")}>
                <h3>How do the live auction events work?</h3>
                {isOpen==="Q2"? <Minus /> : <Plus />}
              </div>
              <p className={isOpen==="Q2"? `${styles.answer}`: `${styles.answerNoShow}` }>
                Each auction is a scheduled live event where multiple artworks are sold one at a time as individual lots. The auction is streamed live via YouTube, and the website displays the live video stream for public viewing.
              </p>
            </div>

            <div className={styles.questionPack}>
              <div className={styles.questionHeader} onClick={()=>isOpen!=="Q3"?setIsOpen("Q3"):setIsOpen("")}>
                <h3>How do I place a bid during a live auction?</h3>
                {isOpen==="Q3"? <Minus /> : <Plus />}
              </div>
              <p className={isOpen==="Q3"? `${styles.answer}`: `${styles.answerNoShow}` }>
                An art auction is a public sale where artwork is sold to the highest bidder. Auctions can be held in person, online, or as a combination of both.
              </p>
            </div>
            
            <div className={styles.questionPack}>
              <div className={styles.questionHeader} onClick={()=>isOpen!=="Q4"?setIsOpen("Q4"):setIsOpen("")}>
                <h3>What happens if I win an auction lot?</h3>
                {isOpen==="Q4"? <Minus /> : <Plus />}
              </div>
              <p className={isOpen==="Q4"? `${styles.answer}`: `${styles.answerNoShow}` }>
                An art auction is a public sale where artwork is sold to the highest bidder. Auctions can be held in person, online, or as a combination of both.
              </p>
            </div>
            
            <div className={styles.questionPack}>
              <div className={styles.questionHeader} onClick={()=>isOpen!=="Q5"?setIsOpen("Q5"):setIsOpen("")}>
                <h3>Can I purchase artwork directly without participating in an auction?</h3>
                {isOpen==="Q5"? <Minus /> : <Plus />}
              </div>
              <p className={isOpen==="Q5"? `${styles.answer}`: `${styles.answerNoShow}` }>
                An art auction is a public sale where artwork is sold to the highest bidder. Auctions can be held in person, online, or as a combination of both.
              </p>
            </div>
            
            <div className={styles.questionPack}>
              <div className={styles.questionHeader} onClick={()=>isOpen!=="Q6"?setIsOpen("Q6"):setIsOpen("")}>
                <h3>Can I purchase artwork directly without participating in an auction?</h3>
                {isOpen==="Q6"? <Minus /> : <Plus />}
              </div>
              <p className={isOpen==="Q6"? `${styles.answer}`: `${styles.answerNoShow}` }>
                An art auction is a public sale where artwork is sold to the highest bidder. Auctions can be held in person, online, or as a combination of both.
              </p>
            </div>
          
          </div>
        </div>
      </section>
      <section className="artFeature">
        <div className="container">       
          <div className="artFeatureTxt">
            <h2>Do you want your artwork featured on Edval Art Auction?</h2>
            <p>We welcome submissions from emerging and established artists interested in exhibition opportunities, gallery representation, and auction consideration. Provide details about yourself and the artwork you would like reviewed. Our curatorial team will assess submissions and contact selected artists regarding next steps.</p>
            <div onClick={()=> {router.push('/user/artist/artistRegistration')}} className="btn artFeatureBtn">Create Account</div>
          </div>
        </div>
      </section>
    </div>
  );
}
