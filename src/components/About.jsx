import { SKILLS, PERSONAL_INFO, UI_TEXT } from '../constants';

const About = () => {
    return (
        <section id="about" className="pt-32 pb-24 px-6 min-h-[calc(100vh-100px)] relative bg-white dark:bg-amber-950/10 border-y border-gray-100 dark:border-gray-800/50 transition-colors duration-200 overflow-hidden section-reveal">
            {/* Background Blob Decorations */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-amber-500/5 dark:bg-amber-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/5 dark:bg-amber-600/5 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto px-6 sm:px-16 relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        {UI_TEXT.about.title} <span className="text-amber-600 dark:text-amber-400">{UI_TEXT.about.highlight}</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-amber-600 dark:bg-amber-400 mx-auto rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    {/* Left text */}
                    <div className="flex-1 space-y-6 text-lg text-gray-600 dark:text-gray-300">
                        <p className="leading-relaxed">
                            {PERSONAL_INFO.aboutP1}
                        </p>
                        <p className="leading-relaxed">
                            {PERSONAL_INFO.aboutP2}
                        </p>

                        {/* Stats / Highlight Box */}
                        <div className="pt-4 sm:pt-6 flex flex-wrap gap-6 sm:gap-8 justify-center md:justify-start">
                            {PERSONAL_INFO.stats.map((stat, index) => (
                                <div key={index} className="flex gap-6 sm:gap-8 items-center">
                                    <div className="flex flex-col group items-center md:items-start">
                                        <span className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 mb-1 group-hover:scale-110 transition-transform">
                                            {stat.value}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-center md:text-left">
                                            {stat.label}
                                        </span>
                                    </div>
                                    {index < PERSONAL_INFO.stats.length - 1 && (
                                        <div className="w-px h-10 bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Skills Box */}
                    <div className="flex-1 w-full modern-card p-6 sm:p-10 hover:shadow-2xl relative overflow-hidden">
                        {/* Subtle Background Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full"></div>
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-600/10 blur-3xl rounded-full"></div>

                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-8 relative z-10">{UI_TEXT.about.skills_title}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            {/* Languages Category */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-px bg-amber-600/50"></span> Languages
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.languages.map((skill, index) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 hover:-translate-y-0.5 transition-all cursor-default shadow-sm"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Frameworks Category */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-px bg-amber-600/50"></span> Frameworks
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.frameworks.map((skill, index) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 hover:-translate-y-0.5 transition-all cursor-default shadow-sm"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Databases Category */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-px bg-amber-600/50"></span> Data Systems
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.databases.map((skill, index) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 hover:-translate-y-0.5 transition-all cursor-default shadow-sm"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* DevOps Category */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-px bg-amber-600/50"></span> DevOps & Tools
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.devops.map((skill, index) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 hover:-translate-y-0.5 transition-all cursor-default shadow-sm"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
