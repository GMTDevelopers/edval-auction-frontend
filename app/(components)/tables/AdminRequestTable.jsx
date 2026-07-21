'use client';
import { useRouter } from 'next/navigation';
import styles from './tables.module.css';
import { useModal } from '../ModalProvider/ModalProvider';
import ArtistLotDetails from '../lotDetail/artistArtworkDetails';
import AdminArtistLotDetails from '../lotDetail/adminArtworkDetails';
import AdminRequestDetails from '../admin/requestTable';
import AdminRequestPCDetails from '../admin/requestTablePC';
import AdminRequestExhDetails from '../admin/requestTableExh';
const AdminRequestTable = () => {
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
        "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
        "images":['/images/auction/3.webp', '/images/auction/1.webp', '/images/auction/2.webp'],
        "img": "/images/auction/3.webp"
    }
    const data = [
        {
            orderId:"E-2100",
            item:{
                img:"/images/auction/1.webp",
                name:"Whispers of Dawn",
                artist:"Aria Belrose"
            },
            category:"Pending",
            email:"chidera.onwudiwe@mail.com",
            date:"Sep. 17, 2026",
            status:"Pending",
            amount:"150.00",
            type:"Portrait commission",
        },
        {
            orderId:"E-2102",
            item:{
                img:"/images/auction/1.webp",
                name:"Whispers of Dawn",
                artist:"Aria Belrose"
            },
            category:"Pending",
            email:"chidera.onwudiwe@mail.com",
            date:"Sep. 17, 2026",
            status:"Pending",
            amount:"150.00",
            type:"Exhibition",
        },
        {
            orderId:"E-2101",
            item:{
                img:"/images/auction/2.webp",
                name:"Echoes of Time",
                artist:"Liam Chen"
            },
            category:"Drawing",
            email:"chidera.onwudiwe@mail.com",
            date:"Apr. 15, 2026",
            status:"Completed",
            amount:"300.00",
            type:"Auction sale"
        }
    ]
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Artwork</th>
                        <th>Date</th>
                        <th>Request type</th>  
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody> 
                {data.length !==0 && data.map((b) => (
                    <tr onClick={()=>openModal(b?.type==="Auction sale" && <AdminRequestDetails data={Lot}/> || b?.type==="Portrait commission"&&<AdminRequestPCDetails data={Lot}/> || b?.type==="Exhibition"&&<AdminRequestExhDetails data={Lot}/> )} className={styles.dataRow} key={b.orderId} >
                        
                        <td>
                            <div className={styles.tableDouble}>
                                <img className={styles.roundedImg} src={b?.item.img} alt="item" />
                                <div>
                                    <p>{b?.item.artist}</p>
                                    <p>{b?.email}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.item.img} alt="item" />
                                <div>
                                    <p>{b?.item.name}</p>
                                    <p>{b?.category}</p>
                                </div>
                            </div>
                        </td>                        
                        <td>{new Date(b?.date).toDateString() || "N/A"}</td>
                        <td>{b?.type}</td>
                        
                        <td> 
                            <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                            {b?.status}
                            </span>
                        </td>
                        <td style={{fontWeight:600}} className={styles.amount}>₦{b?.amount.toLocaleString() || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
}
 
export default AdminRequestTable;