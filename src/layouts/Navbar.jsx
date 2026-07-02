import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

const SunIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
);

const ThemeButton = ({ darkMode, setDarkMode, className = '' }) => (
    <button
        onClick={() => setDarkMode(!darkMode)}
        className={`theme-toggle ${className}`}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
        <span className="theme-toggle__glow" aria-hidden="true"></span>
        <span className="theme-toggle__icon" key={darkMode ? 'sun' : 'moon'}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
        </span>
    </button>
);

const Navbar = ({ darkMode, setDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrollProgress, setScrollProgress] = useState(0);

    const scrollToSection = (event, link) => {
        event.preventDefault();
        const sectionId = link.href.replace('#', '');
        const target = document.getElementById(sectionId);
        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', link.href);
        setActiveSection(sectionId);
        setIsOpen(false);
    };

    useEffect(() => {
        let frameId = null;

        const handleScroll = () => {
            if (frameId) return;

            frameId = window.requestAnimationFrame(() => {
                frameId = null;
                updateNavState();
            });
        };

        const updateNavState = () => {
            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;
            const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

            setScrollProgress(Math.min(Math.max(nextProgress, 0), 1));

            const bottomReached =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

            if (bottomReached) {
                setActiveSection(NAV_LINKS[NAV_LINKS.length - 1].href.replace('#', ''));
                return;
            }

            const checkpoint = window.scrollY + window.innerHeight * 0.35;
            const current = NAV_LINKS.reduce((prev, link) => {
                const section = document.getElementById(link.href.replace('#', ''));
                if (!section) return prev;
                return checkpoint >= section.offsetTop ? link.href.replace('#', '') : prev;
            }, 'home');

            setActiveSection(current);
        };

        updateNavState();
        window.addEventListener('resize', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            if (frameId) window.cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
            <div className="mx-auto max-w-2xl px-6 h-16 flex items-center justify-between gap-4 md:justify-center">
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link)}
                                className={`relative text-sm transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-current after:transition-all after:duration-200 ${
                                    isActive
                                        ? 'text-neutral-900 after:w-full dark:text-neutral-50'
                                        : 'text-neutral-500 after:w-0 hover:text-neutral-900 hover:after:w-full dark:text-neutral-400 dark:hover:text-neutral-50'
                                }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                    <ThemeButton darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>

                <div className="flex w-full items-center justify-between md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <span className={`block w-5 h-px bg-neutral-900 dark:bg-neutral-50 transition-transform ${isOpen ? 'translate-y-[3px] rotate-45' : ''}`}></span>
                        <span className={`block w-5 h-px bg-neutral-900 dark:bg-neutral-50 transition-transform ${isOpen ? '-translate-y-[3px] -rotate-45' : ''}`}></span>
                    </button>
                    <ThemeButton darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-full bg-neutral-200 dark:bg-neutral-800" aria-hidden="true">
                <span
                    className="block h-full w-full origin-left bg-neutral-900 will-change-transform dark:bg-neutral-50"
                    style={{ transform: `scaleX(${scrollProgress})` }}
                ></span>
            </div>

            {isOpen && (
                <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800">
                    <div className="mx-auto max-w-2xl px-6 py-4 flex flex-col gap-3">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link)}
                                    className={`text-sm py-1 underline-offset-4 ${
                                        isActive
                                            ? 'text-neutral-900 underline dark:text-neutral-50'
                                            : 'text-neutral-500 no-underline dark:text-neutral-400'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
