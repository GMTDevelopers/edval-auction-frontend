'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import { Download } from 'lucide-react';
import { useState } from 'react';



const AdminOrderDetails = ({data}) => {
    const [showing, setShowing] = useState('Processing')

    return ( 
        <div className={`${styles.adminArtistDetailsContainer} ${styles.container}`}>
            <div className={styles.galleryContainer}>
                <div className={styles.mainImageContainer}>
                    <img src={data.img} alt='artist' className={styles.mainImage} />
                </div>
            </div>
            <div style={{gap:"14px"}} className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data.name}</h2>
                </div>
                <div className={styles.otherDetailsPack}>
                    <li>
                        <p>Whispers of Dawn  x1</p>
                        <p><span>$150.00</span></p>
                    </li>
                    <li>
                        <p>Shipping Fee</p>
                        <p><span>$15.00</span></p>
                    </li>
                    <li>
                        <p>Insurance</p>
                        <p><span>$50.00</span></p>
                    </li>
                    <li>
                        <p>VAT</p>
                        <p><span>$7.50</span></p>
                    </li>
                    <li>
                        <p>Total amount</p>
                        <p><span>$172.50</span></p>
                    </li>
                    <li>
                        <p>Order status</p>
                        <p><span>{showing}</span></p>
                    </li>
                    <li>
                        <p>Delivery type</p>
                        <p><span>Address delivery</span></p>
                    </li>
                </div>

                <div style={{border:"1px solid #807D67", padding:"5%"}}>
                    <p><span>Shipping Details</span></p>
                    <br />
                    <p>Sharon Willouby </p>
                    <p>935 Oak Extension, Off Newtown Bypass way,Ibeju-Lekki, Lagos, Nigeria</p>
                    <p>Phone: +1 (654) 495-9092</p>
                    <p>Email: kosiposo@mailinator.com</p>
                </div>
                <div className="double">
                    Order status
                    <select value={showing} onChange={(e)=> setShowing(e.target.value)} name="nowShowing"> 
                        <option value="processing">
                            Processing
                        </option>              
                        <option value="shipped">
                            Shipped
                        </option>                                
                        <option value="completed">
                            Completed
                        </option>                                
                                                                                    
                    </select>
                </div>
                
                <div className="double">                    
                    <div style={{marginTop:0, width:"fit-content"}} className="btn"> <Download /> Download order invoice (.pdf)</div>
                    <div style={{marginTop:0, width:"fit-content"}} className="btn submit">Update order status</div>
                </div>
            </div>
            
        </div>
    );
}
 
export default AdminOrderDetails;