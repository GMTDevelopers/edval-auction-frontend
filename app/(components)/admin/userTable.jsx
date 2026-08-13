'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import { toast } from 'sonner';
import ButtonLoader from '../loader/buttonloader';

const AdminUserDetails = ({data}) => {
    const { openModal } = useModal();
    const [loading, setLoading] = useState(false);
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
                toast.error("Failed to delete user.");
                console.error('Failed to delete user');
            }
            if (response.ok) {
                toast.success("User deleted successfully.");
                console.log('user deleted successfully:', response);
                setLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            
            return rejctData;
        } catch (err) {
            console.error('Error creating auction:', err);
            return false;
        } finally{
            setLoading(false);
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
                </div>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Email</p>
                        <p>{data?.email}</p>
                    </li>
                    <li>
                        <p>Phone number</p>
                        <p><span>{data?.phone}</span></p>
                    </li>
                    <li>
                        <p>Date joined</p>
                        <p>{new Date(data?.created_at).toDateString() || "N/A"}</p>
                    </li>
                    <li>
                        <p>Platform purchases</p>
                        <p>${data?.metrics.platform_purchases_total}</p>
                    </li>
                    <li>
                        <p>Auctions registered</p>
                        <p>{data?.metrics.auctions_registered_count}</p>
                    </li>
                    <li>
                        <p>Exhibitions attended</p>
                        <p>{data?.metrics.exhibitions_attended_count}</p>
                    </li>
                </div>
                <br />
                <div className="double">
                    {/* <p>Mark inactive</p> */}
                    
                    <p onClick={handleDelete} style={{color:"#FB0000", cursor:'pointer'}}>{loading ? <ButtonLoader /> : "Delete user"}</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminUserDetails;