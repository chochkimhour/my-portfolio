import { PERSONAL_INFO, UI_TEXT } from '../constants';

const Contact = () => {
    const linkedinLabel = PERSONAL_INFO.linkedinUrl
        .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')
        .replace(/\/$/, '');

    return (
        <section id="contact" className="py-32 px-6 min-h-[calc(100vh-100px)] relative bg-white dark:bg-[#030712] transition-colors duration-500 overflow-hidden section-reveal">
            {/* 🌌 Animated Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 dark:bg-amber-600/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                        {UI_TEXT.contact.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600 animate-text-gradient">{UI_TEXT.contact.highlight}</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-medium">
                        {UI_TEXT.contact.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Telegram Card */}
                    <a href={PERSONAL_INFO.telegramUrl} target="_blank" rel="noopener noreferrer"
                        className="group p-10 modern-card hover:border-amber-500/50 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0088cc] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-24 h-24 bg-[#0088cc] text-white rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-[#0088cc]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-8">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{UI_TEXT.contact.telegram}</h4>
                        <p className="text-gray-500 dark:text-gray-400 font-bold mb-4 break-all">{PERSONAL_INFO.telegramUsername}</p>
                        <span className="text-amber-600 dark:text-amber-400 font-black flex items-center gap-2 opacity-100 md:opacity-0 transition-all translate-y-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                            {UI_TEXT.contact.message_me} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7" /></svg>
                        </span>
                    </a>

                    {/* Email Card */}
                    <a href={`mailto:${PERSONAL_INFO.email}`}
                        className="group p-10 modern-card hover:border-amber-500/50 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#EA4335] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-24 h-24 bg-[#EA4335] text-white rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-[#EA4335]/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 mb-8">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path></svg>
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{UI_TEXT.contact.email}</h4>
                        <p className="text-gray-500 dark:text-gray-400 font-bold mb-4 break-all">{PERSONAL_INFO.email}</p>
                        <span className="text-amber-600 dark:text-amber-400 font-black flex items-center gap-2 opacity-100 md:opacity-0 transition-all translate-y-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                            {UI_TEXT.contact.send_email} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7" /></svg>
                        </span>
                    </a>

                    {/* LinkedIn Card */}
                    <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer"
                        className="group p-10 modern-card hover:border-amber-500/50 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0a66c2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-24 h-24 bg-[#0a66c2] text-white rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-[#0a66c2]/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mb-8">
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{UI_TEXT.contact.linkedin}</h4>
                        <p className="text-gray-500 dark:text-gray-400 font-bold mb-4 break-all">{linkedinLabel || UI_TEXT.contact.linkedin_subtext}</p>
                        <span className="text-amber-600 dark:text-amber-400 font-black flex items-center gap-2 opacity-100 md:opacity-0 transition-all translate-y-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                            {UI_TEXT.contact.connect} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7" /></svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
