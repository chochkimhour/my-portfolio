import { PERSONAL_INFO, UI_TEXT } from '../constants';

const SectionHeader = ({ slug, title }) => (
    <div className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
            {slug}
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {title}
        </h2>
    </div>
);

const Contact = () => {
    const linkedinLabel = PERSONAL_INFO.linkedinUrl
        .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')
        .replace(/\/$/, '');

    const links = [
        { label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
        { label: 'Telegram', value: PERSONAL_INFO.telegramUsername, href: PERSONAL_INFO.telegramUrl },
        { label: 'LinkedIn', value: linkedinLabel || UI_TEXT.contact.linkedin_subtext, href: PERSONAL_INFO.linkedinUrl },
        { label: 'GitHub', value: PERSONAL_INFO.githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, ''), href: PERSONAL_INFO.githubUrl },
    ];

    return (
        <section id="contact" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <SectionHeader slug="§ 06 · CONTACT" title="Contact" />

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
                    {UI_TEXT.contact.description}
                </p>

                <div className="grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 sm:grid-cols-2 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                    {links.map((link) => (
                        <div
                            key={link.label}
                            className="group bg-white dark:bg-neutral-950 p-5 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:shadow-md hover:scale-[1.02]"
                        >
                            <dt className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                                {link.label}
                            </dt>
                            <dd>
                                <a
                                    href={link.href}
                                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="text-sm text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 group-hover:decoration-neutral-900 dark:group-hover:decoration-neutral-100 transition-colors break-all"
                                >
                                    {link.value}
                                </a>
                            </dd>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
