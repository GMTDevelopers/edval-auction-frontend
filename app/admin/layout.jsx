'use client'
import Link from 'next/link';
import styles from './layout.module.css';
import { usePathname } from 'next/navigation';
import { useModal } from '../(components)/ModalProvider/ModalProvider';
import ProtectedRoute from '../protectedRoute';

const AdminLayout = ({children}) => {
    const pathname = usePathname();
    const { openModal } = useModal();

    return ( 
        
            <div className={styles.layoutContainer}>
                <div className="container">
                    <ul className={styles.navBar}>
                        <li className={ pathname.startsWith('/admin/overview') ? `${styles.active}`: "" }><Link href="/admin/overview"> Overview</Link></li>
                        <li className={ pathname.startsWith('/admin/auctions') ? `${styles.active}`: "" }><Link href="/admin/auctions"> Auctions</Link></li>
                        <li className={ pathname.startsWith('/admin/artworks') ? `${styles.active}`: "" }><Link href="/admin/artworks"> Artworks</Link></li>
                        <li className={ pathname.startsWith('/admin/artists') ? `${styles.active}`: "" }><Link href="/admin/artists"> Artists/Users</Link></li>
                        <li className={ pathname.startsWith('/admin/exhibitions') ? `${styles.active}`: "" }><Link href="/admin/exhibitions"> Exhibitions</Link></li>
                        <li className={ pathname.startsWith('/admin/orders') ? `${styles.active}`: "" }><Link href="/admin/orders"> Orders/Requests</Link></li>
                        <li className={ pathname.startsWith('/admin/settings') ? `${styles.active}`: "" }><Link href="/admin/settings"> Settings</Link></li>
                    </ul>
                    {children}
                </div>
                
            </div>

    );
}
/*  <ProtectedRoute allowedRoles={['admin', 'super_admin']}>        </ProtectedRoute> */
export default AdminLayout;