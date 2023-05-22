import moment from "moment";
import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
    const targetDateMs = Date.parse(targetDate);
    const [countDown, setCountDown] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTime() {
            setIsLoading(true);
            const response = await fetch(
                `https://developers-notifications.talrop.com/api/v1/main/send/current-time/`
            );
            const data = await response.json();
            setCurrentTime(Date.parse(`${data.data.current_time}+05:30`));

            if (data) {
                setIsLoading(false);
            }
        }

        if (targetDateMs) fetchTime();
    }, [targetDateMs]);

    useEffect(() => {
        if (targetDateMs && currentTime)
            setCountDown(targetDateMs - currentTime);
    }, [currentTime, targetDateMs]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown((countDown) => countDown - 1000);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return getReturnValues(countDown, isLoading);
};

const getReturnValues = (countDown, isLoading) => {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 1;
    // calculate time left
    if (countDown) {
        days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        // minutes = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60));
        seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    }

    let isDanger = false;
    if (seconds < 11 && hours < 1 && minutes < 1) {
        isDanger = true;
    }

    return [days, hours, minutes, seconds, isLoading, isDanger];
};

export { useCountdown };
