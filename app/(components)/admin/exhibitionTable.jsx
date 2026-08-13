'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import { toast } from 'sonner';
import Loader from '../loader/loader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const AdminExhibitionDetails = ({data}) => {
    const { closeModal } = useModal();
    const router = useRouter();
    const accessToken = localStorage.getItem("access_token");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/admin/exhibitions/${data?.id}`, { 
            method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const rejctData = await response.json();
            if (!response.ok) {
                toast.error("Failed to delete artwork.");
                console.error('Failed to delete artwork');
            }
            if (response.ok) {
                toast.success("Artwork deleted successfully.");
                console.log('Artwork deleted successfully:', response);
                setTimeout(() => {
                    /* closeModal() */
                    window.location.reload();
                }, 3000);
            }
            
            return rejctData;
        } catch (err) {
            console.error('Error creating auction:', err);
            return false;
        } finally {
            setLoading(false)
        }
    }

    return ( 
        <div className={`${styles.adminArtistDetailsContainer} ${styles.container}`}>
            <div className={styles.galleryContainer}>
                <div className={styles.mainImageContainer}>
                    <img src={data?.banner_url || '/images/exhibition/ex1.webp'} alt='artist' className={styles.mainImage} />
                </div>
            </div>
            <div style={{gap:"14px"}} className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data.title}</h2>
                </div>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Venue</p>
                        <p>{data.venue}</p>
                    </li>
                    <li>
                        <p>Date</p>
                        <p>{new Date(data?.start_date).toDateString() || "N/A"}</p>
                    </li>
                    <li>
                        <p>Time</p>
                        <p>{new Date(data?.start_date).toLocaleTimeString('en-US',{hour: '2-digit', minute: '2-digit', hour12: true}) || "N/A"}</p>
                    </li>
                    <li>
                        <p>Attendance</p>
                        <p>{data?.attendance_count}</p>
                    </li>
                </div>

                <p style={{lineHeight:"24px"}}>
                    {data?.description}
                </p>
                <br />
                <div className="double">
                    <p style={{cursor: "pointer"}} onClick={()=>{router.push(`/admin/exhibitions/editExhibition?id=${data.id}`); closeModal()}}>Edit exhibition</p>
                    
                    <p style={{color:"#FB0000", cursor: "pointer"}} onClick={handleDelete}>{ loading? <Loader /> : "Delete exhibition"}</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminExhibitionDetails;