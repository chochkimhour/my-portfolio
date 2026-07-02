import { PROJECTS, PERSONAL_INFO, UI_TEXT } from '../constants';

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
    return (
        <section id="projects" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <SectionHeader slug="§ 05 · PROJECTS" title="Projects" count={PROJECTS.length} />

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
                    {UI_TEXT.projects.description}
                </p>

                <ul className="space-y-10">
                    {PROJECTS.map((project, index) => {
                        const primaryUrl = project.liveUrl;
                        const primaryLabel = project.id === 1 ? 'View live' : 'View on npm';
                        return (
                            <li key={project.id} className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
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
                                        className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
                                    >
                                        {primaryLabel} ↗
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
                                    >
                                        Source ↗
                                    </a>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <a
                        href={PERSONAL_INFO.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
                    >
                        All projects on GitHub →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
