import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, SERVICES } from '../constants';

export const getBotResponse = (query) => {
    const q = query.toLowerCase();
    
    // Safety check in case PERSONAL_INFO variables are not parsed yet
    const fullName = PERSONAL_INFO?.name || "The Developer";
    const firstName = fullName !== "The Developer" ? fullName.split(' ') : "He";
    const role = PERSONAL_INFO?.role || "professional";

    const responses = [
        {
            keywords: ['skill', 'tech', 'toolkit', 'language', 'framework', 'database', 'expert', 'background', 'stack', 'tool', 'code', 'technologies', 'proficient'],
            response: `${firstName}'s technical toolkit is quite robust! He mainly works with languages like ${SKILLS.languages.join(', ')} and frameworks such as ${SKILLS.frameworks.join(', ')}. From a data side, he's experienced with ${SKILLS.databases.join(', ')}, and for DevOps he utilizes ${SKILLS.devops.join(', ')}.`
        },
        {
            keywords: ['project', 'work', 'build', 'create', 'portfolio', 'recent', 'app', 'development', 'software', 'built'],
            response: `${firstName} has developed several impressive projects! Some notable ones include: ${PROJECTS.map(p => p.title).join(', ')}. You can check out the 'Projects' section of the site to see them in detail, including the technologies used for each.`
        },
        {
            keywords: ['experience', 'job', 'company', 'history', 'career', 'intern', 'past', 'worked at'],
            response: `${firstName} has diverse professional experience. He is currently a ${EXPERIENCE[0]?.role} at ${EXPERIENCE[0]?.company}. Previously, his roles included a Backend Developer Intern and a Frontend Developer Intern. You can read the specific details of his achievements in the 'Experience' section!`
        },
        {
            keywords: ['service', 'offer', 'do for me', 'help with', 'provide', 'freelance', 'what can you do', 'specialty'],
            response: `${firstName} offers high-quality technical services, including: ${SERVICES.map(s => s.title).join(', ')}. He specializes in creating robust backend infrastructures, APIs, and modern system architectures.`
        },
        {
            keywords: ['contact', 'email', 'telegram', 'gmail', 'reach', 'social', 'linkedin', 'github', 'gitlab', 'find', 'message', 'talk'],
            response: `You can reach ${firstName} directly via email at ${PERSONAL_INFO.email}. For quick messaging, his Telegram username is ${PERSONAL_INFO.telegramUsername}. You can also connect with him professionally on LinkedIn or check out his GitLab repositories.`
        },
        {
            keywords: ['location', 'where', 'live', 'born', 'city', 'country', 'based', 'from'],
            response: `${firstName} is currently based in ${PERSONAL_INFO.location}. He's passionate about building scalable solutions and actively contributing to the tech ecosystem there!`
        },
        {
            keywords: ['who', 'about', 'name', 'identity', 'role', 'what do you do', 'who is'],
            response: `I'm the digital assistant representing ${fullName}. He is a dedicated ${role} with strong experience building secure, high-performance, and scalable server-side tech.`
        },
        {
            keywords: ['available', 'opportunity', 'hire', 'contract', 'open to work', 'recruiting', 'join'],
            response: `Yes! ${firstName} is open to discussing new opportunities, collaborations, or addressing difficult technical challenges. Feel free to use the contact section or email him to start a discussion!`
        },
        {
            keywords: ['hi', 'hello', 'hey', 'greetings', 'yo', 'sup', 'howdy', 'morning', 'afternoon', 'evening'],
            response: `Hello there! 👋 I'm your digital guide. I can tell you all about ${firstName}'s skills, his professional experience, his latest projects, or exactly how to get in touch with him. What would you like to know?`
        },
        {
            keywords: ['thanks', 'thank', 'cool', 'nice', 'awesome', 'great', 'ok', 'good', 'sweet', 'amazing'],
            response: "You're very welcome! Let me know if you want to dive deeper into his tech stack or explore some of his recent work. I'm here to help."
        },
        {
            keywords: ['resume', 'cv', 'download', 'document', 'pdf', 'hire me'],
            response: `You can download ${firstName}'s full CV from the topmost section (Hero section) of this website. It contains a comprehensive overview of his professional background and skillsets.`
        }
    ];

    // Score each response based on keyword matches, giving weight to longer matches
    const scoredResponses = responses.map(r => {
        let score = 0;
        r.keywords.forEach(k => {
            if (q.includes(k)) {
                score += k.length; // A longer, more specific keyword matching is stronger
            }
        });
        return { ...r, score };
    });

    // Filter out those with 0 score, then sort from highest to lowest score
    const bestMatches = scoredResponses
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score);
    
    if (bestMatches.length > 0) {
        return bestMatches[0].response;
    }

    return `I'm not exactly sure I caught that. I can provide details on ${firstName}'s technical skills, his past work experience, or his major projects. You can also try clicking one of the suggested prompts below!`;
};
