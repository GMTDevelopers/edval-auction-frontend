'use client';

import styles from './galleryDet.module.css';
import GalleryCard from "@/app/(components)/cards/galleryCard";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ArtworkDetail from "@/app/(components)/lotDetail/artworkDetail";
import Loader from '@/app/(components)/loader/loader';
import { ChevronLeft } from 'lucide-react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GetArtwork = async (slug) => {
  try {
    const response = await fetch(`${BASE_URL}/artworks/${slug}`, { 
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
    console.log("artwork",data)
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
const GetRelatedArtwork = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/artworks?category=${category}&limit=4&offset=0`, { 
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
    console.log("artwork",data)
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
const GalleryDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const [artwork, setArtwork] = useState({});
    const [relArtwork, setRelArtwork] = useState([]);
    const {slug} = useParams()
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const router = useRouter();
    useEffect(() => {
        console.log('searchParams', category.toString())
        const trying = async () => {
            setLoading(true);
            const result = await GetArtwork(slug);
            const relResult = await GetRelatedArtwork(category.toString())
            if (result.success) {
                setArtwork(result.data);
            }
            if (relResult.success) {
                setRelArtwork(relResult.data.data);
                console.log('relatied works', relResult.data.data )
            }
    
          setLoading(false);
        };
        trying()
    }, []);
    {/* if we get here by slug you need to filter by slog*/}
    return ( 
      <div>
        <div style={{display:"flex", width:"100%", justifyContent:"space-between", alignSelf:"flex-start"}}>
          <div onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <p><span>go back</span></p> </div>
        </div>
        {loading?<div className='emptyCont'> <Loader /> </div>: <ArtworkDetail className={`container ${styles.detailsContainer}`} data={artwork.data}/>}
        {!loading && <div className="upcomingAuctions">
          <div className="container">
            <div>
              <p className="subHeading">GALLERY</p>
              <h2>Related Artworks</h2>
            </div>
            <div className="row4">
              {
                relArtwork && relArtwork?.map((data)=>(
                  <GalleryCard key={data.id} category={data.category} slug={data.slug} name={data.title} price={data.price} img={data.images[0].url} artist={data.artist_details.first_name || data.artist_details.first_name}/>
                ))
              }
            </div>
          </div>
        </div>}
      </div>
    );
}
 
export default GalleryDetailsPage ;