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

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
                        <a
                            href="#"
                            download
                            className="w-full sm:w-auto px-12 py-5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-xl shadow-amber-600/20 hover:shadow-amber-700/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                            <span>{UI_TEXT.hero.cv_button}</span>
                            <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
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
