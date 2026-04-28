import React, { useEffect, useRef, memo } from 'react';
import { UI_TEXT } from '../constants';

const FloatingRobot = memo(() => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const x = (e.clientX - centerX) / centerX;
            const y = (e.clientY - centerY) / centerY;

            if (containerRef.current) {
                containerRef.current.style.setProperty('--mouse-x', x);
                containerRef.current.style.setProperty('--mouse-y', y);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleGreet = () => {
        window.dispatchEvent(new CustomEvent('greet-bot'));
    };

    return (
        <div
            ref={containerRef}
            onClick={handleGreet}
            className="relative w-24 h-24 sm:w-32 sm:h-32 group cursor-pointer active:scale-95 transition-transform"
            style={{
                '--mouse-x': 0,
                '--mouse-y': 0,
                '--head-x': 'calc(var(--mouse-x) * 5px)',
                '--head-y': 'calc(var(--mouse-y) * 3px)',
                '--eye-x': 'calc(var(--mouse-x) * 8px)',
                '--eye-y': 'calc(var(--mouse-y) * 5px)'
            }}
        >
            {/* Minimalist Robot SVG */}
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl overflow-visible">
                {/* Antennas */}
                <g className="transition-all duration-500">
                    <rect x="48" y="5" width="4" height="15" rx="2" className="fill-amber-600/20 dark:fill-amber-400/20 group-hover:fill-amber-600/40" />
                    <circle cx="50" cy="5" r="4" className="fill-amber-600 dark:fill-amber-400 group-hover:scale-125 transition-transform duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                </g>

                {/* Head - Parallax via CSS Variables */}
                <g style={{ transform: `translate(var(--head-x), var(--head-y))` }} className="transition-transform duration-300 ease-out">
                    <rect x="25" y="20" width="50" height="40" rx="12" className="fill-white dark:fill-gray-900 stroke-amber-600 dark:stroke-amber-400" strokeWidth="2.5" />
                    <rect x="35" y="32" width="30" height="15" rx="6" className="fill-gray-100 dark:fill-gray-800" />

                    {/* Eyes Display */}
                    <g style={{ transform: `translate(var(--eye-x), var(--eye-y))` }} className="transition-transform duration-300 ease-out">
                        <circle cx="42" cy="39" r="4" className="fill-amber-600 dark:fill-amber-400 group-hover:scale-110 transition-transform duration-500" />
                        <circle cx="58" cy="39" r="4" className="fill-amber-600 dark:fill-amber-400 group-hover:scale-110 transition-transform duration-500" />
                        <circle cx="43" cy="38" r="1.5" fill="white" fillOpacity="0.8" />
                        <circle cx="59" cy="38" r="1.5" fill="white" fillOpacity="0.8" />
                    </g>

                    {/* Mouth Emoji */}
                    <path d="M42 50 Q50 54 58 50" stroke="currentColor" className="text-amber-200 dark:text-amber-800 transition-colors duration-500" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Body */}
                <g>
                    <rect x="44" y="60" width="12" height="8" className="fill-gray-200 dark:fill-gray-700" />
                    <rect x="30" y="66" width="40" height="32" rx="10" className="fill-white dark:fill-gray-900 stroke-amber-600 dark:stroke-amber-400" strokeWidth="2.5" />
                    <rect x="38" y="74" width="24" height="6" rx="3" className="fill-gray-50 dark:fill-gray-800" />
                    <circle cx="50" cy="84" r="5" className="fill-amber-600 dark:fill-amber-400" />
                </g>

                {/* STATIC Left Arm (Symmetric Style) */}
                <g style={{ transformOrigin: '30px 78px' }}>
                    <path
                        d="M30 78 C18 78, 10 70, 10 52"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="text-amber-600 dark:text-amber-400"
                        fill="none"
                    />
                    <circle cx="10" cy="52" r="7" className="fill-amber-600 dark:fill-amber-400 shadow-sm" />
                    <circle cx="30" cy="78" r="3.5" className="fill-gray-100 dark:fill-gray-800 border border-amber-600/20" />
                </g>

                {/* ACTIVE Simple & Elegant Waving Arm (Right) */}
                <g className="animate-wave" style={{ transformOrigin: '70px 78px' }}>
                    <path
                        d="M70 78 C82 78, 92 70, 92 52"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="text-amber-600 dark:text-amber-400"
                        fill="none"
                    />
                    <circle cx="92" cy="52" r="7" className="fill-amber-600 dark:fill-amber-400 shadow-lg" />
                    <circle cx="70" cy="78" r="3.5" className="fill-gray-100 dark:fill-gray-800 border border-amber-600/20" />
                </g>
            </svg>

            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-3 bg-amber-600/10 dark:bg-amber-400/10 blur-xl rounded-full animate-pulse transition-all duration-500 group-hover:w-20 group-hover:bg-amber-600/20`}></div>

            {/* Interactive 'Hi' Bubble - Positioned near the simple waving hand */}
            <div className="absolute top-[18%] left-[88%] flex items-center transition-all duration-700 ease-out group-hover:translate-y-[-10px] group-hover:translate-x-[5px] transform-gpu z-30">
                <div className="relative">
                    {/* Bottom-Left Arrow pointing to hand zone */}
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-gray-900 rotate-45 border-b-2 border-l-2 border-amber-600/20 dark:border-amber-400/20"></div>

                    <span className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-amber-600 dark:text-amber-400 text-[10px] sm:text-[11px] font-black px-5 py-2.5 rounded-2xl whitespace-nowrap shadow-[0_20px_50px_rgba(0,0,0,0.25)] inline-block border-2 border-amber-600/20 dark:border-amber-400/20 animate-bounce [animation-duration:4s]">
                        HI! 👋
                    </span>
                </div>
            </div>
        </div>
    );
});

export default FloatingRobot;
