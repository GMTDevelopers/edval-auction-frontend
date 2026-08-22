'use client'
import GalleryCard from '@/app/(components)/cards/galleryCard';
import styles from './gallery.module.css';
import GalSearch from '@/app/(components)/gallerySearch/page';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/app/(components)/loader/loader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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

const GetArtworks = async (filter) => {
  try {
    const params = new URLSearchParams({
      limit: 10000,
      offset: 0,
      request_type: "gallery",
    });

    if (filter.search) params.append("search", filter.search);
    if (filter.artist_name) params.append("artist_name", filter.artist_name);
    if (filter.artwork_type) params.append("artwork_type", filter.artwork_type);
    if (filter.theme) params.append("theme", filter.theme);

    const response = await fetch(`${BASE_URL}/artworks?${params.toString()}`, { 
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
    console.log(data)
    return {
      success:true,
      data: data
    };
  } catch (err) {
    console.log(err)
    return {
      success: false,
      err,
    };
  }
};
const Gallery = () => {
  const router = useRouter();
  const [artworks, setArtworks] = useState([]);
  const [filter, setFilter] = useState({
    artwork_type:'',
    search:'',
    artist_name:'',
    theme:''
  });
  const [loading, setLoading] = useState(true);
  const handleSubmit = (searchValues) => {
    setFilter({
      artwork_type: searchValues.artType.join(","),
      search: searchValues.keywords,
      artist_name: searchValues.artist,
      theme: searchValues.themes.join(","),
    });
  };
  useEffect(() => {
    const trying = async () => {
      setLoading(true);

      const result = await GetArtworks(filter);

      if (result.success) {
        setArtworks(result.data);
      }

      setLoading(false);
    };
    trying()
  }, [filter]);

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
            <GalSearch onSubmit={handleSubmit}/>
          </div>
          {  loading? 
            <div className="emptyCont">
              
              <Loader />
            </div>: 
            <div className="row4">              
              {artworks?.data?.map((data)=>(
                <GalleryCard key={data.id} category={data.category} slug={data.slug} name={data.title} price={data.price} img={data.images[0].url} artist={data.artist_details.first_name || data.artist_details.first_name}/>
              )) }               
            </div>
          } 
        </div>
      </div>
    </div>
  );
}
 
export default Gallery;