import React, { useEffect, useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

const ScreenLoader = ({ delay = 2000 }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!loading) return null;

    return (
        <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#101828',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
        }}>
        <ClimbingBoxLoader color="#C59508" speedMultiplier={1} />
        </div>
    );
};

export default ScreenLoader;
