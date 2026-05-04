const env = import.meta.env;
const fromEnv = (key, fallback) => env[key] || fallback;
const fromEnvList = (key, fallback) =>
    fromEnv(key, fallback.join(","))
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
const userRole = fromEnv("USER_ROLE", "Your Role");

export const NAV_LINKS = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export const SKILLS = {
    languages: fromEnvList("SKILLS_LANGUAGES", ["HTML", "CSS", "JavaScript"]),
    frameworks: fromEnvList("SKILLS_FRAMEWORKS", ["React JS", "Node.js", "Tailwind CSS"]),
    databases: fromEnvList("SKILLS_DATABASES", ["PostgreSQL", "MySQL"]),
    devops: fromEnvList("SKILLS_DEVOPS", ["Git", "Docker", "CI/CD"])
};

export const PROJECTS = [
    {
        id: 1,
        title: fromEnv("PROJECT_1_TITLE", "My Portfolio"),
        description: fromEnv("PROJECT_1_DESCRIPTION", "A responsive personal portfolio built as a single-page React landing experience."),
        tech: fromEnvList("PROJECT_1_TECH", ["React", "Vite", "Tailwind CSS"]),
        imageGradient: "from-amber-500 to-orange-600",
        liveUrl: fromEnv("PORTFOLIO_URL", "https://yourusername.github.io/my-portfolio/"),
        githubUrl: fromEnv("PORTFOLIO_REPO_URL", "https://github.com/yourusername/my-portfolio")
    },
    {
        id: 2,
        title: fromEnv("PROJECT_2_TITLE", "khmer-chhankitek-calendar"),
        description: fromEnv("PROJECT_2_DESCRIPTION", "An npm package for working with the Khmer Chhankitek calendar."),
        tech: fromEnvList("PROJECT_2_TECH", ["JavaScript", "Calendar", "Khmer", "npm"]),
        imageGradient: "from-red-600 to-rose-700",
        liveUrl: fromEnv("KHMER_CHHANKITEK_CALENDAR_NPM_URL", "https://www.npmjs.com/package/khmer-chhankitek-calendar"),
        githubUrl: fromEnv("KHMER_CHHANKITEK_CALENDAR_REPO_URL", "https://github.com/yourusername/khmer-chhankitek-calendar")
    },
    {
        id: 3,
        title: fromEnv("PROJECT_3_TITLE", "init-backend-project"),
        description: fromEnv("PROJECT_3_DESCRIPTION", "A backend starter utility published on npm."),
        tech: fromEnvList("PROJECT_3_TECH", ["Node.js", "CLI", "Scaffolding", "npm"]),
        imageGradient: "from-blue-600 to-indigo-700",
        liveUrl: fromEnv("INIT_BACKEND_PROJECT_NPM_URL", "https://www.npmjs.com/package/init-backend-project"),
        githubUrl: fromEnv("INIT_BACKEND_PROJECT_REPO_URL", "https://github.com/yourusername/init-backend-project")
    }
];

export const PERSONAL_INFO = {
    name: fromEnv("USER_NAME", "Your Name"),
    role: userRole,
    roles: [userRole],
    email: fromEnv("USER_EMAIL", "your_email@example.com"),
    location: fromEnv("USER_LOCATION", "Your City, Country"),
    githubUrl: fromEnv("GITHUB_URL", "https://github.com/yourusername"),
    linkedinUrl: fromEnv("LINKEDIN_URL", "https://www.linkedin.com/in/yourusername"),
    npmPackageUrl: fromEnv("NPM_PACKAGE_URL", "https://www.npmjs.com/~yourusername"),
    telegramUrl: fromEnv("TELEGRAM_URL", "https://t.me/yourusername"),
    telegramUsername: fromEnv("TELEGRAM_USERNAME", "@yourusername"),
    tagline: fromEnv("TAGLINE", "A short professional tagline."),
    brandDescription: fromEnv("BRAND_DESCRIPTION", "A concise professional summary."),
    aboutP1: fromEnv("ABOUT_P1", "First paragraph of your about section."),
    aboutP2: fromEnv("ABOUT_P2", "Second paragraph of your about section."),
    expertise: fromEnvList("EXPERTISE_ITEMS", ["Web Apps", "Performance", "Scalable APIs"]),
    stats: [
        { label: fromEnv("STATS_1_LABEL", "Years Exp."), value: fromEnv("STATS_1_VALUE", "1+") },
        { label: fromEnv("STATS_2_LABEL", "Projects"), value: fromEnv("STATS_2_VALUE", "5") }
    ]
};

