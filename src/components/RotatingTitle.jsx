import { useState, useEffect } from 'react';

const RotatingTitle = () => {
    const titles = [
        'web3 engineer',
        'AI fullstack engineer',
        'prompt engineer',
        'senior software engineer',
        'vibecoder',
        'frontend engineer'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % titles.length);
                setIsVisible(true);
            }, 400); // fade out duration
        }, 2500); // change every 2.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative inline-block overflow-hidden">
            <span
                className="inline-block transition-all duration-400 ease-in-out"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
            >
                {titles[currentIndex]}
            </span>
        </div>
    );
};

export default RotatingTitle;
