'use client';
import styles from './exhibition.module.css';

const ExhibitionDetails = () => {
   
    const data = {
        "id":1,
        "name": "Lagos Art Exhibition - Summer 2026",
        "slug":"lagos-art-exhibition",
        "attending":112,
        "time": " 10:00 AM",
        "venue": "102, Allen Avenue, Bypass Junction, Ikeja, Lagos",
        "date": "June 23, 2026",
        "status":"Available",
        "description":"The Lagos Art Expo serves as a living, breathing canvas that captures the tumultuous beauty and electric pulse of Africa's ultimate megacity. This premier exhibition dissolves the boundaries between ancestral heritage and raw modernism, gathering a fearless collective of visionary masters and radical emerging artists under one roof. It is a sensory manifestation of Lagos itself—a space where the air vibrates with ambition, history, and the relentless drive to create. Visitors are invited to step into an immersive world where the city’s complex identity is laid bare through a kaleidoscope of color, texture, and form. Every corner of the exhibition tells a story of survival, celebration, and reinvention. Powerful oil paintings capture the chaotic symphony of the streets, while towering mixed-media sculptures constructed from recycled materials reflect the city's innovative spirit. Avant-garde digital installations seamlessly blend traditional folklore with futuristic landscapes, offering a profound commentary on cultural evolution in a hyper-connected age. The expo is curated not merely to be viewed, but to be felt, guiding guests on a journey through the intimate alleyways of human emotion and the grand vistas of urban transformation.",
        "img": "/images/exhibition/ex1.webp"
    }

    
    return ( 
        <div className={styles.container}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <img src={data.img} alt="exhibition" className={styles.mainImage} />
            </div>
            <div className={styles.detailsContainer}>
                
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Venue</p>
                        <p>{data.venue}</p>
                    </li>
                    <li>
                        <p>Date</p>
                        <p>{data.date}</p>
                    </li>
                    <li>
                        <p>Time</p>
                        <p>{data.time}</p>
                    </li>
                    <li>
                        <p>Attendance</p>
                        <p>{data.attending} Attendance</p>
                    </li>
                </div>
                <p style={{lineHeight:"24px"}}>
                    {data.description}
                </p>
                <div className={`btn ${styles.addToCart}`}>I will be attending</div>
            </div>
            
        </div>
    );
}
 
export default ExhibitionDetails;