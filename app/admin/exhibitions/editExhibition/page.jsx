'use client'
import { useEffect, useState } from 'react';
import styles from '../addNewExhibition/add.module.css';
import { ChevronLeft } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import ImageUploader from '@/app/(components)/imageUploader/ImageUploader';
import ButtonLoader from '@/app/(components)/loader/buttonloader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetExhibition = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/exhibitions/${id}`, { 
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw( 
                response.status,
                data.error|| "failed to get Exhibitions"
            )
        }
        console.log(data)
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

const EditExhibitions = async (formData, id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/exhibitions/${id}`, { 
        method: "PUT",
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


const EditNewExhibition = () => {
/*    const initData = useSearchParams();
   const initID = initData.get('id') */
    const [initData, setInitData] = useState(null);
    const router = useRouter();
    const [exDetails, setExDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [formData, setformData] = useState({
        banner_url: '',
        description: '',
        end_date: '',
        start_date: "",
        title: '',
        venue: ''
    });
    console.log('edit data:', initData);

    useEffect(() => {
        const trying = async () => {
            const searchString = window.location.search;
            const params = new URLSearchParams(searchString);
            setInitData(params);
            setLoading(true);

            const exhibition = await GetExhibition(initID);

            if (exhibition.success) {
                const data = exhibition.data.data;

                const startDate = new Date(data.start_date);
                const endDate = new Date(data.end_date);
                
                setDate(startDate.toISOString().split("T")[0]);
                setEndDate(endDate.toISOString().split("T")[0]);

                setTime(
                    startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })
                );

                setEndDate(endDate.toISOString().split("T")[0]);

                setExDetails(data);

                setformData({
                    banner_url: data.banner_url || "",
                    description: data.description || "",
                    end_date: data.end_date || "",
                    start_date: data.start_date || "",
                    status: data.status,
                    title: data.title || "",
                    venue: data.venue || ""
                });
            }

            setLoading(false);
        };

        trying();
    }, [initID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let startDate = formData.start_date;

        // Only create a new start date if the user changed the date/time
        if (date && time) {
            const startDateTime = `${date}T${time}`;
            startDate = new Date(startDateTime).toISOString();
        }

        /* const endDate = new Date(formData.end_date).toISOString(); */
        const formattedEndDate = new Date(endDate).toISOString();

        const payload = {
            ...formData,
            start_date: startDate,
            end_date: formattedEndDate
        };

        console.log("payload:", payload);

        const result = await EditExhibitions(payload, initID);

        console.log('handle submit result', result);

        if (!result.success) {
            setLoading(false);
            toast.error(result.err.message);
            return;
        }

        toast.success("Exhibition updated successfully.");
        setLoading(false);

        setTimeout(() => {
            router.back();
        }, 2000);
    };
    return ( 
        <div>
            <div className={`container ${styles.overallContainer}`}>
                <div style={{display:"flex"}} onClick={() => router.back()} className={`btn ${styles.backBtn}`}><ChevronLeft /> <h4>Edit Exhibition</h4> </div>
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
                            <div className="double">
                                <label  htmlFor="">Status</label>
                                <select style={{cursor:'pointer'}} value={formData.status} onChange={(e)=>setformData(prev=>({...prev, status: e.target.value}))} name="status">               
                                    <option value="upcoming">
                                        upcoming
                                    </option>                                
                                    <option value="active">
                                        active
                                    </option>                                                              
                                    <option value="ended">
                                        ended
                                    </option>                                                              
                                </select>
                            </div>
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
                                    <input value={endDate} onChange={(e)=>setEndDate(e.target.value)} type="date" name="date" />  
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
 
export default EditNewExhibition;