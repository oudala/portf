interface CommandInfo {
  name: string
  description: string
  usage?: string
}

// Update the commands array to include CV-specific commands
const commands: CommandInfo[] = [
  {
    name: "help",
    description: "Display available commands",
  },
  {
    name: "about",
    description: "Display information about me",
  },
  {
    name: "skills",
    description: "List my technical skills",
  },
  {
    name: "projects",
    description: "List my projects",
    usage: "projects [project-name]",
  },
  {
    name: "contact",
    description: "Display my contact information",
  },
  {
    name: "clear",
    description: "Clear the terminal",
  },
  {
    name: "echo",
    description: "Display a message",
    usage: "echo <message>",
  },
  {
    name: "date",
    description: "Display the current date and time",
  },
  {
    name: "cv",
    description: "Navigate CV sections",
    usage: "cv [section]",
  },
  {
    name: "experience",
    description: "Display work experience",
  },
  {
    name: "education",
    description: "Display education history",
  },
  {
    name: "certifications",
    description: "Display certifications",
  },
  {
    name: "ls",
    description: "List available CV sections",
  },
  {
    name: "cat",
    description: "Display content of a CV section",
    usage: "cat <section-name>",
  },
]

function formatHelp(): string {
  return `
Available Commands:
===================
${commands
  .map((cmd) => {
    const usage = cmd.usage ? ` - Usage: ${cmd.usage}` : ""
    return `${cmd.name}${usage} - ${cmd.description}`
  })
  .join("\n")}
`
}

function getProjectDetails(projectName: string): string {
  const projects: Record<string, string> = {
    "e-commerce": `
E-commerce Platform
===================
A fully functional e-commerce platform built with React, Next.js, and Stripe for payments.
Features include product listings, shopping cart, user authentication, and order management.
    `,
    "ai-content": `
AI Content Generator
====================
A content generation tool powered by OpenAI's GPT-3.
Generates articles, blog posts, and marketing copy based on user input.
    `,
    "3d-product": `
3D Product Configurator
=======================
An interactive 3D product configurator built with Three.js.
Allows users to customize products in real-time and visualize them from different angles.
    `,
    "blockchain-explorer": `
Blockchain Explorer
===================
A real-time blockchain explorer for tracking transactions and blocks.
Built with Node.js, Express, and a blockchain API.
    `,
    "real-time-chat": `
Real-time Chat Application
=========================
A real-time chat application built with Socket.IO and React.
Features include private messaging, group chats, and user presence indicators.
    `,
    "mobile-fitness": `
Mobile Fitness App
==================
A mobile fitness app built with React Native.
Features include workout tracking, goal setting, and social sharing.
    `,
  }

  return projects[projectName] || `Project "${projectName}" not found. Type 'projects' to see available projects.`
}

// Update the executeCommand function to handle CV-specific commands
export function executeCommand(input: string): string {
  const args = input.trim().split(" ")
  const command = args[0].toLowerCase()

  switch (command) {
    case "help":
      return formatHelp()

    case "about":
      return `
Ilyass Oulad Dahman
===================
Software Developer & Creative Technologist

I'm a passionate developer with expertise in building modern web applications.
I specialize in creating interactive and user-friendly interfaces using
cutting-edge technologies like React, Next.js, and Three.js.

My journey in software development began during my university years,
where I discovered my passion for creating digital experiences.
      `

    case "skills":
      return `
Technical Skills
===============
Frontend:
- React / Next.js
- TypeScript
- HTML / CSS / Tailwind
- Three.js / WebGL

Backend:
- Node.js / Express
- Python / Django
- SQL / NoSQL Databases
- GraphQL

Other:
- Git, Docker, CI/CD
- AWS, Firebase
- Jest, Cypress
- Figma, Agile, Scrum
      `

    case "projects":
      if (args.length > 1) {
        const projectName = args[1].toLowerCase()
        return getProjectDetails(projectName)
      }
      return `
Projects
========
1. E-commerce Platform
2. AI Content Generator
3. 3D Product Configurator
4. Blockchain Explorer
5. Real-time Chat Application
6. Mobile Fitness App

For details on a specific project, type: projects <project-name>
Example: projects e-commerce
      `

    case "contact":
      return `
Contact Information
==================
Email: ilyass@example.com
LinkedIn: linkedin.com/in/ilyass
GitHub: github.com/ilyass
Twitter: twitter.com/ilyass
      `

    case "clear":
      // This is handled in the terminal component
      return "Clearing terminal..."

    case "echo":
      return args.slice(1).join(" ") || ""

    case "date":
      return new Date().toString()

    case "cv":
      if (args.length > 1) {
        const section = args[1].toLowerCase()
        return getCvSection(section)
      }
      return `
Curriculum Vitae
===============
Use 'cv <section>' to view a specific section:
- summary
- experience
- education
- skills
- certifications

Or use 'ls' to list all available sections.
      `

    case "experience":
      return getCvSection("experience")

    case "education":
      return getCvSection("education")

    case "certifications":
      return getCvSection("certifications")

    case "ls":
      return `
Available CV Sections:
=====================
summary
experience
education
skills
certifications
projects
contact

Use 'cat <section-name>' to view content.
Example: cat experience
      `

    case "cat":
      if (args.length > 1) {
        const section = args[1].toLowerCase()
        return getCvSection(section)
      }
      return "Usage: cat <section-name>"

    default:
      return `Command not found: ${command}. Type 'help' to see available commands.`
  }
}

