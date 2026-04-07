import { PERSONAL_INFO, SKILLS, PROJECTS } from '../constants';

export const getBotResponse = (query) => {
    const q = query.toLowerCase();
    const fullName = PERSONAL_INFO.name;

    const responses = [
        {
            keywords: ['skill', 'tech', 'toolkit', 'language', 'framework', 'database', 'know', 'expert', 'background', 'stack'],
            response: `${fullName} specializes in Backend Engineering with a focus on scalable systems. His tech stack includes Languages (${SKILLS.languages.join(', ')}), Frameworks like ${SKILLS.frameworks.join(', ')}, and Databases such as ${SKILLS.databases.join(', ')}. He's also proficient in DevOps (${SKILLS.devops.join(', ')}).`
        },
        {
            keywords: ['project', 'work', 'experience', 'build', 'create', 'portfolio', 'recent'],
            response: `${fullName} has worked on several high-impact projects. Currently, he's at Ecoinsoft architecting a School Management System. Other projects include: ${PROJECTS.map(p => p.title).join(', ')}. You can find more details in the Projects section!`
        },
        {
            keywords: ['contact', 'email', 'telegram', 'hire', 'phone', 'reach', 'social', 'linkedin', 'github', 'gitlab', 'find'],
            response: `You can reach ${fullName} directly via email at ${PERSONAL_INFO.email} or call ${PERSONAL_INFO.phone}. For quick messages, his Telegram is ${PERSONAL_INFO.telegramUsername}. You can also find him on LinkedIn and GitLab.`
        },
        {
            keywords: ['location', 'where', 'live', 'born', 'city', 'country'],
            response: `${fullName} is currently based in ${PERSONAL_INFO.location}. He's passionate about contributing to the tech ecosystem in Cambodia!`
        },
        {
            keywords: ['who', 'about', 'name', 'identity'],
            response: `I'm the digital assistant for ${fullName}. He is a dedicated Backend Engineer with over 2 years of experience building robust and scalable server-side architectures.`
        },
        {
            keywords: ['available', 'opportunity', 'job', 'hire', 'contract', 'freelance'],
            response: `Yes! ${fullName} is always open to discussing new opportunities, collaborations, or technical challenges. Feel free to reach out via his contact details!`
        },
        {
            keywords: ['hi', 'hello', 'hey', 'greetings', 'yo', 'sup'],
            response: `Hi there! 👋 I'm ready to help. You can ask me about ${fullName}'s skills, his recent projects, or how to get in touch with him.`
        },
        {
            keywords: ['thanks', 'thank', 'cool', 'nice', 'awesome', 'great'],
            response: "You're very welcome! Is there anything else you'd like to know about his work or expertise?"
        }
    ];

    // Find the best match by checking how many keywords are present
    const bestMatch = responses
        .map(r => ({ ...r, matches: r.keywords.filter(k => q.includes(k)).length }))
        .filter(r => r.matches > 0)
        .sort((a, b) => b.matches - a.matches)[0];
    
    return bestMatch 
        ? bestMatch.response 
        : `I'm not quite sure I understand that. Could you try asking about ${fullName}'s skills, projects, or contact information? Or simply click one of the suggested questions!`;
};
