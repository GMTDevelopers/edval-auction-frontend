'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
const Footer = () => {
    const router = useRouter();
    return ( 
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.containerInner}>
                    <div className={styles.row1}>
                        <img onClick={()=> router.push('/')} src="/images/logoBlack.png" alt="logo" />
                        <p>Edval Art Auction is a professional online platform and central hub for showcasing auctions, managing participants, and selling artworks. We connect independent artists with global collectors by combining YouTube-streamed live events and phone-based bidding with a continuous e-commerce art gallery and custom portrait commissions.</p>
                    </div>
                    <div className={styles.row2}>
                        <h3>Quick Links</h3>
                        <div className={styles.row2Container}>
                            <ul>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li><Link href="/#aboutUs" >About</Link></li>                             
                                
                            </ul>
                            <ul>
                                <li>
                                    <Link href="/pages/exhibition">Exhibitions</Link>
                                </li>
                                <li>
                                    <Link href="/pages/commissions">Commissions</Link>
                                </li>
                            </ul>
                            <ul>
                                <li><Link href="/pages/auctions" >Auctions</Link></li>
                                <li><Link href='/pages/contact' >Contact</Link></li>
                            </ul>
                            <ul>
                                <li><Link href="/pages/gallery" >Gallery</Link></li>
                                <li>My Account</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.row3}>
                        <h3>For Exclusive Art Updates, Join Our Newsletter</h3>
                        <div className={styles.row3Container}>
                            <input type="text" placeholder='Email address' />
                            <div className="btn">Subscribe</div>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>Copyright © 2026 EDVALTOURS SERVICES NIGERIAN LIMITED  |   Designed and Developed by <Link href='https://wwww.gmtdevs.com' target='_blank'>GMTDevs Global</Link> </p>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;