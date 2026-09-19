'use client'
import { ChevronLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import styles from './page.module.css';
import Styles from '@/app/(components)/sideCard/page.module.css'
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import AddNewLot from '@/app/(components)/admin/addLot/page';
import { useState } from 'react';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const CreateAuction = async (formData) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/auctions`, { 
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || "Create auction function failed",
            };
        }
        return data;
    } catch (err) {
        console.error('Error creating auction:', err);
        return false;
    }
};

const NewAuction = () => {
    const router = useRouter();
    const { openModal } = useModal();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [formData, setFormData] = useState({
        description: "",
        commitment_fee:'',
        cover_image_url: " ",
        duration_minutes: 60,
        min_participation_amount: 1000,
        name: "",
        participant_limit: 10000,
        scheduled_at: " ",
        stream_url: " ",
        venue:''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const localDateTime  = `${date}T${time}`;  // 1. Combine local date and time: "2026-05-16T10:00"
        const scheduledAt = new Date(localDateTime);  // 2. Convert to Javascript Date Object (interprets as user's local timezone
        /* const scheduledAt = dateObject.toISOString(); */ // 3. Format to ISO string for backend: "2026-05-16T10:00:00.000Z"
        const dataToSubmit = {
            ...formData,
            scheduled_at: scheduledAt
        }
        const result = await CreateAuction({ ...dataToSubmit });
        if (result) {
/*             console.log('Auction created successfully:', result); */
            openModal(<AddNewLot id={result.data?.id} />)
        } else {
            console.error('Failed to create auction do not proceed to create auction lots');
        }
    }
    return ( 
        <div>
            <div style={{display:"flex", alignSelf:"flex-start"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <p><span>go back</span></p> </div>
            <div className={styles.coloredContainer}>
                <div className="headerCenter">
                    <h2>Add New Auction Event</h2>
                </div>
                <form onSubmit={handleSubmit} action="">
                    <section className={styles.section}>
                        <p>SECTION A: <span>GENERAL INFORMATION</span></p>
                        <input value={formData.name} onChange={(e)=>setFormData(prev =>({...prev, name: e.target.value}))} placeholder="Auction name" type="text" name="auctionName" required />
                        <textarea value={formData.description} onChange={(e)=>setFormData(prev =>({...prev, description: e.target.value}))} placeholder="Auction Description" type="text" name="auctionDescription" required />
                        <div style={{marginTop:"0px"}} className="row2">
                            <div>
                                <label htmlFor="auctionDate">Date</label>
                                <input value={date} onChange={(e)=>setDate(e.target.value)} placeholder="First name" type="date" name="auctionDate" id="auctionDate" required />
                            </div>
                            <div>
                                <label htmlFor="auctionTime">Time</label>
                                <input value={time} onChange={(e)=>setTime(e.target.value)} placeholder="Last name" type="time" name="auctionTime" id="auctionTime" required />
                            </div>                            
                        </div>
                        <input value={formData.stream_url} onChange={(e)=>setFormData(prev =>({...prev, stream_url: e.target.value}))} placeholder="Video link" type="url" name="livestreamLink" id="" />
                        <div>
                            <label htmlFor="commitmentFee">Commitment fee</label>
                            <input value={formData.commitment_fee}
                                step={0.01}
                                onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*(\.\d{0,2})?$/.test(value)) {
                                    setFormData(prev => ({
                                        ...prev,
                                        commitment_fee: Number(value)
                                    }));
                                }
                            }} 
                            placeholder="0.00" type="number" id="commitmentFee" required />
                        </div>
                        <div style={{marginTop:"0px"}} className="row2">
                            <div>
                                <label htmlFor="participants">Maximum Participants</label>
                                <input value={formData.participant_limit} onChange={(e)=>setFormData(prev =>({...prev, participant_limit: Number(e.target.value)}))} placeholder="Maximum Participants" type="tel" name="participants" id="participants" required />
                            </div>
                            <div>
                                <label htmlFor="duration">Auction Duration (in Minutes) </label>
                                <input value={formData.duration_minutes} onChange={(e)=>setFormData(prev =>({...prev, duration_minutes: Number(e.target.value)}))} placeholder="Duration in Minutes" type="tel" name="duration" id="duration" required />
                            </div>                            
                        </div>
                        <input value={formData.venue} onChange={(e)=>setFormData(prev =>({...prev, venue: e.target.value}))} placeholder="Physical Auction Venue" type="text" name="auctionVenue" />
                    </section>
                    <div className="">                        
                        <ImageUploader
                            className="mainImageContainer"
                            value={formData?.cover_image_url }
                            placeholder={`Add Cover Image`}
                            onUpload={(url) => {
                                const media = url;
                                setFormData(prev => ({
                                    ...prev,
                                    cover_image_url: media
                                }));
                            }}
                        />                       
                    </div>
                    {/* <section className={styles.section}>
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
                    </section> */}
                    <button className="btn submit">Create auction event</button>
                </form>
            </div>
        </div>
    );
}
 
export default NewAuction;