import { useState, useEffect } from 'react';
import meImg from '../assets/images/me.jpg';
import { PERSONAL_INFO, UI_TEXT } from '../constants';

const MetaRow = ({ label, children }) => (
    <div className="grid grid-cols-[110px_1fr] gap-4 py-2 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0">
        <dt className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 pt-0.5">
            {label}
        </dt>
        <dd className="min-w-0 text-sm text-neutral-800 break-words dark:text-neutral-200">
            {children}
        </dd>
    </div>
);

const Hero = () => {
    const { name, roles, tagline, role, location, email } = PERSONAL_INFO;
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = roles[wordIndex];
        const speed = deleting ? 40 : 100;
        const t = setTimeout(() => {
            if (!deleting && text === word) {
                setTimeout(() => setDeleting(true), 1500);
            } else if (deleting && text === '') {
                setDeleting(false);
                setWordIndex((i) => (i + 1) % roles.length);
            } else {
                setText(word.substring(0, text.length + (deleting ? -1 : 1)));
            }
        }, speed);
        return () => clearTimeout(t);
    }, [text, deleting, wordIndex, roles]);

    return (
        <section id="home" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 pt-32 pb-20 md:pt-40">
                <div className="profile-image group relative mb-8 mx-auto h-40 w-40 rounded-full ring-2 ring-neutral-900/10 ring-offset-4 ring-offset-white dark:ring-white/15 dark:ring-offset-neutral-950 md:h-52 md:w-52">
                    <span className="profile-image__ring" aria-hidden="true"></span>
                    <span className="profile-image__shine" aria-hidden="true"></span>
                    <img
                        src={meImg}
                        alt={name}
                        className="relative z-10 h-full w-full rounded-full object-cover border-4 border-white dark:border-neutral-950 shadow-lg shadow-neutral-900/10 dark:shadow-black/30 transition duration-500 ease-out group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-2xl group-hover:shadow-neutral-900/20 dark:group-hover:shadow-black/50"
                    />
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-4 tracking-tight leading-[1.05] text-center flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                    <span>{name}</span>
                    <span
                        className="inline-flex shrink-0 text-sky-500"
                        role="img"
                        aria-label="Verified"
                        title="Verified"
                    >
                        <svg
                            className="w-6 h-6 md:w-8 md:h-8"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" />
                            <path
                                d="m10.09 15.75-3-3 1.41-1.41 1.59 1.58 3.91-3.91 1.41 1.42z"
                                fill="#fff"
                            />
                        </svg>
                    </span>
                </h1>

                <p className="text-2xl md:text-3xl font-bold text-neutral-700 dark:text-neutral-300 mb-6 text-center">
                    {text}
                    <span className="inline-block w-[2px] h-6 md:h-7 ml-1 bg-neutral-700 dark:bg-neutral-300 align-middle animate-pulse"></span>
                </p>

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-xl">
                    {tagline}
                </p>

                <dl>
                    <MetaRow label="Role">{role}</MetaRow>
                    <MetaRow label="Location">{location}</MetaRow>
                    <MetaRow label="Email">
                        <a
                            href={`mailto:${email}`}
                            className="break-all underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
                        >
                            {email}
                        </a>
                    </MetaRow>
                    <MetaRow label="Links">
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <a
                                href={PERSONAL_INFO.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href={PERSONAL_INFO.npmPackageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
                            >
                                npm ↗
                            </a>
                            <a
                                href={PERSONAL_INFO.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
                            >
                                LinkedIn ↗
                            </a>
                        </div>
                    </MetaRow>
                </dl>
            </div>
        </section>
    );
};

export default Hero;
