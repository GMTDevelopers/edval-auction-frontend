'use client';
import styles from '@/app/(components)/lotDetail/lotDetail.module.css';
import { Download } from 'lucide-react';
import { Fragment } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditOrderStatus = async (formData, auctionId) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/gallery/orders/${auctionId}/status`, { 
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "Order status function failed"
            )
        }
        return {
            success:true,
            data: data
        };
    } catch (err) {
        console.log(err)
        return {
            success: false,
            err,
        };
    }
};

const downloadPDF = async (orderId) => {
    const accessToken = localStorage.getItem("access_token");
    try {
    const response = await fetch(`${BASE_URL}/admin/gallery/orders/${orderId}/invoice/pdf`, {
      method: 'GET',
      headers: {
        "authorization": `Bearer ${accessToken}`,// If authenticated
      }
    });

    // 1. Get response as binary large object (Blob)
    const blob = await response.blob(); 
    
    // 2. Create a temporary local URL for the blob
    const downloadUrl = window.URL.createObjectURL(blob); 
    
    // 3. Create hidden anchor tag to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'EdavlArtOrderInvoice.pdf';
    
    // 4. Append, click, and clean up
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl); 
  } catch (error) {
    console.error('Download failed:', error);
  }
}

const AdminOrderDetails = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentInnerIndex, setCurrentInnerIndex] = useState(0);
    const handleThumbnailClick = (index,innerIndex) => {
        setCurrentIndex(index);
        setCurrentInnerIndex(innerIndex)
    };
    const [formData, setFormData] = useState({
        status:''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await EditOrderStatus(formData, data?.id);
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("Status updated successfully.");
            console.log('Status updated successfully:', result);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }  
    }
    const handleDownload = async (e) => {
        e.preventDefault();
        const result = await downloadPDF(data?.id);
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("downloaded successfully.");
            console.log('downloaded successfully:', result);
     /*        setTimeout(() => {
                window.location.reload();
            }, 3000) */;
        }  
    }

    console.log("order det", data)
    return ( 
        <div className={`${styles.adminArtistDetailsContainer} ${styles.container}`}>
            <div className={styles.galleryContainer}>
                {/* Main Large Image */}
                <div className={styles.mainImageContainer}>
                    <img src={data?.items[currentIndex].artwork?.images[currentInnerIndex].url} alt={`Gallery image ${currentIndex + 1}`} className={styles.mainImage} />
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbnailsContainer}>
                    {data?.items.map((item, index)=>(
                        <Fragment key={index}>
                            {item?.artwork?.images?.map((image, innerIndex) => (
                                <div key={innerIndex} className={`${styles.thumbnailWrapper} ${index === currentIndex ? styles.active : '' }`} onClick={() => handleThumbnailClick(index, innerIndex)} >
                                    <img src={image.url} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
                                </div>
                            ))}
                        </Fragment> 
                    ))}                                    
                </div>
            </div>
            <div style={{gap:"14px"}} className={styles.detailsContainer}>
                <div className={styles.artistPack}>
                    <h2>{data.name}</h2>
                </div>
                <div className={styles.otherDetailsPack}>
                    {data.items.map((item,index)=> (<li key={index}>
                        <p>{item.title}</p>
                        <p><span>₦{item.price.toLocaleString()}</span></p>
                    </li>))}
                    <li>
                        <p>Shipping Fee</p>
                        <p><span>₦{data.shipping_fee.toLocaleString()}</span></p>
                    </li>
                    <li>
                        <p>Insurance</p>
                        <p><span>₦{data.insurance_fee.toLocaleString()}</span></p>
                    </li>
                    <li>
                        <p>VAT</p>
                        <p><span>₦{data.vat.toLocaleString()}</span></p>
                    </li>
                    <li>
                        <p>Total amount</p>
                        <p><span>₦{data.total_amount.toLocaleString()}</span></p>
                    </li>
                    <li>
                        <p>Order type</p>
                        <p><span>{data?.order_type?.toUpperCase()}</span></p>
                    </li>
                    <li>
                        <p>Order status</p>
                        <p><span>{data.status}</span></p>
                    </li>
                    <li>
                        <p>Delivery type</p>
                        <p><span>{data.delivery_method}</span></p>
                    </li>
                </div>

                <div style={{border:"1px solid #807D67", padding:"5%"}}>
                    <p><span>Shipping Details</span></p>
                    <br />
                    <p>{data?.shipping_address} </p>
                    <p>{data?.shipping_state}, {data?.shipping_state}, {data?.shipping_country}</p>
                    <p>Phone: {data?.contact_phone}</p>
                    <p>Email: {data?.buyer.email}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{whiteSpace:"nowrap"}} className="double">
                        Update Order status
                        <select value={formData.status} onChange={(e)=>setFormData(prev=>({...prev, status:e.target.value}))} name="nowShowing"> 
                            <option value="">
                                ---
                            </option>    
                            <option value="shipped">
                                Shipped
                            </option>    
                            <option value="delivered">
                                Delivered
                            </option>                              
                            <option value="cancelled">
                                Cancelled
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    
                    <div className="double">                    
                        <div onClick={handleDownload} style={{marginTop:0, width:"fit-content"}} className="btn"> <Download /> Download order invoice (.pdf)</div>
                        <button type='submit' style={{marginTop:0, width:"fit-content"}} className="btn submit">Update order status</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}
 
export default AdminOrderDetails;