'use client';

import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import styles from './reg.module.css';
import { useState } from 'react';
import { toast } from 'sonner';

const RegisteredBidders = ({ auctionID, bidders }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [isOpen, setIsOpen] = useState(null);
    const handleExport = async () => {
        const accessToken = localStorage.getItem("access_token");
        try {
            const response = await fetch(`${BASE_URL}/admin/auctions/${auctionID}/registrations/export`, { 
            method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error('failed to export file');
                console.log(data)
            }
            const blob = await response.blob();

            // Create a temporary download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `auction-${auctionID}-registrations.csv`;

            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err)
            return {
                success: false,
                err,
            };
        }
    }
  return (
    <div className={`container ${styles.regBidderContainer}`}>
      <div className="double" style={{ alignItems: 'center' }}>
        <h3>Registered Bidders ({bidders?.length})</h3>
        <div onClick={handleExport} className="btn" style={{ color: '#FB6900' }}>
          <Download /> Export records (.csv)
        </div>
      </div>

      <br />
      <br />

      <div className="double">
        <p><span>User</span></p>
        <p><span>Date Registered</span></p>
      </div>

      <br />

      {bidders?.map((user) => (
        <div className={styles.user} key={user?.id}>
          <div
            className="double"
            onClick={() =>
              setIsOpen(isOpen === user?.id ? null : user?.id)
            }
          >
            <div className={styles.userDetails}>
              <img src={user?.user?.profile_image_url} alt="user" />
              <div>
                <p className={styles.name}>
                  {user?.first_name} {user?.last_name}
                </p>
                <p style={{ color: '#3A3930' }}>{user?.email}</p>
              </div>
            </div>

            <div className="btn">
              <p style={{ color: '#3A3930', fontWeight: '700' }}>
                {new Date(user?.created_at).toDateString()}
              </p>

              {isOpen === user?.id ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
          </div>

          <div
            className={
              isOpen === user?.id
                ? styles.futherDetails
                : styles.noShow
            }
          >
            <ul>
              <li>
                <p>
                  Employment status:
                  <span>{user?.employment_status}</span>
                </p>
              </li>

              <li>
                <p>
                  Account number:
                  <span>{user?.refund_account_number}</span>
                </p>
              </li>

              <li>
                <p>
                  Bank name:
                  <span>{user?.refund_bank_name}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisteredBidders;