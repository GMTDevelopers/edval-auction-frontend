"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PaymentCallback() {
  const [searchParams, setSearchParams] = useState(null)
/*   const searchParams = useSearchParams(); */

  const [message, setMessage] = useState("Checking payment...");
    
  useEffect(() => {

    const accessToken = localStorage.getItem("access_token");
    const searchString = window.location.search;
    const params = new URLSearchParams(searchString);
    setSearchParams(params);
    const reference = searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setMessage("No payment reference found.");
      return;
    }

    fetch(`${BASE_URL}/api/v1/payments/${reference}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "authorization": `Bearer ${accessToken}`,
    },
        
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setMessage("Payment successful! 🎉");
        } else {
          setMessage("Payment not confirmed yet.");
        }
      });

    setMessage(`Payment completed. Reference: ${reference}`);
  }, [searchParams]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>{message}</h1>
    </div>
  );
}