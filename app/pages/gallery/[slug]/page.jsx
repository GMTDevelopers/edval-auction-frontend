import LotDetails from "@/app/(components)/lotDetail/page";
const galleryData = [
    {
      "id":1,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery1.webp"
    },
    {
      "id":2,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery6.webp"
    },
    {
      "id":3,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery4.webp"
    },
    {
      "id":4,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery8.webp"
    },
]
import styles from './galleryDet.module.css';
import GalleryCard from "@/app/(components)/cards/galleryCard";
const GalleryDetailsPage = () => {

    {/* if we get here by slug you need to filter by slog*/}
    return ( 
        <div>
            <LotDetails className={`container ${styles.detailsContainer}`} data={galleryData[0]}/>
            <div className="upcomingAuctions">
                <div className="container">
                    <div>
                        <p className="subHeading">GALLERY</p>
                        <h2>Related Artworks</h2>
                    </div>
                    <div className="row4">
                        {
                            galleryData.map((data)=>(
                                <GalleryCard key={data.id} slug={data.slug} name={data.name} price={data.price} img={data.img} artist={data.artist}/>))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default GalleryDetailsPage ;