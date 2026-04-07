import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, PERSONAL_INFO } from '../constants';

const Navbar = ({ darkMode, setDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const updateTitle = (name) => {
        document.title = `${PERSONAL_INFO.name} | ${name}`;
    };

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScrollState = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScrollState);

        return () => {
            window.removeEventListener('scroll', handleScrollState);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled
                ? 'bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl py-3 border-b border-gray-200/50 dark:border-white/5 shadow-lg'
                : 'bg-transparent py-5'
            }`}>
            <div className="max-w-[1920px] mx-auto px-6 sm:px-12 flex items-center justify-between transition-all duration-300">

                {/* LOGO & STATUS */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 group">
                    <Link
                        to="/"
                        onClick={() => {
                            updateTitle('Home');
                            setIsOpen(false);
                        }}
                        className={`font-extrabold text-2xl tracking-tight transition-colors duration-300 cursor-pointer ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}
                    >
                        <span className="mr-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-600/10 dark:bg-white/10 border border-amber-600/20 dark:border-white/20 shadow-inner group-hover:scale-110 transition-all duration-300">
                            <span className="animate-coding">🧑‍💻</span>
                        </span> {PERSONAL_INFO.name}
                    </Link>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex space-x-8 text-white/90 font-bold items-center">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => {
                                    updateTitle(link.name);
                                }}
                                className={`relative group py-1 text-[11px] uppercase font-bold tracking-[0.2em] transition-all ${isActive 
                                    ? 'text-amber-600 dark:text-amber-400' 
                                    : 'text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-amber-600 dark:bg-amber-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </Link>
                        );
                    })}
                    {/* DESKTOP THEME SWITCH */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-amber-900/40 p-1 transition-colors duration-300 focus:outline-none group border border-gray-300/30 dark:border-amber-400/20"
                        aria-label="Toggle Dark Mode"
                    >
                        <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-amber-400 shadow-md transform transition-transform duration-300 flex items-center justify-center ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}>
                            {darkMode ? (
                                <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            ) : (
                                <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.576a1 1 0 10-1.414 1.414l1.414-1.414zM18.01 16.586a1 1 0 10-1.414 1.414l1.414-1.414zM4.576 18.01a1 1 0 101.414 1.414L4.576 18.01zM16.586 5.99a1 1 0 101.414 1.414L16.586 5.99z" /></svg>
                            )}
                        </div>
                    </button>
                </div>

                {/* MOBILE BUTTONS (Only visible on Medium/Small screens) */}
                <div className="flex items-center space-x-2 lg:hidden">
                    {/* MOBILE THEME SWITCH */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-amber-900/40 p-0.5 transition-colors duration-300 focus:outline-none group border border-gray-300/30 dark:border-amber-400/20"
                        aria-label="Toggle Dark Mode"
                    >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-amber-400 shadow-md transform transition-transform duration-300 flex items-center justify-center ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}>
                            {darkMode ? '🌙' : '☀️'}
                        </div>
                    </button>

                    <button
                        className={`p-2 relative w-10 h-10 flex items-center justify-center focus:outline-none ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {/* Animated Hamburger Icon */}
                        <div className="flex flex-col items-center justify-center w-6 h-6">
                            <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-current rounded-full my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-gray-200/50 dark:border-white/5 ${isOpen ? 'max-h-[500px] border-t opacity-100' : 'max-h-0 border-t-0 opacity-0'
                }`}>
                <div className="bg-white/95 dark:bg-[#030712]/95 backdrop-blur-2xl py-6 px-6 flex flex-col space-y-2">
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`font-bold py-3 px-4 rounded-xl transition-all ${isActive
                                    ? 'bg-amber-600 text-white shadow-lg'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400'
                                    }`}
                                onClick={() => {
                                    updateTitle(link.name);
                                    setIsOpen(false);
                                }}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* 🚀 Premium Scroll Progress Line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-200/20 dark:bg-white/5 pointer-events-none">
                <div 
                    className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.3)] transition-all duration-100"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>
        </nav>
    );
};

export default Navbar;
