'use client'
import { ChevronLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import styles from './page.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import AddNewLot from '@/app/(components)/admin/addLot/page';

const NewAuction = () => {
    const router = useRouter();
    const { openModal } = useModal();
    return ( 
        <div>
            <div style={{display:"flex", alignSelf:"flex-start"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <p><span>go back</span></p> </div>
            <div className={styles.coloredContainer}>
                <div className="headerCenter">
                    <h2>Add New Auction Event</h2>
                </div>
                <form action="">
                    <section className={styles.section}>
                        <p>SECTION A: <span>GENERAL INFORMATION</span></p>
                        <input placeholder="Auction name" type="text" name="auctionName" required />
                        <div style={{marginTop:"0px"}} className="row2">
                            <div>
                                <label htmlFor="auctionDate">Date</label>
                                <input placeholder="First name" type="date" name="auctionDate" id="auctionDate" required />
                            </div>
                            <div>
                                <label htmlFor="auctionTime">Time</label>
                                <input placeholder="Last name" type="time" name="auctionTime" id="auctionTime" required />
                            </div>                            
                        </div>
                        <input placeholder="Video link" type="url" name="livestreamLink" id="" />
                    </section>

                    <section className={styles.section}>
                        <p>SECTION B: <span>AUCTION LOTS</span></p>
                        <input placeholder="Artwork name" type="text" name="artistWorkName" id="" />
                        <div style={{border:"1px solid #807D67"}} className="double">
                            <div className={Styles.sideCardCont}>
                                <div className={Styles.left}>
                                    <img src="/images/auction/3.webp" alt="" />
                                </div>
                                <div className={Styles.right}>
                                    <h3>Black or Beauty?</h3>
                                    <p>Artist: <span>Sharon Bailey</span></p>
                                    <p>Starting bid: <span>$2500</span></p>
                                </div>
                            </div>
                            <div style={{gap:"25px"}} className="double">
                                <Pencil size={30}/>
                                <Trash2 color='#FB0000' size={30}/>
                            </div>
                        </div>
                        <div onClick={()=>openModal(<AddNewLot />)} style={{width:"fit-content", border:"1px solid #807D67", background:"transparent" ,marginTop:"0px"}} className="btn artFeatureBtn"><Plus />  Add new lot</div>
                    </section>
                    <button className="btn submit">Create auction event</button>
                </form>
            </div>
        </div>
    );
}
 
export default NewAuction;