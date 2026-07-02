import { SERVICES, UI_TEXT } from '../constants';

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

const Services = () => {
    return (
        <section id="services" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <SectionHeader slug="§ 03 · SERVICES" title="Services" count={SERVICES.length} />

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
                    {UI_TEXT.services.description}
                </p>

                <div className="grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 sm:grid-cols-3 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-neutral-950 p-6 flex flex-col"
                        >
                            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 mb-3 tabular-nums">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50 mb-2">
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
