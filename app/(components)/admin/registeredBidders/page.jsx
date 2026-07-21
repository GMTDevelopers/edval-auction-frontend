'use client'
import { ArrowDown, ChevronDown, ChevronUp, Download } from 'lucide-react';
import styles from './reg.module.css';
import { useState } from 'react';
const RegisteredBidders = () => {
      const [isOpen, setIsOpen] = useState("Q1");// replace the Q1 with id so it can be unique
    return ( 
        <div className={`container ${styles.regBidderContainer}`}>
            <div style={{alignItems:"center"}} className='double'>
                <h3>Registered Bidders (77)</h3>
                <div style={{color:"#FB6900"}} className="btn"> <Download /> Export records (.csv)</div>
            </div>
            <br /><br />
            <div className="double">
                <p><span>User</span></p>
                <p><span>Date Registered</span></p>
            </div>
            <br />
            <div className={styles.user}>
                <div className="double" onClick={()=>isOpen!=="Q1"?setIsOpen("Q1"):setIsOpen("")}>
                    <div className={styles.userDetails}>
                        <img src="/images/auction/3.webp" alt="" />
                        <div >
                            <p className={styles.name}>Sharon Michael</p>  
                            <p style={{color:"#3A3930"}}>shar_michael@gmail.com</p>
                        </div>
                    </div>
                    <div className="btn">
                        <p style={{color:"#3A3930", fontWeight:"700"}}>May 16, 2024</p>
                        {isOpen==="Q1"?<ChevronUp  size={20} /> :  <ChevronDown  size={20} />  }
                    </div>
                </div>
                <div  className={isOpen==="Q1" ? `${styles.futherDetails}` : `${styles.noShow}` }>
                    <ul>
                        <li>
                            <p>Employment status:<span> Self-employed</span></p>
                        </li>
                        <li>
                            <p>Lot bidding for:<span> Whisper in the Wind (Starting bid - $400)</span></p>
                        </li>
                        <li>
                            <p>Entry bid:<span> $600</span></p>
                        </li>
                        <li>
                            <p>Account number:<span> 2001277832</span></p>
                        </li>
                        <li>
                            <p>Bank name:<span> Citi Bank PLC</span></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default RegisteredBidders;