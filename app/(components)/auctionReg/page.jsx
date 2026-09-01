/* import styles from '../tab/tabs.module.css';; */
'use client'
import { useRouter } from 'next/navigation';
import styles from './auctionReg.module.css';
import { useState } from 'react';
import { toast } from 'sonner';
import { initializePayment } from '@/app/services/payment';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const Register = async (formData,auctionId) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/auctions/${auctionId}/register`, { 
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
                data.error|| "Biding reg function failed"
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


const AuctionRegistration = ({auctionId, auctionLot}) => {
    console.log('auction reg lot', auctionLot )
    const router = useRouter();
    const [formData, setformData] = useState({
        declared_amount: '',
        employment_status: "",
        note: "",
        refund_account_number: "",
        refund_bank_name: "",
        target_lot_id: ''
    });
    const [payData, setPayData] = useState({
        callback_url: "",
        item_type: "auction_registration",
        registration_id: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Register(formData,auctionId);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            toast.error(result.err.message);
        }
        if (result.success) {
            console.log('Registration successfull:', result);
            try {
                const callbackUrl = `${window.location.origin}/payment/callback`;
                const initData = {
                    ...payData,
                    callback_url: callbackUrl ,
                    registration_id: result?.data?.data.id,
                }
                const data = await initializePayment(initData);

                // Most backends (and Paystack) return an authorization_url
                if (data.data?.authorization_url) {
                    window.location.href = data.data.authorization_url;
                } else if (data.authorization_url) {
                    window.location.href = data.authorization_url;
                } else {
                    console.log("Full response:", data);
                    toast.error("Payment initialized but no redirect URL found");
                }
            } catch (err) {
                console.error(err);
                toast.error(err.message || "Payment failed");
            }           
        }
/*         if(result.success){
            toast.success("Registration successfull.");
            console.log('Registration successfull:', result);
        }   */
    };

    return ( 
        <div className={styles.container}>
            <div className={styles.subHeading}>
                <h2>Register to Participate</h2>
                <p>A refundable commitment fee of $50 is required to authorize your phone-in bidding privileges. If you do not win any lots, this fee will be fully refunded within three business days.</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.regForm}>
                <select placeholder='Employment status' value={formData.employment_status} onChange={(e)=>setformData(prev=>({...prev, employment_status:e.target.value}))} name="employmentStatus">
                    <option>Employment status</option>                 
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
                <select placeholder='Select the lot you are bidding for?'  value={formData.target_lot_id} onChange={(e)=>setformData(prev=>({...prev, target_lot_id:Number(e.target.value)}))} name="lot">
                    <option value=''>Select the lot you are bidding for?</option>                 
                    {auctionLot&&auctionLot?.map((lot,index)=>(<option key={index} value={lot?.id}>
                        {lot?.title}
                    </option>))}                                                                                  
                </select>
                <input
                value={formData.declared_amount}
                 type='number'
                 step={0.01}
                 onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*(\.\d{0,2})?$/.test(value)) {
                        setformData(prev => ({
                            ...prev,
                            declared_amount: Number(value)
                        }));
                    }
                }}
                name='entryBid' placeholder='What is your entry bid?' />
                <input value={formData.refund_account_number} onChange={(e)=>setformData(prev=>({...prev, refund_account_number:e.target.value}))} type="tel" name='accNumber' placeholder='Account number (for refunds)' />
                <input value={formData.refund_bank_name} onChange={(e)=>setformData(prev=>({...prev, refund_bank_name:e.target.value}))} type="text" name='bankName' placeholder='Bank name' />
                <button className="btn submit">Proceed to pay commitment fee</button>
            </form>
        </div>
    );
}
 
export default AuctionRegistration;