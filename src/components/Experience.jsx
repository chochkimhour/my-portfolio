import { EXPERIENCE } from '../constants';
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

const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}.${mm}.${d.getFullYear()}`;
};

const computeDuration = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : new Date();
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const rem = months % 12;
    let out = '';
    if (years > 0) out += `${years} yr${years > 1 ? 's' : ''} `;
    if (rem > 0) out += `${rem} mo${rem > 1 ? 's' : ''}`;
    return out.trim() || '1 mo';
};

const MetaRow = ({ label, children }) => (
    <div className="grid grid-cols-[110px_1fr] gap-4 py-1.5">
        <dt className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {label}
        </dt>
        <dd className="text-sm text-neutral-800 dark:text-neutral-200">
            {children}
        </dd>
    </div>
);

const Experience = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [listRef, listVisible] = useScrollReveal();

    return (
        <section id="experience" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
                    <SectionHeader slug="§ 04 · EXPERIENCE" title="Experience" count={EXPERIENCE.length} />
                </div>

                <div ref={listRef} className={`reveal ${listVisible ? 'is-visible' : ''}`}>
                    <ul className="space-y-10">
                        {EXPERIENCE.map((exp, index) => (
                            <li key={index} className="group border-t border-neutral-200 dark:border-neutral-800 pt-6 transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 -mx-4 px-4 rounded-lg border-l-4 border-l-transparent hover:border-l-amber-500/60 dark:hover:border-l-amber-400/60">
                                <div className="flex items-baseline justify-between gap-4 mb-4">
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                                        {exp.role}
                                    </h3>
                                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <dl className="mb-4">
                                    <MetaRow label="Company">{exp.company}</MetaRow>
                                    <MetaRow label="Period">
                                        <span className="font-mono tabular-nums">
                                            {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                                        </span>
                                    </MetaRow>
                                    <MetaRow label="Duration">
                                        <span className="font-mono">{computeDuration(exp.startDate, exp.endDate)}</span>
                                    </MetaRow>
                                </dl>

                                <ul className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-1">
                                    {exp.description.split('\n').filter(item => item.trim()).map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 shrink-0" />
                                            {item.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Experience;
