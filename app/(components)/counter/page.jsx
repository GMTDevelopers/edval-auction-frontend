'use client';

import { useEffect, useState } from 'react';

const Countdown = ({ startTime, duration, endTime }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        let end;

        // Use endTime if provided
        if (endTime) {
            end = new Date(endTime).getTime();
        }
        // Otherwise calculate it from startTime + duration
        else if (startTime && duration != null) {
            const start = new Date(startTime).getTime();
            end = start + Number(duration) * 60 * 1000;
        } else {
            return;
        }

        const updateCountdown = () => {
            const remaining = end - Date.now();
            setTimeLeft(Math.max(remaining, 0));
        };

        updateCountdown();

        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [startTime, duration, endTime]);

    const totalSeconds = Math.floor(timeLeft / 1000);

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        <div
            style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                color: "#FB0000",
                fontWeight: 700,
            }}
        >
            <div>
                <div>{String(days).padStart(2, "0")}</div>
                <small>Days</small>
            </div>

            <div>
                <div>{String(hours).padStart(2, "0")}</div>
                <small>Hrs</small>
            </div>

            <div>
                <div>{String(minutes).padStart(2, "0")}</div>
                <small>Mins</small>
            </div>

            <div>
                <div>{String(seconds).padStart(2, "0")}</div>
                <small>Secs</small>
            </div>
        </div>
    );
};

export default Countdown;