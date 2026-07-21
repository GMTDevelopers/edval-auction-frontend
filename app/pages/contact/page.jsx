import { Mail, MapPin, Phone } from 'lucide-react';
import styles from './contact.module.css';
const Contact = () => {
    return ( 
         <div>
            <div className='headerCenter pageHeader'>
                <h1>Get in Touch With Us</h1>
                <p>Connect with our team regarding artwork acquisitions, auction participation, exhibition, or personalized commission projects.                </p>
            </div>
            <div className="upcomingAuctions">
                <div className={`container double`}>
                    <div className={`small ${styles.small}`}>
                        <div className={styles.contactFlex}>
                            <Phone />
                            <p>+234 801 234 5678</p>
                        </div>
                        <div className={styles.contactFlex}>
                            <Mail />
                            <p>+234 801 234 5678</p>
                        </div>
                        <div className={styles.contactFlex}>
                            <MapPin />
                            <p>+234 801 234 5678</p>
                        </div>
                        <form className={styles.form} action="">
                            <h2>Send us a message</h2>
                            <div className="double">
                                <input placeholder="First name" type="text" name="firstName" required />
                                <input placeholder="Last name" type="text" name="lastName" required />
                            </div>
                            <textarea name="message" placeholder="Type message here"></textarea>
                            <button className='btn submit'>Send message</button>
                        </form>

                    </div>
                    <div className="big">
                        <div className={styles.imgPack}>
                            <img src="/images/contactUs.webp" alt="comission" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Contact;