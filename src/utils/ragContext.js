import {
    PERSONAL_INFO,
    SKILLS,
    PROJECTS,
    EXPERIENCE,
    SERVICES,
} from "../constants";

const formatPeriod = (startDate, endDate) => {
    const startYear = startDate ? new Date(startDate).getFullYear() : "";
    if (!endDate) return startYear ? `${startYear}-Present` : "Present";
    const endYear = new Date(endDate).getFullYear();
    return startYear === endYear ? String(startYear) : `${startYear}-${endYear}`;
};

export const getRagContext = () => {
    const {
        name,
        role,
        location,
        email,
        tagline,
        brandDescription,
        aboutP1,
        aboutP2,
        expertise,
        stats,
        githubUrl,
        linkedinUrl,
        npmPackageUrl,
        telegramUsername,
        telegramUrl,
    } = PERSONAL_INFO;

    const statsLine = stats
        .map((s) => `${s.label}: ${s.value}`)
        .join(" | ");

    const skillsBlock = [
        `- Languages: ${SKILLS.languages.join(", ")}`,
        `- Frameworks: ${SKILLS.frameworks.join(", ")}`,
        `- Databases: ${SKILLS.databases.join(", ")}`,
        `- DevOps: ${SKILLS.devops.join(", ")}`,
    ].join("\n");

    const projectsBlock = PROJECTS.map((project, index) => {
        const links = [
            project.liveUrl && `Live/npm: ${project.liveUrl}`,
            project.githubUrl && `GitHub: ${project.githubUrl}`,
        ]
            .filter(Boolean)
            .join(" | ");

        return [
            `${index + 1}. ${project.title} (${project.type})`,
            `   ${project.description}`,
            `   Tech: ${project.tech.join(", ")}`,
            links ? `   ${links}` : null,
        ]
            .filter(Boolean)
            .join("\n");
    }).join("\n");

    // Keep experience short so every chat turn stays fast (long prompts = slower TTFT)
    const experienceBlock = EXPERIENCE.map((exp, index) => {
        const period = formatPeriod(exp.startDate, exp.endDate);
        const bullets = exp.description
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .slice(0, 2)
            .map((line) => `   - ${line}`)
            .join("\n");

        return [
            `${index + 1}. ${exp.role} at ${exp.company} (${period})`,
            bullets,
        ]
            .filter(Boolean)
            .join("\n");
    }).join("\n\n");

    const servicesBlock = SERVICES.map(
        (service) => `- ${service.title}`
    ).join("\n");

    return `
Name: ${name}
Role: ${role}
Location: ${location}
Email: ${email}
Tagline: ${tagline}
About: ${brandDescription}
${aboutP1 ? `Bio: ${aboutP1}` : ""}
${aboutP2 ? `Bio (continued): ${aboutP2}` : ""}
${expertise?.length ? `Expertise: ${expertise.join(", ")}` : ""}
${statsLine ? `Stats: ${statsLine}` : ""}

Skills:
${skillsBlock}

Projects:
${projectsBlock}

Experience:
${experienceBlock}

Services:
${servicesBlock}

Contact:
- Email: ${email}
- Telegram: ${telegramUsername} (${telegramUrl})
- GitHub: ${githubUrl}
- LinkedIn: ${linkedinUrl}
- npm: ${npmPackageUrl}
`.replace(/\n{3,}/g, "\n\n").trim();
};
