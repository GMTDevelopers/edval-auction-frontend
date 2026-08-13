'use client'
import { useState } from 'react';
import styles from './add.module.css';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
import ButtonLoader from '@/app/(components)/loader/buttonloader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const AddExhibitions = async (formData) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/exhibitions`, { 
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
                data.error|| "Create Exhibition function failed"
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
const AddNewExhibition = () => {
   
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [formData, setformData] = useState({
        banner_url: "",
        description: "",
        end_date: "",
        start_date: "",
        title: "",
        venue: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const startDateTime  = `${date}T${time}`;
        const startDateObject = new Date(startDateTime);
        const endDateObject = new Date(formData.end_date);
       /*  const startDateAt = startDateObject.toISOString(); */
        /* const endDateAt = endDateObject.toISOString(); */
        const payload = {
            ...formData,
            start_date: startDateObject,
            end_date: endDateObject
        };

        const result = await AddExhibitions(payload);
        console.log('handle submit result', result)
        if(!result.success){
            console.log(result)
            setLoading(false);
            toast.error(result.err.message);
        }
        if(result.success){
            toast.success("Exhibitions created successfully.");
            console.log('Exhibitions created successfully:', result);
            setLoading(false)
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }  
    };
    return ( 
        <div>
            <div className={`container ${styles.overallContainer}`}>
                <div style={{display:"flex"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <h4>Add New Exhibition</h4> </div>
                <form onSubmit={handleSubmit}>
                    <div className={`double`}>
                        <div className={`small`}>
                            <div className="galleryContainer">
                                {/* Main Large Image */}
                                <div className="mainImageContainer">
                                    <ImageUploader
                                        value={formData.banner_url}
                                        placeholder={`Add Cover Image`}
                                        onUpload={(url) => {
                                            const media = url;
                                            setformData(prev => ({
                                                ...prev,
                                                banner_url: media
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="big">                        
                            <input value={formData.title} onChange={(e)=>setformData(prev=>({...prev, title: e.target.value}))} placeholder="Exhibition name" type="text" name="exhibitioName" id="" />
                            <input value={formData.venue} onChange={(e)=>setformData(prev=>({...prev, venue: e.target.value}))} placeholder="Venue" type="text" name="venue" id="" />
                            <textarea value={formData.description} onChange={(e)=>setformData(prev=>({...prev, description: e.target.value}))} name="artDesc" placeholder="Event description"></textarea>
                            <div style={{marginTop:"0px"}} className="row2">
                                <div style={{gap:"5px"}} className="double">
                                    <label htmlFor="">Date</label>
                                    <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" name="date" />  
                                </div>
                                <div style={{gap:"5px"}} className="double">
                                    <label  htmlFor="">Time</label>
                                    <input value={time} onChange={(e)=>setTime(e.target.value)} type="time" name="time" />  
                                </div>
                            </div>
                            <div>
                                <div className="double">
                                    <label style={{whiteSpace:"nowrap"}} htmlFor="">Deadline for artist submissions</label>
                                    <input value={formData.end_date} onChange={(e)=>setformData(prev=>({...prev, end_date: e.target.value}))} type="date" name="date" />  
                                </div>
                            </div>
                            <button className="btn submit">{loading ? <ButtonLoader /> : "Add exhibition"}</button>
                        </div>                        
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default AddNewExhibition;