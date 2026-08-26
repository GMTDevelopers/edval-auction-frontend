'use client';

import { useEffect, useState } from 'react';

const Countdown = ({ startTime, duration, endTime }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let end;

    // Option 1: Use endTime directly
    if (endTime) {
      end = new Date(endTime).getTime();
    }
    // Option 2: Calculate end time from startTime + duration
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

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <span style={{ color: '#FB0000' }}>
      {String(hours).padStart(2, '0')}:
      {String(minutes).padStart(2, '0')}:
      {String(seconds).padStart(2, '0')}
    </span>
  );
};

export default Countdown;



/* 'use client';

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

export default Countdown; */