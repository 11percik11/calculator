import { useEffect, useRef, useState } from 'react';
import './StarAnimation.css';

export const StarAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const starsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.5, // Срабатывает когда 50% элемента видно
            }
        );

        if (starsRef.current) {
            observer.observe(starsRef.current);
        }

        return () => {
            if (starsRef.current) {
                observer.unobserve(starsRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={starsRef}
            className={`third-block-stars ${isVisible ? 'animate' : ''}`}
        >
            <img src='/landing/star.svg' alt='star'/>
            <img src='/landing/star-smaller.svg' alt='star'/>
            <img src='/landing/star-smaller.svg' alt='star'/>
            <img src='/landing/star-smallest.svg' alt='star'/>
            <img src='/landing/star-smallest.svg' alt='star'/>
        </div>
    );
};

export default StarAnimation;