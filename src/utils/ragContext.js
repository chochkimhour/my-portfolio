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
   - Developed backend features for School Management System (SMS) and Examination Management System (EMS)
   - Designed, developed RESTful APIs with CRUD operations
   - Designed ER diagrams and database schemas with MySQL and Redis
   - Maintained and refactored code, fixed bugs, tested API endpoints
   - Built and deployed backend services across test, staging, production environments

2. Backend Developer Intern at Ecoinsoft Solutions Co., Ltd (2024-2025)
   - Mastered Java and OOP principles
   - Developed RESTful APIs using Grails framework
   - Implemented CRUD operations and business logic
   - Followed clean coding practices

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
