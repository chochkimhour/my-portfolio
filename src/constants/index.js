const env = import.meta.env;
const fromEnv = (key, fallback) => env[key] || fallback;
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
    languages: ["HTML", "CSS", "JavaScript", "Java", "Groovy", "Python"],
    frameworks: ["Node.js", "Express", "NestJS", "Spring Boot", "React JS", "Tailwind CSS", "Grails"],
    databases: ["MySQL", "PostgreSQL", "Redis"],
    devops: ["Git", "GitLab", "Docker", "CI/CD", "Cloud Deployment"]
};

export const PROJECTS = [
    {
        id: 1,
        title: "My Portfolio",
        description: "A responsive personal portfolio built as a single-page React landing experience. It highlights my skills, services, work experience, projects, and contact links with GitHub Pages deployment.",
        tech: ["React", "Vite", "Tailwind CSS", "GitHub Pages"],
        imageGradient: "from-amber-500 to-orange-600",
        liveUrl: fromEnv("PORTFOLIO_URL", "https://yourusername.github.io/my-portfolio/"),
        githubUrl: fromEnv("PORTFOLIO_REPO_URL", "https://github.com/yourusername/my-portfolio")
    },
    {
        id: 2,
        title: "api-core-backend",
        description: "An npm package for reusable backend API foundations, created to speed up consistent server-side project setup and reduce repeated boilerplate across backend services.",
        tech: ["Node.js", "Backend", "API", "npm"],
        imageGradient: "from-red-600 to-rose-700",
        liveUrl: fromEnv("API_CORE_BACKEND_NPM_URL", "https://www.npmjs.com/package/api-core-backend"),
        githubUrl: fromEnv("API_CORE_BACKEND_REPO_URL", "https://github.com/yourusername/api-core-backend")
    },
    {
        id: 3,
        title: "init-backend-project",
        description: "A backend starter utility published on npm to initialize new backend projects faster with a cleaner starting structure and practical defaults.",
        tech: ["Node.js", "CLI", "Scaffolding", "npm"],
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
    gitlabUrl: fromEnv("GITLAB_URL", "https://gitlab.com/yourusername"),
    linkedinUrl: fromEnv("LINKEDIN_URL", "https://www.linkedin.com/in/yourusername"),
    npmPackageUrl: fromEnv("NPM_PACKAGE_URL", "https://www.npmjs.com/~yourusername"),
    telegramUrl: fromEnv("TELEGRAM_URL", "https://t.me/yourusername"),
    telegramUsername: fromEnv("TELEGRAM_USERNAME", "@yourusername"),
    tagline: fromEnv("TAGLINE", "A short professional tagline."),
    brandDescription: fromEnv("BRAND_DESCRIPTION", "A concise professional summary."),
    aboutP1: fromEnv("ABOUT_P1", "First paragraph of your about section."),
    aboutP2: fromEnv("ABOUT_P2", "Second paragraph of your about section."),
    expertise: ["Web Apps", "UI/UX Design", "Performance", "Cloud Architecture", "Mobile First", "Scalable APIs"],
    stats: [
        { label: "Years Exp.", value: "2+" },
        { label: "Projects", value: "4" }
    ]
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
        title: "API Design & Development",
        description: "Architecting robust RESTful and GraphQL APIs with a focus on high availability, security, and seamless integration for modern frontend applications.",
        icon: "code"
    },
    {
        title: "Database Architecture",
        description: "Designing scalable database schemas and optimizing complex queries using PostgreSQL, MySQL, and Redis to ensure lightning-fast data retrieval.",
        icon: "server"
    },
    {
        title: "System Infrastructure",
        description: "Building resilient server-side architectures, implementing Docker containerization, and setting up automated CI/CD pipelines for reliable deployments.",
        icon: "window"
    }
];

export const EXPERIENCE = [
    {
        company: "Ecoinsoft Solutions Co., Ltd",
        role: "Backend Engineer",
        startDate: "2025-04-01",
        endDate: null, // "Present"
        description: "Architecting a comprehensive School Management System using the Grails framework. Engineered core APIs for dashboards, user management, classroom coordination, surveys, and assignment modules."
    },
    {
        company: "Ecoinsoft Solutions Co., Ltd",
        role: "Backend Developer Intern",
        startDate: "2024-12-01",
        endDate: "2025-04-01",
        description: "Mastered Java and Object-Oriented Programming (OOP) principles. Focused on implementing clean architecture through design patterns and architecting high-performance CRUD APIs."
    },
    {
        company: "Soul Advisor",
        role: "Frontend Developer Intern",
        startDate: "2024-02-01",
        endDate: "2024-05-01",
        description: "Collaborated on building responsive web interfaces using React.js and Bootstrap. Focused on component lifecycle management and ensuring a seamless cross-platform user experience."
    }
];