export const SEO_INFO = {
    title: fromEnv("SEO_TITLE", `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role} Portfolio`),
    description: fromEnv("SEO_DESCRIPTION", PERSONAL_INFO.brandDescription),
    ogTitle: fromEnv("SEO_OG_TITLE", `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role} Portfolio`),
    ogDescription: fromEnv("SEO_OG_DESCRIPTION", PERSONAL_INFO.tagline)
};

export const UI_TEXT = {
    hero: {
        github_button: "View My GitHub",
        npm_button: "View My npm Package"
    },
    about: {
        title: "About",
        highlight: "Me",
        description_title: "About Me",
        skills_title: "Skills"
    },
    services: {
        title: "Quality",
        highlight: "Services",
        description: "I specialize in building complex, high-fidelity digital solutions that bridge the gap between elegant design and technical excellence."
    },
    experience: {
        title: "Professional",
        highlight: "Experience"
    },
    projects: {
        title: "Featured",
        highlight: "Projects",
        description: "Here are some of my recent works. Each project comes with its own set of challenges, providing me with opportunities to learn and grow.",
        view_more: "View More on GitHub"
    },
    contact: {
        title: "Get In",
        highlight: "Touch",
        description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
        telegram: "Telegram",
        email: "Gmail",
        email_subtext: "Reach Out via Mail",
        linkedin: "LinkedIn",
        linkedin_subtext: "Professional Profile",
        message_me: "Message Me",
        send_email: "Send Email",
        connect: "Let's Connect"
    },
    footer: {
        rights: "All rights reserved.",
        navigation: "Navigation",
        social: "Social Connect",
        contact: "Contact"
    },
    bot: {
        assistant_name: "Assistant Bot",
        welcome_message: (name) => `Hello! I'm ${name}'s digital assistant. How can I help you today?`,
        active_status: "Active",
        placeholder: (name) => `Ask about ${name.split(' ')[0]}...`,
        suggested_questions: [
            "What are your core skills?",
            "Tell me about your projects.",
            "How can I contact you?",
            "Are you available for hire?"
        ]
    },
    robot: {
        greetings: ["HELLO! 👋", "HI THERE! 👋", "GM! ☕", "LET'S BUILD! 🚀", "I'M WATCHING!"],
        default_greeting: "I'M WATCHING!"
    }
};

export const SERVICES = [
    {
        title: fromEnv("SERVICE_1_TITLE", "API Design & Development"),
        description: fromEnv("SERVICE_1_DESCRIPTION", "Building reliable APIs for modern applications."),
        icon: "code"
    },
    {
        title: fromEnv("SERVICE_2_TITLE", "Database Architecture"),
        description: fromEnv("SERVICE_2_DESCRIPTION", "Designing practical database schemas and queries."),
        icon: "server"
    },
    {
        title: fromEnv("SERVICE_3_TITLE", "System Infrastructure"),
        description: fromEnv("SERVICE_3_DESCRIPTION", "Preparing maintainable infrastructure and deployment workflows."),
        icon: "window"
    }
];

export const EXPERIENCE = [
    {
        company: fromEnv("EXPERIENCE_1_COMPANY", "Company Name"),
        role: fromEnv("EXPERIENCE_1_ROLE", "Role Title"),
        startDate: fromEnv("EXPERIENCE_1_START_DATE", "2025-01-01"),
        endDate: fromEnv("EXPERIENCE_1_END_DATE", ""),
        description: fromEnv("EXPERIENCE_1_DESCRIPTION", "Describe your current role and impact.")
    },
    {
        company: fromEnv("EXPERIENCE_2_COMPANY", "Company Name"),
        role: fromEnv("EXPERIENCE_2_ROLE", "Role Title"),
        startDate: fromEnv("EXPERIENCE_2_START_DATE", "2024-01-01"),
        endDate: fromEnv("EXPERIENCE_2_END_DATE", "2024-12-01"),
        description: fromEnv("EXPERIENCE_2_DESCRIPTION", "Describe your previous role and impact.")
    },
    {
        company: fromEnv("EXPERIENCE_3_COMPANY", "Company Name"),
        role: fromEnv("EXPERIENCE_3_ROLE", "Role Title"),
        startDate: fromEnv("EXPERIENCE_3_START_DATE", "2024-01-01"),
        endDate: fromEnv("EXPERIENCE_3_END_DATE", "2024-06-01"),
        description: fromEnv("EXPERIENCE_3_DESCRIPTION", "Describe your earlier role and impact.")
    }
];
