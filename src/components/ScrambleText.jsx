import { useState, useRef } from 'react';

const ScrambleText = ({ text, className = '' }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef(null);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

    const scramble = () => {
        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
            }
            iteration += 1 / 3;
        }, 30);
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    return (
        <span
            className={`cursor-default ${className}`}
            onMouseEnter={scramble}
            onMouseLeave={reset}
        >
            {displayText}
        </span>
    );
};

export default ScrambleText;
