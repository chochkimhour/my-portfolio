import { SERVICES, UI_TEXT } from '../constants';

const Services = () => {
    return (
        <section id="services" className="py-24 px-6 relative bg-white dark:bg-gray-900 transition-colors duration-200 overflow-hidden section-reveal">
            {/* 🌋 Unique Background Aura */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/[0.03] dark:bg-amber-500/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto px-6 sm:px-16 relative z-10">
                <div className="text-center mb-20 animate-fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        {UI_TEXT.services.title} <span className="text-amber-600 dark:text-amber-400">{UI_TEXT.services.highlight}</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-amber-600 dark:bg-amber-400 mx-auto rounded-full"></div>
                    <p className="mt-8 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {UI_TEXT.services.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
                    {SERVICES.map((service, index) => (
                        <div 
                            key={index} 
                            className="group relative p-10 modern-card hover:border-amber-500/30 hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden"
                        >
                            {/* Animated Background Highlight */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-[80px] group-hover:bg-amber-500/20 transition-all duration-500 rounded-full"></div>
                            
                            {/* Icon Container */}
                            <div className="w-16 h-16 mb-8 flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-amber-600 rounded-2xl shadow-inner group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                                {service.icon === 'code' && (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                )}
                                {service.icon === 'server' && (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                                )}
                                {service.icon === 'window' && (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                )}
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                {service.description}
                            </p>

                            {/* Decorative bottom bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
