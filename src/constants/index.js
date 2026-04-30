const env = import.meta.env;
const fromEnv = (key, fallback) => env[key] || fallback;

export const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
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
        title: "AI Telegram Bot Assistant",
        description: "An intelligent Telegram bot integrated with multiple AI models via OpenRouter. Features a resilient webhook architecture and persistent MySQL storage for individual user sessions and request history.",
        tech: ["Python", "MySQL", "OpenRouter API", "Webhooks"],
        imageGradient: "from-blue-600 to-indigo-700",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 2,
        title: "Professional Portfolio",
        description: "A high-performance personal branding platform for Backend Engineers. Built with a focus on clean architecture, optimized animations, and dynamic SEO-friendly content delivery.",
        tech: ["React JS", "Tailwind CSS", "Vite JS", "Framer Motion"],
        imageGradient: "from-amber-500 to-orange-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 3,
        title: "Upcoming Project...",
        description: "Currently architecting a specialized backend solution. Focusing on scalability, high-availability data systems, and complex business logic implementation. Stay tuned!",
        tech: [],
        imageGradient: "from-gray-700 to-slate-900",
        liveUrl: "#",
        githubUrl: "#"
    }
];

export const PERSONAL_INFO = {
    name: fromEnv("USER_NAME", "Choch Kimhour"),
    role: fromEnv("USER_ROLE", "Backend Engineer"),
    roles: ["Backend Engineer"],
    email: fromEnv("USER_EMAIL", "your_email@example.com"),
    phone: fromEnv("USER_PHONE", "+855 ..."),
    location: fromEnv("USER_LOCATION", "Phnom Penh, Cambodia"),
    gitlabUrl: fromEnv("GITLAB_URL", "https://gitlab.com/yourusername"),
    linkedinUrl: fromEnv("LINKEDIN_URL", "https://www.linkedin.com/in/yourusername"),
    telegramUrl: fromEnv("TELEGRAM_URL", "https://t.me/yourusername"),
    telegramUsername: fromEnv("TELEGRAM_USERNAME", "@yourusername"),
    tagline: fromEnv("TAGLINE", "Backend engineer building clean, reliable systems."),
    brandDescription: fromEnv("BRAND_DESCRIPTION", "I build maintainable backend services, APIs, and full-stack portfolio experiences with a focus on reliability and performance."),
    aboutP1: fromEnv("ABOUT_P1", "I am a backend engineer based in Phnom Penh, Cambodia, focused on building practical systems that are reliable, readable, and easy to evolve."),
    aboutP2: fromEnv("ABOUT_P2", "My work spans API design, database architecture, server-side development, and frontend collaboration for complete product experiences."),
    expertise: ["Web Apps", "UI/UX Design", "Performance", "Cloud Architecture", "Mobile First", "Scalable APIs"],
    stats: [
        { label: "Years Exp.", value: "2+" },
        { label: "Projects", value: "4" }
    ]
};

export const UI_TEXT = {
    hero: {
        cv_button: "Download My CV"
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
        view_more: "View My Projects"
    },
    contact: {
        title: "Get In",
        highlight: "Touch",
        description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
        telegram: "Telegram",
        email: "Direct Email",
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
