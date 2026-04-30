import { useState, useEffect, useMemo } from 'react';
import meImg from '../assets/images/me.jpg';
import FloatingRobot from './FloatingRobot';
import { PERSONAL_INFO, UI_TEXT } from '../constants';

const Hero = () => {
    const { name, roles, tagline } = PERSONAL_INFO;
    const words = useMemo(() => roles, [roles]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = isDeleting ? 40 : 100;
        const currentFullWord = words[currentWordIndex];

        const timer = setTimeout(() => {
            if (!isDeleting && currentText === currentFullWord) {
                // Pause at the end of word before deleting
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === '') {
                // Move to next word when fully deleted
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            } else {
                // Type or Delete
                setCurrentText(currentFullWord.substring(0, currentText.length + (isDeleting ? -1 : 1)));
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <section id="home" className="min-h-screen flex items-center pt-28 pb-20 px-6 sm:px-10 overflow-hidden scroll-mt-24 bg-white dark:bg-amber-950/20 transition-colors duration-200 relative">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#f59e0b_1px,transparent_1.5px)] [background-size:32px_32px]"></div>
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full translate-y-1/2"></div>
            </div>

            <div className="max-w-[1920px] mx-auto w-full px-6 sm:px-16 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 relative z-10">

                {/* Left Text Content */}
                <div className="flex-1 text-center lg:text-left space-y-6 sm:space-y-8 z-10 order-2 lg:order-1">
                    <div className="space-y-3 sm:space-y-4">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.1]">
                            {name}
                        </h1>
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-center lg:justify-start min-h-[1.2em]">
                            {currentText}
                            <span className="w-1 h-6 sm:h-8 md:h-9 lg:h-11 ml-2 bg-amber-600 dark:bg-amber-400 rounded-full animate-pulse"></span>
                        </h2>
                    </div>

                    <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 sm:px-0">
                        {tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-4 w-full">
                        <a
                            href={PERSONAL_INFO.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full sm:w-auto min-w-[220px] px-7 py-4 bg-[#24292f] text-white font-black rounded-xl border border-[#24292f] shadow-xl shadow-gray-950/20 hover:-translate-y-1 hover:bg-[#111827] hover:shadow-gray-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/20 dark:border-white/10 dark:bg-white dark:text-[#24292f] dark:hover:bg-gray-100 dark:focus-visible:ring-white/25 transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/14 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 dark:via-gray-900/10"></span>
                            <span className="relative flex w-10 h-10 items-center justify-center rounded-lg bg-white/12 ring-1 ring-white/10 dark:bg-gray-950/10 dark:ring-gray-950/10">
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                </svg>
                            </span>
                            <span className="relative flex flex-col items-start leading-none">
                                <span className="text-[10px] uppercase tracking-[0.18em] opacity-70 mb-1">GitHub</span>
                                <span className="text-sm sm:text-base">{UI_TEXT.hero.github_button}</span>
                            </span>
                        </a>

                        <a
                            href={PERSONAL_INFO.npmPackageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full sm:w-auto min-w-[235px] px-7 py-4 bg-[#cb3837] text-white font-black rounded-xl border border-[#cb3837] shadow-xl shadow-red-700/20 hover:-translate-y-1 hover:bg-[#b62f2e] hover:shadow-red-700/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600/25 dark:border-red-400/25 dark:bg-[#cb3837] dark:hover:bg-[#dc4544] transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/16 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700"></span>
                            <span className="relative flex w-10 h-10 items-center justify-center rounded-lg bg-white text-[#cb3837] shadow-lg shadow-red-950/10">
                                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M1.5 7.5h21v7.56h-6v1.44H12v-1.44H1.5V7.5Zm1.5 6h3V9H4.5v3H6V9h1.5v4.5h3V9H12v4.5h3V9h4.5v4.5H21V9h-1.5v4.5H18V10.5h-1.5v3H13.5V9H9v3H7.5V9H3v4.5Z" />
                                </svg>
                            </span>
                            <span className="relative flex flex-col items-start leading-none">
                                <span className="text-[10px] uppercase tracking-[0.18em] text-white/75 mb-1">npm Package</span>
                                <span className="text-sm sm:text-base">{UI_TEXT.hero.npm_button}</span>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Right Image Content */}
                <div className="flex-1 lg:flex-[0.8] relative flex justify-center z-10 w-full max-w-sm sm:max-w-md lg:max-w-none order-1 lg:order-2">
                    {/* Floating mascot position */}
                    <div className="absolute -top-12 right-6 sm:-top-20 sm:right-12 z-20">
                        <FloatingRobot />
                    </div>

                    {/* Minimalist Backdrop element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-amber-500/5 dark:bg-amber-400/5 blur-3xl rounded-full"></div>

                    <div className="relative group w-full aspect-square max-w-[340px] sm:max-w-[400px]">
                        {/* Dynamic Glowing Rings */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                        {/* Offset Background Card */}
                        <div className="absolute inset-0 bg-amber-500/10 dark:bg-amber-500/5 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 border border-amber-500/20"></div>

                        {/* Main Image with Premium Border */}
                        <div className="absolute inset-0 p-3 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl group-hover:-translate-y-4 transition-transform duration-500 border border-gray-100 dark:border-gray-700">
                            <img
                                src={meImg}
                                alt={name}
                                className="w-full h-full object-cover rounded-[1.8rem]"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
