'use client';
import OrderDet from '../clientOrderDetail/page';
import ArtistLotDetails from '../lotDetail/artistArtworkDetails';
import { useModal } from '../ModalProvider/ModalProvider';
import styles from './tables.module.css';
const ArtistArtworksTable = () => {
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
            quantity:"1",
            date:"12002300",
            status:"Processing",
            amount:"150.00"
        },
        {
            orderId:"E-2101",
            item:{
                img:"/images/auction/2.webp",
                name:"Echoes of Time",
                artist:"Liam Chen"
            },
            quantity:"2",
            date:"12002300",
            status:"Processing",
            amount:"300.00"
        }
    ]
    return ( 
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Artwork ID</th>
                        <th>Artwork</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                {data.length !==0 && data.map((b) => (
                    <tr onClick={()=>openModal(<ArtistLotDetails data={Lot}/>)} className={styles.dataRow} key={b.orderId} >
                        <td>{b?.orderId}</td>
                        <td>
                            <div className={styles.tableDouble}>
                                <img src={b?.item.img} alt="item" />
                                <div>
                                    <p>{b?.item.name}</p>
                                    <p>{b?.item.artist}</p>
                                </div>
                            </div>
                        </td>
                        <td>{new Date(b?.date).toDateString() || "N/A"}</td>
                        <td className={styles.amount}>₦{b?.amount.toLocaleString() || "N/A"}</td>
                        <td>{b?.quantity}</td>
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
 
export default ArtistArtworksTable;