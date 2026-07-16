const Footer = () => {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800">
            <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center leading-snug max-w-full">
                    <span>Copyright &copy; 2026</span>
                    <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">·</span>
                    <span>All rights reserved</span>
                    <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">·</span>
                    <span>V1.1.0</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
