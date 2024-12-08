import React, { useEffect, useState } from "react";

const Time = () => {
    const [time, setTime] = useState(null);
    const [background, setBackground] = useState('');

    useEffect(() => {
        const timeFetcher = async () => {
            try {
                const response = await fetch('http://worldtimeapi.org/');
                if (!response.ok) {
                    throw new Error(`HTTP Error: Status : ${response.status}`)
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error while fetching : ', error);
            }
        }
    })
}

export default Time;