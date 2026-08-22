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
import { useCart } from '../context/cartContext';


const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { openModal, closeModal } = useModal();
    const {isAuthenticated, user, accessToken, logout, refreshToken} = useAuth();
    const {cart} = useCart();
    const [isUser, setIsUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        console.log(isAuthenticated, user);
        console.log('this is the cart:', cart)
    }, []);
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
                    {isAuthenticated && user?.role==="registered_user" && (<div className={`btn ${styles.navBtnLoggedIn}`}>
                        <p onClick={()=> {router.push('/cart'); closeModal()}} className={styles.navBtnLoggedIn}><ShoppingCart size={21} /> {cart?.items?.length}</p> 
                        <div className={styles.navBtnLoggedIn}>
                            <img src="/images/contactUs.webp" alt="user" />
                            <p  onClick={() => !isOpen ? setIsOpen(true) : setIsOpen(false)} className={styles.navBtnLoggedIn}>Hi, {user?.first_name || 'User'} <ChevronDown /> </p>
                        </div>
                    </div>)}
                    {isAuthenticated && user?.role==="artist" && (<div onClick={() => !isOpen ? setIsOpen(true) : setIsOpen(false)} className={`btn ${styles.navBtnLoggedIn}`}>
                        <p onClick={()=> {router.push('/cart'); closeModal()}} className={styles.navBtnLoggedIn}><ShoppingCart size={21} /> 2</p> 
                        <div className={styles.navBtnLoggedIn}>
                            <img src="/images/contactUs.webp" alt="user" />
                            <p className={styles.navBtnLoggedIn}>Hi, {user?.first_name || 'User'} <ChevronDown /> </p>
                        </div>
                    </div>)}
                    {isAuthenticated && user?.role==="super_admin" && (
                        <div onClick={() => !isOpen ? setIsOpen(true) : setIsOpen(false)} className={`btn ${styles.navBtn}`}>
                            <p>visit Admin Dashboard</p>
                        </div>
                    )}
                    {isAuthenticated && user?.role==="admin" && (
                        <div onClick={() => !isOpen ? setIsOpen(true) : setIsOpen(false)} className={`btn ${styles.navBtn}`}>
                            <p>visit Admin Dashboard</p>
                        </div>
                    )}
                </div>
                <div className={isOpen&&!isAuthenticated ? `${styles.menu}` : `${styles.noMenu}`}>
                    <li className='btn' onClick={()=> {openModal(<Tab />); setIsOpen(false); }}>Sign in to my account</li>
                    <li className='btn' onClick={()=> {openModal(<Tab />); setIsOpen(false)}}>Create user account</li>
                    <li className='btn' onClick={()=> {router.push('/user/artist/artistRegistration'); closeModal()}}>Create artist account</li>
                </div>
                <div className={isOpen&&user?.role==="artist"&&isAuthenticated ? `${styles.menu}` : `${styles.noMenu}`}>
                    <li className='btn' onClick={()=> {setIsOpen(false)}}><Link href="/user/artist/myArtworks">My Artworks</Link></li>
                    <li className='btn' onClick={()=> {setIsOpen(false)}}><Link href="/user/artist/submissions">Submissions</Link></li>
                    <li className='btn' onClick={()=> {setIsOpen(false)}}><Link href="/user/artist/account">My Profile</Link></li>
                    <li className='btn' onClick={() => {logout(); setIsOpen(false);}} style={{color:"#FB0000"}}>Sign out</li>
                </div>
                <div className={isOpen&&user?.role==="super_admin"&&isAuthenticated ? `${styles.menu}` : `${styles.noMenu}`}>
                    <li className='btn' onClick={()=> {setIsOpen(false); router.push('/admin/overview')}}><Link href="/admin/overview">Visit Admin Dashboard</Link></li>
                    <li className='btn' onClick={() => {logout(); setIsOpen(false);}} style={{color:"#FB0000"}}>Sign out</li>
                </div>
                <div className={isOpen&&user?.role==="registered_user"&&isAuthenticated ? `${styles.menu}` : `${styles.noMenu}`}>
                    <li className='btn' onClick={()=> {setIsOpen(false)}}><Link href="/user/client">My Orders</Link></li>
                    <li className='btn' onClick={()=> {setIsOpen(false)}}>My Account</li>
                    <li className='btn' onClick={() => {logout(); setIsOpen(false);}} style={{color:"#FB0000"}}>Sign out</li>
                </div>
                
            </div>
        </div>
    );
}
 
export default Navbar;