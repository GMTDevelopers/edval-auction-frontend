'use client';

import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './slider.module.css';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const profiles = [
  {
    id: 1,
    name: "Elisa Matthias",
    joined: 2024,
    submissions: 3,
    image: "/images/featured/1.png", // replace with your image paths
  },
  {
    id: 2,
    name: "Priya Singh",
    joined: 2020,
    submissions: 17,
    image: "/images/featured/2.png",
  },
  {
    id: 3,
    name: "Jordan Lee",
    joined: 2023,
    submissions: 8,
    image: "/images/featured/3.png",
  },
  {
    id: 4,
    name: "Carlos Gomez",
    joined: 2021,
    submissions: 12,
    image: "/images/featured/4.png",
  },
  {
    id: 5,
    name: "Amina Patel",
    joined: 2022,
    submissions: 9,
    image: "/images/featured/5.png",
  },
  {
    id: 6,
    name: "David Kim",
    joined: 2024,
    submissions: 4,
    image: "/images/featured/6.png",
  },
  {
    id: 7,
    name: "Carlos Gomez",
    joined: 2021,
    submissions: 12,
    image: "/images/featured/4.png",
  },
  {
    id: 8,
    name: "Amina Patel",
    joined: 2022,
    submissions: 9,
    image: "/images/featured/5.png",
  },
  {
    id: 9,
    name: "David Kim",
    joined: 2024,
    submissions: 4,
    image: "/images/featured/6.png",
  }
];

const ProfileSlide = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
            dragFree: false,
        },
        [
            Autoplay({
                delay: 2000,                 // 3 seconds per slide
                stopOnInteraction: true,
                stopOnMouseEnter: true,      // ← Pause on hover
                stopOnFocusIn: true,         // Also pause when focused (accessibility)
            }),
        ]
    );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

  // Restart autoplay after manual navigation
    useEffect(() => {
        if (!emblaApi) return;

        const autoplay = emblaApi.plugins().autoplay;
        if (!autoplay) return;

        const restartAutoplay = () => autoplay.play();

        emblaApi
        .on('select', restartAutoplay)
        .on('pointerUp', restartAutoplay);

        return () => {
        emblaApi
            .off('select', restartAutoplay)
            .off('pointerUp', restartAutoplay);
        };
    }, [emblaApi]);
    
    return ( 
        <div className={styles.sliderContainer}>
            {/* Carousel Viewport */}
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.slideContainer}>
                    {profiles.map((profile) => (
                        <div key={profile.id} className={styles.slide}>
                            <div className={styles.imageWrapper}>
                                <img src={profile.image} alt={profile.name} className={styles.profileImage} />
                            </div>
                            <h3 className={styles.name}>{profile.name}</h3>
                            <p className={styles.joined}>Joined {profile.joined}</p>
                            <p className={styles.submissions}>
                                {profile.submissions} Submissions
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrows */}
            <div onClick={scrollPrev} className={styles.arrowLeft} aria-label="Previous">
                <ArrowLeft />
            </div>

            <div onClick={scrollNext} className={styles.arrowRight} aria-label="Next">
               <ArrowRight />
            </div>
        </div>
    );
}
 
export default ProfileSlide;