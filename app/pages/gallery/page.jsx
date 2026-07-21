'use client'
import GalleryCard from '@/app/(components)/cards/galleryCard';
import styles from './gallery.module.css';
import GalSearch from '@/app/(components)/gallerySearch/page';
import { useRouter } from 'next/navigation';
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
        "slug": "the-morning-chorus",
      "name":"The Morning Chorus",
      "price":"320",
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
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery2.webp"
    },
    {
      "id":3,
      "name":"A Walk Through the Mist",
      "slug":"a-walk-through-the-mist",
      "price":"150",
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
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery3.webp"
    },
    {
      "id":4,
      "name":"Flight of the Fluid Phoenix",
      "price":"500",
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
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery4.webp"
    },
    {
      "id":5,
      "name":"The Unfinished Journey",
      "price":"410",
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
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery5.webp"
    },
    {
      "id":6,
      "name":"Sisters of the Sound",
      "price":"200",
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
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery6.webp"
    },
    {
      "id":7,
      "name":"Strings Under the Brim",
      "price":"170",
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
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery7.webp"
    },
    {
      "id":8,
      "name":"Drifting Through the Reeds",
      "price":"120",
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
      "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery8.webp"
    },
]

const Gallery = () => {
    const router = useRouter()
    const handleSearchSubmit = (formData) => {

        console.log(formData);

        // API call here
        // validation
        // router.push()
    };


    return ( 
        <div>
            <div className='headerCenter pageHeader'>
                <h1>Explore Our Curated Collection</h1>
                <p>
                    Discover an exquisite selection of contemporary masterpieces, meticulously sourced from renowned global artists and emerging talents.
                </p>
            </div>
            <div className="upcomingAuctions">
                <div className="container">
                    <div>
                        <GalSearch onSubmit={handleSearchSubmit}/>
                    </div>
                    <div className="row4">
                        {
                            galleryData.map((data)=>(
                                <GalleryCard key={data.id} slug={data.slug} name={data.name} price={data.price} img={data.img} artist={data.artist}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Gallery;