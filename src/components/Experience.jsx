import { EXPERIENCE, UI_TEXT } from '../constants';

const formatPeriod = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : new Date();

    const options = { month: 'short', year: 'numeric' };
    const startFormatted = start.toLocaleDateString('en-US', options);
    const endFormatted = endStr ? end.toLocaleDateString('en-US', options) : 'Present';

    // Calculate total months
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    // Convert to readable Years + Months
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let duration = "";
    if (years > 0) duration += `${years} yr${years > 1 ? 's' : ''} `;
    if (remainingMonths > 0) duration += `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    if (!duration) duration = "1 mo"; // Edge case

    return `${startFormatted} — ${endFormatted} (${duration.trim()})`;
};

const Experience = () => {
    return (
        <section id="experience" className="py-24 px-6 bg-gray-50 dark:bg-gray-800/20 border-y border-gray-100 dark:border-gray-800/50 transition-colors duration-200 section-reveal">
            <div className="max-w-[1920px] mx-auto px-6 sm:px-16">
                <div className="text-center mb-20 animate-fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        {UI_TEXT.experience.title} <span className="text-amber-600 dark:text-amber-400">{UI_TEXT.experience.highlight}</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-amber-600 dark:bg-amber-400 mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
                    {EXPERIENCE.map((exp, index) => (
                        <div key={index} className="flex gap-4 sm:gap-8 group">
                            {/* Roadmap / Timeline marker */}
                            <div className="flex flex-col items-center">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] sm:border-4 border-amber-500 bg-white dark:bg-gray-900 z-10 group-hover:scale-125 group-hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20"></div>
                                {index !== EXPERIENCE.length - 1 && (
                                    <div className="w-0.5 sm:w-1 flex-grow bg-gradient-to-b from-amber-500 to-transparent my-1"></div>
                                )}
                            </div>

                            {/* Content Card */}
                            <div className="flex-grow pb-8 sm:pb-12">
                                <div className="modern-card p-6 sm:p-8 hover:shadow-amber-500/10 hover:-translate-y-2">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">{exp.role}</h3>
                                            <p className="text-sm sm:text-base text-amber-600 dark:text-amber-400 font-bold">{exp.company}</p>
                                        </div>
                                        <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-[10px] sm:text-xs font-black self-start tracking-wider uppercase">
                                            {formatPeriod(exp.startDate, exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
