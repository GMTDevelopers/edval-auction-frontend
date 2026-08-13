'use client'
import AdminArtistTable from '@/app/(components)/tables/AdminArtsistTable';
import styles from '../artworks/artworks.module.css';
import AdminUserTable from '@/app/(components)/tables/AdminUserTable';
import { useEffect, useState } from 'react';
import Loader from '@/app/(components)/loader/loader';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GetUsers = async (filter) => {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`${BASE_URL}/admin/users?limit=10000&offset=0&role=${filter}`, { 
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
                data.error|| "failed to get Artworks"
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

const Artists = () => {
    const [showing, setShowing] = useState('artist')
    const [userDetails, setUserDetails] = useState([]);
    const [filter, setFilter] = useState('artist');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFilter(e.target.value)
    }
    useEffect(() => {
        setLoading(true);
        const trying = async () => {

            const users = await GetUsers(filter)
            setUserDetails(users?.data || [])
            setLoading(false);
            console.log('users',users?.data)
        }
        trying()
        console.log(filter)
    }, [filter]);
    return ( 
        <div>
            <div className={`double ${styles.searchContainer}`}>
                <h3>{filter.toUpperCase()} ({userDetails?.data?.length})</h3>
                <form  className={`row2 ${styles.searchBar}`} action="">
                    <div className="double">
                        Now showing
                        <select value={filter} style={{cursor:'pointer'}} onChange={handleSubmit} name="nowShowing"> 
                            <option value="artists">
                                Artists
                            </option>              
                            <option value="registered_user">
                                Users
                            </option>                                
                                                                                        
                        </select>
                    </div>
                    {/* <input placeholder="Search here" type="text" name="search" /> */}
                </form>
            </div>
            <br /><br />
            {
                loading ? <Loader /> :
                <>
                    {filter==="artist" && <AdminArtistTable data={userDetails.data}/>}
                    {filter==="registered_user" && <AdminUserTable data={userDetails.data}/>}
                </>
            }
        </div>
    );
}
 
export default Artists;