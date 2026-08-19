'use client';

import { useEffect, useState } from 'react';

const Countdown = ({ startTime, duration }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!startTime || duration == null) return;

        const start = new Date(startTime).getTime();
        const end = start + Number(duration) * 60 * 1000;

        const updateCountdown = () => {
            const now = Date.now();
            const remaining = end - now;

            setTimeLeft(Math.max(remaining, 0));
        };

        updateCountdown();

        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [startTime, duration]);

    const totalSeconds = Math.floor(timeLeft / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        <span style={{color:"#FB0000"}}>
            {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
        </span>
    );
};

export default Countdown;