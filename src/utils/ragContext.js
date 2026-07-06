import { PERSONAL_INFO } from "../constants";

export const getRagContext = () => {
    const {
        name,
        role,
        location,
        email,
        tagline,
        brandDescription,
    } = PERSONAL_INFO;

    return `
Name: ${name}
Role: ${role}
Location: ${location}
Email: ${email}
Tagline: ${tagline}
About: ${brandDescription}

Skills:
- Languages: HTML, CSS, JavaScript, Java, Groovy, Python
- Frameworks: Node.js, Express, NestJS, Spring Boot, React JS, Tailwind CSS, Grails
- Databases: MySQL, PostgreSQL, Redis
- DevOps: Git, GitHub, Docker, CI/CD, Cloud Deployment

Projects:
1. My Portfolio - A responsive personal portfolio built with React, Vite, Tailwind CSS, deployed on GitHub Pages.
2. khmer-chhankitek-calendar - An npm package for Khmer Chhankitek calendar utilities.
3. init-backend-project - A backend starter utility published on npm for Node.js projects.

Experience:
1. Backend Developer at Ecoinsoft Solutions Co., Ltd (2025-Present)
   - Developed and maintained backend features for School Management System (SMS) and Examination Management System (EMS) projects
   - Designed, developed, and maintained RESTful APIs, implementing CRUD operations and business logic based on project requirements
   - Designed ER diagrams and database schemas, worked with MySQL and Redis, and optimized application performance
   - Maintained and refactored existing code, fixed bugs, tested API endpoints, and wrote technical documentation to ensure software quality
   - Built and deployed backend services across test, staging, and production environments while supporting system maintenance and enhancements
   - Collaborated with the development team, researched new technologies, and assisted in training new team members

2. Backend Developer Intern at Ecoinsoft Solutions Co., Ltd (2024-2025)
   - Learned and applied Java and Object-Oriented Programming (OOP) principles in backend development
   - Developed and maintained RESTful APIs using the Grails framework
   - Implemented CRUD operations and business logic based on project requirements
   - Followed clean coding practices and contributed to building reliable and maintainable backend applications

3. Frontend Developer Intern at Soul Advisor (2024)
   - Built responsive web pages using React.js and Bootstrap
   - Fixed UI issues and improved page layouts
   - Participated in Agile meetings and collaborated with team
   - Assisted in developing new frontend features
   - Tested frontend features across different browsers and devices

Services:
- API Design & Development
- Database Architecture
- System Infrastructure

Contact:
- Email: chochkimhour2303@gmail.com
- GitHub: https://github.com/chochkimhour
- LinkedIn: https://linkedin.com/in/choch-kimhour
- npm: https://www.npmjs.com/~chochkimhour
`.trim();
};
