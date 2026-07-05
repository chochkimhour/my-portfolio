import { SERVICES, UI_TEXT } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SectionHeader = ({ slug, title, count }) => (
    <div className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
            {slug}
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {title}
            {count !== undefined && (
                <span className="font-mono text-base font-medium text-neutral-400 dark:text-neutral-500 ml-1">
                    ({count})
                </span>
            )}
        </h2>
    </div>
);

const ServiceIcon = ({ icon }) => {
    const icons = {
        code: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25M6.75 17.25 1.5 12l5.25-5.25M14.25 3.75l-4.5 16.5" />
            </svg>
        ),
        server: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Z" />
            </svg>
        ),
        window: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        ),
    };

    return (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 mb-4 transition-colors group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-50 dark:group-hover:text-neutral-900">
            {icons[icon] || icons.code}
        </span>
    );
};

const Services = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [descRef, descVisible] = useScrollReveal();
    const [gridRef, gridVisible] = useScrollReveal();

    return (
        <section id="services" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
                    <SectionHeader slug="§ 03 · SERVICES" title="Services" count={SERVICES.length} />
                </div>

                <p ref={descRef} className={`reveal ${descVisible ? 'is-visible' : ''} text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10`}>
                    {UI_TEXT.services.description}
                </p>

                <div ref={gridRef} className={`reveal ${gridVisible ? 'is-visible' : ''} grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 sm:grid-cols-3 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800`}>
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-neutral-950 p-6 flex flex-col transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:scale-[1.03] hover:shadow-lg hover:z-10 relative"
                        >
                            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 mb-3 tabular-nums">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <ServiceIcon icon={service.icon} />
                            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50 mb-2 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                                {service.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
