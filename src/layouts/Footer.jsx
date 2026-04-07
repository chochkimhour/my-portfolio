import { PERSONAL_INFO } from '../constants';

const Footer = () => {
    const socials = [
        { url: PERSONAL_INFO.telegramUrl, svg: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
        { url: PERSONAL_INFO.linkedinUrl, svg: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
        { url: PERSONAL_INFO.gitlabUrl, svg: "M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.49A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" }
    ];

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
