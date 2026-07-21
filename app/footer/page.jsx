import styles from './page.module.css';
const Footer = () => {
    return ( 
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.containerInner}>
                    <div className={styles.row1}>
                        <img src="/images/logoBlack.png" alt="logo" />
                        <p>Edval Art Auction is a professional online platform and central hub for showcasing auctions, managing participants, and selling artworks. We connect independent artists with global collectors by combining YouTube-streamed live events and phone-based bidding with a continuous e-commerce art gallery and custom portrait commissions.</p>
                    </div>
                    <div className={styles.row2}>
                        <h3>Quick Links</h3>
                        <div className={styles.row2Container}>
                            <ul>
                                <li>Home</li>
                                <li>Exhibition</li>
                            </ul>
                            <ul>
                                <li>Exhibition</li>
                                <li>Commission</li>
                            </ul>
                            <ul>
                                <li>Auctions</li>
                                <li>Contact us</li>
                            </ul>
                            <ul>
                                <li>Gallery</li>
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
                    <p>Copyright © 2026 EDVAL ART AUCTION   |   Designed and Developed by GMTDevs</p>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;