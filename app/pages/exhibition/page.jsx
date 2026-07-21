import ExhibitionCard from '@/app/(components)/cards/exhibitionCard';
import styles from './exhibition.module.css';
import PastExhibitionCard from '@/app/(components)/cards/pastExhibition';

const galleryData = [
    {
      "id":1,
      "name": "Lagos Art Exhibition - Summer 2026",
      "slug":"lagos-art-exhibition",
      "attending":112,
      "time": " 10:00 AM",
      "venue": "102, Allen Avenue, Bypass Junction, Ikeja, Lagos",
      "date": "June 23, 2026",
      "status":"Available",
      "img": "/images/exhibition/ex1.webp"
    },
    {
      "id":2,
      "name": "Contemporary Art Fair ",
      "slug": "contemporary-art-fair ",
      "attending":112,
      "time": " 10:00 AM",
      "venue": "102, Allen Avenue, Bypass Junction, Ikeja, Lagos",
      "date": "June 23, 2026",
      "status":"Available",
      "img": "/images/exhibition/ex2.webp"
    },
]

const Exhibition = () => {
    return ( 
        <div>
            <div className='headerCenter pageHeader'>
                <h1>Art Meant to Be Experienced, Not Simply Viewed.</h1>
                <p>
                    Explore exhibitions that transform artworks into immersive encounters through atmosphere, storytelling, curation, and contemporary visual culture
                </p>
            </div>
            <div className={styles.banner}>
                <img src="/images/exhibition/exhibition.webp" alt="banner" />
            </div>
            <div className="upcomingAuctions">
                <div className="container">
                    <div>
                        <p className="subHeading">EDVAL ART AUCTION</p>
                        <h2>Upcoming Exhibitions</h2>
                    </div>
                    <div className="row2">
                        {
                            galleryData.map((data)=>(
                                <ExhibitionCard key={data.id} slug={data.slug} name={data.name} venue={data.venue} img={data.img} time={data.time} date={data.date} status={data.status} attending={data.attending}/>))
                        }
                    </div>
                </div>
            </div>
            <section className={styles.pastExhibition}>
                <div className='container'>
                    <div className="headerCenter">
                        <p className="subHeading">EDVAL ART AUCTION</p>
                        <h2>Past Exhibitions</h2>
                    </div>
                    <div className="row3">
                        {
                            galleryData.map((data)=>(
                                <PastExhibitionCard key={data.id} name={data.name} img={data.img} date={data.date} attending={data.attending}/>))
                        }
                    </div>
                </div>
            </section>
            <section className="artFeature">
                <div className="container">       
                    <div className="artFeatureTxt">
                        <h2>Do you want your artwork featured on Edval Art Auction?</h2>
                        <p>We welcome submissions from emerging and established artists interested in exhibition opportunities, gallery representation, and auction consideration. Provide details about yourself and the artwork you would like reviewed. Our curatorial team will assess submissions and contact selected artists regarding next steps.</p>
                        <div className="btn artFeatureBtn">Fill request form</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default Exhibition;