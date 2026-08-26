"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Ban, Check, CircleOff } from "lucide-react";
import Loader from "@/app/(components)/loader/loader";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PaymentCallback() {
/*   const searchParams = useSearchParams(); */
  const [searchParams, setSearchParams] = useState(null)
  const [message, setMessage] = useState("Checking payment...");
  const router = useRouter()
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const searchString = window.location.search;
    const params = new URLSearchParams(searchString);
    setSearchParams(params);
    const reference = searchParams.get("reference") || searchParams.get("trxref");
  
    if (!reference) {
      return;
    }
    const accessToken = localStorage.getItem("access_token");
    fetch(`${BASE_URL}/payments/${reference}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "authorization": `Bearer ${accessToken}`,
    },
        
    })
      .then(res => res.json())
      .then(data => {
        setResData(data.data)
        console.log('callback data', data)
        if (data.data.status === "completed") {
          
          setMessage("Payment successful! 🎉");
          setTimeout(() => {
            router.back()
          }, 2500);
        } else {
          setMessage("Payment not confirmed yet.");
        }
      })
      .catch(() => setMessage("Something went wrong."))
      .finally(() => setLoading(false));
    setLoading(false)
  }, [searchParams]);
  if (loading) {
    return (
      <div className="emptyCont">
        <Loader />
      </div>
    );
  }
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      { 
        resData.status === "completed" && !loading && <div className="emptyCont">
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
            <CircleOff size={52} color="#419E5A"/>
            <h1>{message}</h1>
          </div>          
        </div>
       }
       {
          resData.status === "pending" && !loading && <div className="emptyCont">
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
              <Ban size={52} color="#FB0000" />
              <h1>{message}</h1>
            </div>
          </div> 
        }
       {
          resData.status === "pending" && loading && <div className="emptyCont">
           <Loader />
          </div> 
        }
    </div>
  );
}