// Add a new function to handle CV sections
function getCvSection(section: string): string {
  const cvSections: Record<string, string> = {
    summary: `
Professional Summary
===================
Experienced software developer with over 5 years of expertise in building modern web applications.
Specialized in frontend development with React and Next.js, with a strong foundation in backend
technologies. Passionate about creating intuitive user experiences and solving complex problems
through clean, efficient code.
    `,

    experience: `
Work Experience
==============

Senior Frontend Developer | Tech Innovations Inc. | 2021 - Present
----------------------------------------------------------------
• Led the development of multiple web applications using React, Next.js, and TypeScript
• Implemented CI/CD pipelines and improved deployment processes
• Mentored junior developers and conducted code reviews
• Collaborated with UX/UI designers to implement responsive designs
• Reduced application load time by 40% through performance optimizations

Frontend Developer | Digital Solutions Ltd. | 2018 - 2021
-------------------------------------------------------
• Developed responsive web applications with modern frontend practices
• Collaborated with designers and backend developers
• Implemented state management solutions using Redux and Context API
• Created reusable component libraries and documentation
• Participated in agile development processes

Web Developer Intern | StartUp Hub | 2017 - 2018
----------------------------------------------
• Assisted in the development of web applications
• Learned modern web development practices
• Gained experience with React and Node.js
• Contributed to UI improvements and bug fixes
    `,

    education: `
Education
=========

Master of Computer Science | University of Technology | 2016 - 2018
-----------------------------------------------------------------
• Specialized in Web Technologies and Software Engineering
• Graduated with honors (GPA: 3.8/4.0)
• Thesis: "Optimizing React Applications for Performance"
• Relevant coursework: Advanced Algorithms, Web Architecture, Cloud Computing

Bachelor of Computer Science | State University | 2012 - 2016
-----------------------------------------------------------
• Focused on Software Development and Database Systems
• GPA: 3.7/4.0
• Participated in multiple hackathons and coding competitions
• Relevant coursework: Data Structures, Object-Oriented Programming, Database Design
    `,

    skills: `
Technical Skills
===============

Frontend Development:
• React / Next.js (95%)
• TypeScript (90%)
• HTML / CSS / Tailwind (95%)
• Three.js / WebGL (85%)

Backend Development:
• Node.js / Express (85%)
• Python / Django (75%)
• SQL / NoSQL Databases (80%)
• GraphQL (70%)

Other Skills:
• Git, Docker, CI/CD
• AWS, Firebase
• Jest, Cypress
• Figma, Agile, Scrum
    `,

    certifications: `
Certifications
=============

AWS Certified Developer | Amazon Web Services | 2022
-------------------------------------------------
Credential ID: AWS-DEV-12345

Professional Frontend Developer | Meta | 2021
------------------------------------------
Credential ID: MFD-67890

Google Cloud Professional | Google | 2020
--------------------------------------
Credential ID: GCP-54321
    `,

    projects: `
Projects
========
1. E-commerce Platform
2. AI Content Generator
3. 3D Product Configurator
4. Blockchain Explorer
5. Real-time Chat Application
6. Mobile Fitness App

For details on a specific project, type: projects <project-name>
Example: projects e-commerce
    `,

    contact: `
Contact Information
==================
Email: ilyass@example.com
LinkedIn: linkedin.com/in/ilyass
GitHub: github.com/ilyass
Twitter: twitter.com/ilyass
    `,
  }

  return cvSections[section] || `Section "${section}" not found. Type 'ls' to see available sections.`
}
