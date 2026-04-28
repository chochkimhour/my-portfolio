import { PERSONAL_INFO } from '../constants';

const Footer = () => {
    return (
        <footer className="relative bg-gray-50 dark:bg-[#060b1a] transition-colors duration-500 pt-16 pb-12 overflow-hidden border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center text-center gap-8">

                    {/* 🏷️ Branding & Copyright */}
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                            &copy; {new Date().getFullYear()} <span className="mx-2 text-gray-300 dark:text-gray-700">|</span> {PERSONAL_INFO.name}
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-500 dark:text-gray-400">
                                {PERSONAL_INFO.role}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40"></span>
                            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-600 dark:text-amber-500/60 flex items-center gap-2 focus:outline-none select-none">
                                {PERSONAL_INFO.location.split(',')[1].trim()}
                                <svg className="w-3.5 h-3 rounded-[2px] shadow-sm ml-0.5 opacity-80" viewBox="0 0 1000 667">
                                    <path fill="#032EA1" d="M0 0h1000v667H0z" />
                                    <path fill="#E0000F" d="M0 167h1000v333H0z" />
                                    <path fill="#FFF" d="M500 240c-6 0-11 4-13 11l-24 64h74l-24-64c-2-7-7-11-13-11zm-55 133v10h110v-10H445zm-15 15h140v12H430v-12zm-5 18h150v5H425v-5zm-55-48l13 35h17l13-35c2-6 7-10 13-10h28c6 0 11 4 13 10l13 35h17l13-35c2-6 7-10 13-10h10c4 0 8 3 9 7l15 38h25v-45h-10c-6 0-11-4-13-10l-13-35c-2-6-7-10-13-10s-11 4-13 10l-13 35c-2 6-7 10-13 10H500h-38c-6 0-11-4-13-10l-13-35c-2-6-7-10-13-10s-11 4-13 10l-13 35c-2 6-7 10-13 10H380v45h25l15-38c1-4 5-7 9-7h10c6 0 11 4 13 10z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
