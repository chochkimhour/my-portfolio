import { SKILLS, PERSONAL_INFO } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

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

const StatCard = ({ label, value }) => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
    const numericValue = parseInt(value, 10);
    const count = useCountUp(numericValue || 0, isVisible);

    return (
        <div
            ref={ref}
            className={`reveal ${isVisible ? 'is-visible' : ''} card-lift card-glow text-center p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 cursor-default`}
        >
            <span className="block font-mono text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tabular-nums">
                {numericValue ? `${count}+` : value}
            </span>
            <span className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1">
                {label}
            </span>
        </div>
    );
};

const About = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [textRef, textVisible] = useScrollReveal();
    const [stackRef, stackVisible] = useScrollReveal();

    const stack = [
        { category: 'Languages', items: SKILLS.languages },
        { category: 'Frameworks', items: SKILLS.frameworks },
        { category: 'Data', items: SKILLS.databases },
        { category: 'Tools', items: SKILLS.devops },
    ];

    return (
        <section id="about" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
                    <SectionHeader slug="§ 01 · ABOUT" title="Overview" />
                </div>

                <div ref={textRef} className={`reveal ${textVisible ? 'is-visible' : ''} space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed mb-12`}>
                    <p>{PERSONAL_INFO.aboutP1}</p>
                    <p>{PERSONAL_INFO.aboutP2}</p>
                </div>

                {/* Stats row */}
                {PERSONAL_INFO.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-12">
                        {PERSONAL_INFO.stats.map((stat) => (
                            <StatCard key={stat.label} label={stat.label} value={stat.value} />
                        ))}
                    </div>
                )}

                <div ref={stackRef} className={`reveal ${stackVisible ? 'is-visible' : ''}`}>
                    <SectionHeader slug="§ 02 · STACK" title="Stack" count={stack.length} />
                    <div className="grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 sm:grid-cols-2 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                        {stack.map((s, i) => (
                            <div key={s.category} className="bg-white dark:bg-neutral-950 p-5 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:scale-[1.02] origin-left">
                                <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 mb-2 block tabular-nums">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                                    {s.category}
                                </span>
                                <span className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                                    {s.items.join(', ')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
