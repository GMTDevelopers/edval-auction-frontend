'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import { toast } from 'sonner';
import ButtonLoader from '../loader/buttonloader';

const AdminArtistDetails = ({data}) => {
    const { openModal } = useModal();
    const [loading, setLoading] = useState(false);
    console.log('artist details',data);
    const accessToken = localStorage.getItem("access_token");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/admin/users/${data?.id}`, { 
            method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const rejctData = await response.json();
            if (!response.ok) {
                toast.error("Failed to delete artist.");
                console.error('Failed to delete artist');
            }
            if (response.ok) {
                toast.success("Artist deleted successfully.");
                console.log('Artist deleted successfully:', response);
                setLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            
            return rejctData;
        } catch (err) {
            setLoading(false)
            console.error('Error creating auction:', err);
            return false;
        } finally{
            setLoading(false)
        }
    }

    return ( 
        <div className={`${styles.adminArtistDetailsContainer} ${styles.container}`}>
            <div className={styles.galleryContainer}>
                <div className={styles.mainImageContainer}>
                    <img src={data?.profile_image_url || '/images/auction/3.webp'} alt='artist' className={styles.mainImage} />
                </div>
            </div>
            <div style={{gap:"14px"}} className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data?.first_name} {data?.last_name}</h2>
                    <p>Date Joined:<span> {new Date(data?.created_at).toDateString() || "N/A"}</span></p>
                    <p>Earnings:<span> ${data?.stats?.total_sales} </span></p> 
                </div>
                <p style={{lineHeight:"24px"}}>
                    {data?.artist_profile.bio}
                </p>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Studio name</p>
                        <p>{data?.artist_profile.studio_name}</p>
                    </li>
                    <li>
                        <p>Email</p>
                        <p>{data?.email}</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>{data?.phone}</span></p>
                    </li>
                    <li>
                        <p>Address</p>                        
                        <p>{data?.artist_profile.address}</p>
                    </li>
                    <li>
                        <p>City, Country</p>
                        <p>{data?.artist_profile.state}, {data?.artist_profile.country}</p>
                    </li>
                    <li>
                        <p>Artistic style</p>
                        <p>{data?.artist_profile.artistic_style}</p>
                    </li>
                    <li>
                        <p>Years of experience</p>
                        <p>{data?.artist_profile.years_of_experience} years</p>
                    </li>
                    <li>
                        <p>Account number</p>
                        <p>{data?.artist_profile.account_number}</p>
                    </li>
                    <li>
                        <p>Bank name</p>
                        <p>{data?.artist_profile.bank_name}</p>
                    </li>
                    <li>
                        <p>Artworks</p>
                        <p>{data?.stats.total_artworks}</p>
                    </li>
                </div>
                <br />
                <div className="double">
                    {/* <p>Mark inactive</p> */}
                    <p onClick={handleDelete} style={{color:"#FB0000", cursor:'pointer'}}>{loading ? <ButtonLoader /> : "Delete artist"}</p>
                    
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminArtistDetails;