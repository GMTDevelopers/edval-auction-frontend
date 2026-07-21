/* import styles from '../tab/tabs.module.css';; */
import styles from './auctionReg.module.css';
const AuctionRegistration = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.subHeading}>
                <h2>Register to Participate</h2>
                <p>A refundable commitment fee of $50 is required to authorize your phone-in bidding privileges. If you do not win any lots, this fee will be fully refunded within three business days.</p>
            </div>
            <form className={styles.regForm} action="">
                <select defaultValue="Employment status" name="employmentStatus">
                    <option disabled>Employment status</option>                 
                    <option value="Employed">
                        Employed
                    </option>                                
                    <option value="Self-Employed">
                        Self Employed
                    </option>                                
                    <option value="Freelancer">
                        Freelancer
                    </option>                                
                    <option value="Entrepreneur">
                        Entrepreneur
                    </option>                                
                    <option value="Sole-Proprietors">
                        Sole Proprietors
                    </option>                                
                </select>
                <select defaultValue="Select the lot you are bidding for?" name="lot">
                    <option disabled>Select the lot you are bidding for?</option>                 
                    <option value="Employed">
                        Black & Beauty?
                    </option>                                
                    <option value="Dancing in the wind">
                        Dancing in the wind
                    </option>                                
                    <option value="Calm, Open, Free">
                        Calm, Open, Free
                    </option>                                                         
                </select>
                <input type="number" step={0.01} name='entryBid' placeholder='What is your entry bid?' />
                <input type="tel" name='accNumber' placeholder='Account number (for refunds)' />
                <input type="text" name='bankName' placeholder='Bank name' />
                <button className="btn submit">Proceed to pay commitment fee ($50)</button>
            </form>
        </div>
    );
}
 
export default AuctionRegistration;