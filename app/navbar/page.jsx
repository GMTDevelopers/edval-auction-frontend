'use client'
import Image from 'next/image';
import styles from  './page.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ShoppingCart, User } from 'lucide-react';
import Tab from '../(components)/tab/tabs';
import { useModal } from '../(components)/ModalProvider/ModalProvider';
import { useAuth } from '../context/authContext';


const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { openModal } = useModal();
    const {isAuthenticated, user, accessToken, logout, refreshToken} = useAuth();
    const [isUser, setIsUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
   /*  useEffect(() => {
        if (isAuthenticated) {
            setIsUser(user);
        } else {
            setIsUser(null);
        }
    }, [isAuthenticated]); */
    return ( 
        <div className={styles.navbar}>
            <div className="container">
                <div className={styles.navContainer}>
                    <img className={styles.logo} src="/images/logo.png" alt="logo" />
                    <ul className={styles.navLinks}>
                        <li className={ pathname==='/' ? `${styles.active}`: "" }><Link href="/" >Home</Link></li>
                        <li className={ pathname==='#aboutUs' ? `${styles.active}`: "" }><Link href="#aboutUs" >About</Link></li>
                        <li className={ pathname.startsWith('/pages/auctions') ? `${styles.active}`: "" }><Link href="/pages/auctions" >Auctions</Link></li>
                        <li className={ pathname.startsWith('/pages/gallery') ? `${styles.active}`: "" }><Link href="/pages/gallery" >Gallery</Link></li>
                        <li className={ pathname.startsWith('/pages/exhibition')  ? `${styles.active}`: "" }><Link href="/pages/exhibition" >Exhibitions</Link></li>
                        <li className={ pathname.startsWith('/pages/commissions')  ? `${styles.active}`: "" }><Link href="/pages/commissions" >Commissions</Link></li>
                        <li className={ pathname.startsWith('/pages/contact') ? `${styles.active}`: "" }><Link href='/pages/contact' >Contact</Link></li>
                    </ul>
                    {!isAuthenticated && <div onClick={() => !isOpen ? setIsOpen(true) : setIsOpen(false)} className={`btn ${styles.navBtn}`}>
                        My Account
                    </div>}
                    {isAuthenticated &&  user.role==="client" && (<div onClick={() => !isOpen ? setIsOpen(true) : setIsOpen(false)} className={`btn ${styles.navBtnLoggedIn}`}>
                        <p className={styles.navBtnLoggedIn}><ShoppingCart size={21} /> 2</p> 
                        <div className={styles.navBtnLoggedIn}>
                            <img src="/images/contactUs.webp" alt="user" />
                            <p className={styles.navBtnLoggedIn}>Hi, {user?.first_name || 'User'} <ChevronDown /> </p>
                        </div>
                    </div>)}
                    {isAuthenticated && user.role==="admin" && (
                        <div onClick={() => router.push('/admin/overview')} className={`btn ${styles.navBtn}`}>
                            Visit Admin Dashboard
                        </div>
                    )}
                </div>
                <div className={isOpen&&!isAuthenticated ? `${styles.menu}` : `${styles.noMenu}`}>
                    <li className='btn' onClick={()=> {openModal(<Tab />); setIsOpen(false)}}>Sign in to my account</li>
                    <li className='btn' onClick={()=> {openModal(<Tab />); setIsOpen(false)}}>Create user account</li>
                    <li className='btn'>Create artist account</li>
                </div>
                <div className={isOpen&&isAuthenticated ? `${styles.menu}` : `${styles.noMenu}`}>
                    <li className='btn' onClick={()=> {setIsOpen(false)}}><Link href="/user/client">My Orders</Link></li>
                    <li className='btn' onClick={()=> {setIsOpen(false)}}>My Account</li>
                    <li className='btn' onClick={() => {logout(); setIsOpen(false);}} style={{color:"#FB0000"}}>Sign out</li>
                </div>
                
            </div>
        </div>
    );
}
 
export default Navbar;