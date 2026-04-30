import React from 'react';
import { PROJECTS, PERSONAL_INFO, UI_TEXT } from '../constants';

const Projects = () => {
    return (
        <section id="projects" className="pt-32 pb-24 px-6 min-h-[calc(100vh-100px)] relative bg-white dark:bg-[#030712] transition-colors duration-200 overflow-hidden section-reveal">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 dark:bg-amber-500/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto px-6 sm:px-16 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        {UI_TEXT.projects.title} <span className="text-amber-600 dark:text-amber-400">{UI_TEXT.projects.highlight}</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-amber-600 dark:bg-amber-400 mx-auto rounded-full"></div>
                    <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {UI_TEXT.projects.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {PROJECTS.map((project) => (
                        <div key={project.id} className="group modern-card overflow-hidden hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col">

                            {/* Color Header Strip (Minimalist) */}
                            <div className={`h-6 w-full bg-gradient-to-r ${project.imageGradient}`}></div>

                            {/* Project Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow italic">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((tag) => (
                                        <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md border border-amber-500/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-lg transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 ${
                                            project.title === "My Portfolio"
                                                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-700/15 focus-visible:ring-amber-500/25"
                                                : "bg-[#cb3837] hover:bg-[#b62f2e] shadow-red-700/15 focus-visible:ring-red-600/25"
                                        }`}
                                    >
                                        {project.title === "My Portfolio" ? "View Live" : "View npm"}
                                        {project.title === "My Portfolio" ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h4m0 0v4m0-4L9 15" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M1.5 7.5h21v7.56h-6v1.44H12v-1.44H1.5V7.5Zm1.5 6h3V9H4.5v3H6V9h1.5v4.5h3V9H12v4.5h3V9h4.5v4.5H21V9h-1.5v4.5H18V10.5h-1.5v3H13.5V9H9v3H7.5V9H3v4.5Z" />
                                            </svg>
                                        )}
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#24292f] text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-lg shadow-gray-950/15 transition-all hover:-translate-y-0.5 hover:bg-[#111827] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/20 dark:bg-white dark:text-[#24292f] dark:hover:bg-gray-100 dark:focus-visible:ring-white/25"
                                    >
                                        View GitHub
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* More projects link */}
                <div className="mt-16 text-center">
                    <a
                        href={PERSONAL_INFO.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 group text-gray-900 dark:text-white font-bold hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                    >
                        <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"></path></svg>
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-500 after:transition-all group-hover:after:w-full">{UI_TEXT.projects.view_more}</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
