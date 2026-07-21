'use client';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import AdminExhibitionDetails from '../admin/exhibitionTable';
const AdminExhibitionTable = () => {
    const { openModal } = useModal();
    const Lot =
        {
        "id":1,
        "name":"Black or Beauty?",
        "price":"301.00",
        "startingBid":"400",
        "year": 2022,
        "status":"rejected",
        "reason":"Rejection Reason. Thank you for submitting your artwork for review. Unfortunately, we are unable to approve this listing at this time because the uploaded artwork image does not meet our platform's quality requirements. The image appears to be low resolution and lacks the clarity needed for collectors and visitors to properly view the details of the artwork. To resubmit, please upload a higher-quality image that: Is sharp and in focus your understanding and look forward to receiving an updated version of your artwork listing.",
        "category": "Human Portrait",
        "type": "Painting",
        "theme": ["calm", "paece", "joy", "freedom", "Alive"],
        "size": "29.7 X 28 X 8",
        "frame": "No frame",
        "proofOfAuth": "yes",
        "description": "The Lagos Art Expo serves as a living, breathing canvas that captures the tumultuous beauty and electric pulse of Africa's ultimate megacity. This premier exhibition dissolves the boundaries between ancestral heritage and raw modernism, gathering a fearless collective of visionary masters and radical emerging artists under one roof. It is a sensory manifestation of Lagos itself and the relentless drive to create. Visitors are invited to step into an immersive world where the city’s complex identity is laid bare through a kaleidoscope of color, texture, and form. Every corner of the exhibition tells a story of survival, celebration, and reinvention. Powerful oil paintings capture the chaotic symphony of the streets, while towering mixed-media sculptures constructed from recycled materials reflect the city's innovative spirit.",
        "img": "/images/auction/3.webp"
    }
    const data = [
        {
            orderId:"E-2100",
            item:{
                img:"/images/auction/1.webp",
                name:"Fragments of memory",
                artist:"Aria Belrose"
            },
            category:"Painting",
            date:"12002300",
            status:"Upcoming",
            venue:"Palmgrove drive, VI, Lagos.",
            attending:52,
        },
        {
            orderId:"E-2101",
            item:{
                img:"/images/auction/2.webp",
                name:"Tales of adventure",
                artist:"Liam Chen"
            },
            category:"Drawing",
            date:"12002300",
            status:"Completed",
            venue:"Mountainview Trail, VI, Lagos.",
            attending:75,
        }
    ]
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Exhibition title</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Attending</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data.length !==0 && data.map((b) => (
                    <tr onClick={()=>openModal(<AdminExhibitionDetails data={Lot}/>)} className={styles.dataRow} key={b.orderId} >
                        <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.item.img} alt="item" />
                                <div>
                                    <p>{b?.item.name}</p>
                                    <p>{b?.orderId}</p>
                                </div>
                            </div>
                        </td>
                        <td>{new Date(b?.date).toDateString() || "N/A"}</td>
                        <td>{b?.venue}</td>
                        <td className={styles.amount}>attending</td>
                        <td> 
                            <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.status}
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminExhibitionTable;