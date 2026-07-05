import { PROJECTS, PERSONAL_INFO, UI_TEXT } from '../constants';
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

const Projects = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [descRef, descVisible] = useScrollReveal();
    const [listRef, listVisible] = useScrollReveal();

    return (
        <section id="projects" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
                    <SectionHeader slug="§ 05 · PROJECTS" title="Projects" count={PROJECTS.length} />
                </div>

                <p ref={descRef} className={`reveal ${descVisible ? 'is-visible' : ''} text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10`}>
                    {UI_TEXT.projects.description}
                </p>

                <div ref={listRef} className={`reveal ${listVisible ? 'is-visible' : ''}`}>
                    <ul className="space-y-10">
                        {PROJECTS.map((project, index) => {
                            const primaryUrl = project.liveUrl;
                            const primaryLabel = project.id === 1 ? 'View live' : 'View on npm';
                            return (
                                <li key={project.id} className="border-t border-neutral-200 dark:border-neutral-800 pt-6 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                                    <div className="flex items-baseline justify-between gap-4 mb-4">
                                        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                                            {project.title}
                                        </h3>
                                        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <dl className="mb-4">
                                        <MetaRow label="Stack">{project.tech.join(', ')}</MetaRow>
                                        <MetaRow label="Type">{project.id === 1 ? 'Web app' : 'npm package'}</MetaRow>
                                    </dl>

                                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                        <a
                                            href={primaryUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-all"
                                        >
                                            <span className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center transition-colors group-hover:bg-neutral-900 dark:group-hover:bg-neutral-50">
                                                <svg className="w-2.5 h-2.5 text-neutral-500 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </span>
                                            {primaryLabel}
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-all"
                                        >
                                            <svg className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" clipRule="evenodd" />
                                            </svg>
                                            Source
                                        </a>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                        <a
                            href={PERSONAL_INFO.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-all"
                        >
                            All projects on GitHub
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
