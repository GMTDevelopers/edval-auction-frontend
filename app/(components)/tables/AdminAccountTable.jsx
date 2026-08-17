'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ButtonLoader from '@/app/(components)/loader/buttonloader';
import { useState } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const AdminAccountTable = (data) => {
    const accessToken = localStorage.getItem("access_token");
    const { openModal } = useModal();
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
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
                console.log('User deleted successfully:', response);
                setTimeout(() => {
                    /* closeModal() */
                    window.location.reload();
                }, 3000);
            }
            
            return rejctData;
        } catch (err) {
            console.error('Error creating auction:', err);
            return false;
        } finally{
            setLoading(false)
        }
    }

    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Admin name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Last active</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data.data?.length !==0 && data.data?.map((b,index) => (
                    <tr className={styles.dataRow} key={index} >
                        <td>
                            <div className={styles.tableDouble}>
                                <img className={styles.roundedImg} src={b?.profile_image_url || "/images/auction/2.webp"} alt="item" />
                                <div>
                                    <p>{b?.first_name} {b?.last_name}</p>
                                    <p>{b?.code}</p>
                                </div>
                            </div>
                        </td>
                        <td>{b?.phone}</td>
                        <td>{b?.role}</td>
                        <td className={styles.amount}>2 hrs ago</td>
                        <td> 
                            <div style={{marginTop:0}} className="row2">
                                <span className={`${styles.status} ${styles[b.is_active?.toString()]}`}>
                                    {b?.is_active ? 'Active' : 'Inactive'}
                                </span>
                                <div className="double">
                                   {/*  <Pencil size={28} style={{cursor:"pointer"}} /> */}
                                    {loading ? <ButtonLoader /> :<Trash2 size={28} onClick={handleDelete} style={{color:"#FB0000", cursor:"pointer"}} />}
                                </div>
                            </div>
                            
                        </td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminAccountTable;