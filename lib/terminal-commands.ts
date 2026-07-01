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
    "crescendo-baby-music-management-platform": `
Crescendo Baby Music Management Platform
========================================
Production-ready full-stack platform for children's music classes, bookings, subscriptions, attendance, payments, waitlists, scheduling, and admin operations.
Implemented secure authentication, QR attendance tracking, WhatsApp notifications, analytics dashboards, and automation workflows.
Live: booking.crescendobabymusic.com
Tech: Next.js, React, TypeScript, Prisma, PostgreSQL, Supabase, Tailwind CSS, Twilio WhatsApp API, Cloudinary, Jest, Playwright, Vercel.
    `,
    "aws-cost-monitoring": `
AWS Cost Monitoring System
==========================
Intelligent cloud cost surveillance system with anomaly detection and automated Slack alerts.
Built serverless monitoring workflows for cost reports, scheduling, anomaly checks, and alerting.
Tech: AWS Lambda, S3, EventBridge, Python, Next.js, TypeScript, Tailwind CSS, Gemini AI.
    `,
    "private-cloud-with-apache-cloudstack": `
Private Cloud with Apache CloudStack
====================================
Deployed a private cloud with zones, pods, clusters, storage, virtual networking, and VM provisioning.
Added infrastructure automation and monitoring with Terraform, Bash, Prometheus, and Grafana.
Tech: CloudStack, KVM, Linux, Networking, Prometheus, Grafana, Terraform, Bash.
    `,
    "multimodal-store-management-system": `
Multimodal Store Management System
==================================
Created a Flask-based store management system featuring advanced search capabilities through image recognition and voice commands.
Implemented computer vision algorithms to identify products from images, allowing for inventory management through photo uploads.
Integrated speech-to-text functionality enabling voice command operations for hands-free inventory control.
Designed a responsive web interface with real-time inventory updates and multimodal search options.
Tech: Flask, Python, TensorFlow, JavaScript.
    `,
    "feature-rich-invoices-management-system": `
Feature-Rich Invoices Management System
=========================================
Developed a comprehensive invoices management system using Laravel framework with intuitive interface and robust functionality.
Implemented secure authentication with Laravel Breeze and advanced role-based access control using Laravel Spatie Permission.
Built automated notification system using Laravel Mailer and integrated real-time data visualization with Laravel Charts.
Created polished video presentation showcasing functionality and features for client demonstrations.
Tech: Laravel, Spatie, Breeze, Laravel UI, Laravel Charts, Laravel Mailer, Notifications.
    `,
    "myorm-lightweight-java-orm-library": `
MyORM - Lightweight Java ORM Library
====================================
Built a custom Java ORM to understand annotation-based object-relational mapping.
Used reflection for dynamic mapping, with built-in CRUD and ACID transaction support.
Integrated Caffeine caching and multi-database support (MySQL, PostgreSQL, SQLite).
Packaged as a Maven-compatible library and published on GitHub.
Technologies used: Java, Reflection, JDBC, Annotations, Caffeine, Maven.
    `,
    "high-performance-persistent-hashmap": `
High-Performance Persistent HashMap
===================================
Built a custom MemoryHashMap with optimized serialization and deserialization to overcome limitations of standard Java's HashMap for persistent data storage.
Used VisualVM for performance profiling to identify and eliminate bottlenecks, improving save times by 28x (146.819ms -> 5.162ms) and load times by 1.8x (110.372ms -> 60.680ms).
Reduced memory consumption by 39% (492MB -> 299MB heap usage) while maintaining full data integrity.
Implemented comprehensive edge case testing and verification using JUnit to ensure reliability across various usage scenarios.
Tech: Java, JUnit, VisualVM, Custom Serialization, Profiling, Memory Optimization.
    `,
    "custom-threadpool-executor": `
Custom ThreadPool Executor
==========================
Implemented a custom Java thread pool executor with blocking queues and adjustable execution policies.
Focused on concurrency performance, workload management, and controlled task execution behavior.
Tech: Java, Concurrency, Multithreading, Blocking Queue, Performance.
    `,
    "mamafood-traditional-food-delivery-platform": `
MamaFood Traditional Food Delivery Platform
==========================================
Co-founded a social-impact food delivery platform connecting traditional food providers with customers.
Built workflows for provider onboarding, operational tracking, logistics, and dashboards.
Tech: Flask, Docker, Plotly, PostgreSQL.
    `,
    "nlp-annotation-platform": `
NLP Annotation Platform
=========================
Developed a collaborative text annotation web platform for NLP classification tasks using Spring Boot and React with OAuth2 authentication.
Implemented role-based access control allowing administrators to manage datasets, assign annotators, and monitor annotation progress.
Built an intelligent system to detect annotation quality metrics and identify potential spammers among annotators.
Integrated Python ML pipeline execution directly from the admin interface to train and test NLP models on annotated data.
Tech: Spring Boot, React, MySQL, Spring Security, OAuth2, Thymeleaf, Python NLP libraries.
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
Programming Languages:
- Python, Java, C++, JavaScript, TypeScript, SQL, PL/SQL

Cloud & DevOps:
- AWS, Azure, OCI, Docker, Kubernetes, Terraform, CI/CD, GitHub Actions, Jenkins

Frontend:
- Next.js, React, TypeScript, Tailwind CSS, Radix UI

Backend:
- Spring Boot, Flask, REST APIs, Microservices

Databases:
- MySQL, PostgreSQL, MongoDB, Redis

Testing & Monitoring:
- Pytest, Selenium, SonarQube, Prometheus, Grafana, Oracle APM
      `

    case "projects":
      if (args.length > 1) {
        const projectName = args[1].toLowerCase()
        return getProjectDetails(projectName)
      }
      return `
Projects
========
1. Crescendo Baby Music Management Platform
2. AWS Cost Monitoring System
3. Private Cloud with Apache CloudStack
4. NLP Annotation Platform
5. High-Performance Persistent HashMap
6. MyORM - Lightweight Java ORM Library
7. Custom ThreadPool Executor
8. Multimodal Store Management System
9. MamaFood Traditional Food Delivery Platform

For details on a specific project, type: projects <project-name>
Example: projects aws-cost-monitoring
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
Oulad dahman ilyass
===================
Software Engineer

Software engineer and research assistant at Oracle, focused on observability, backend systems, cloud platforms, and production-ready web applications. Experienced across Java, Python, Next.js, microservices, automation, and cloud infrastructure.
    `,

    experience: `
Experience
==========
Oracle - APM Session Diagnostics Engineering Intern (PFE Internship) | 2026 - Present
Contributed to Oracle APM session diagnostics, observability, user session analytics, troubleshooting workflows, platform diagnostics, backend improvements, ticket resolution, visualization systems, and enterprise monitoring support.
Technologies: Java, Python, Oracle Cloud, REST APIs, Git, CI/CD, Jira, Slack, Oracle APM, Telemetry, Unit testing, Confluence, DevOps Portal

Backend & Cloud Engineering Intern | Univade LCNC Platform | Feb 2025 - Jun 2025
Worked on a Low-Code/No-Code platform integrating backend services, automation pipelines, cloud deployments, microservices, CI/CD workflows, and infrastructure automation across AWS and Azure.
Technologies: Java, Python, Spring Boot, Docker, AWS, Azure, Terraform, GitHub Actions, Airflow
    `,

    education: `
Education
=========
State Engineering Diploma in Software Engineering | National School of Applied Science | 2023 - Jun 2026 | Al Hoceima
Preparatory Classes to Engineering Degree | National School of Applied Science | 2021 - 2023 | Al Hoceima
    `,

    skills: `
Skills & Technologies
=====================
Programming Languages: Python, Java, C++, JavaScript, TypeScript, SQL, PL/SQL
Cloud & DevOps: AWS, Azure, OCI, Docker, Kubernetes, Terraform, CI/CD, GitHub Actions, Jenkins
Frontend: Next.js, React, TypeScript, Tailwind CSS, Radix UI
Backend: Spring Boot, Flask, REST APIs, Microservices
Databases: MySQL, PostgreSQL, MongoDB, Redis
Testing & Monitoring: Pytest, Selenium, SonarQube, Prometheus, Grafana, Oracle APM
Tools: Git, Slack, Jira, Bitbucket, Linux, VS Code, IntelliJ, Maven
Specialization: System Design, Distributed Systems, Performance Optimization, Observability
    `,

    certifications: `
Certifications
==============
Java SE 17 Developer (OCP 17)
Java SE 11 Developer (OCP 11)
Oracle Cloud Infrastructure 2024 Foundations Associate
    `,

    projects: `
Projects
========
1. Crescendo Baby Music Management Platform
2. AWS Cost Monitoring System
3. NLP Annotation Platform
4. Persistent, Memory-Efficient Java HashMap
5. MyORM - Lightweight Java ORM Library
6. Multimodal Store Management System
7. Feature-Rich Invoices Management System

For details on a specific project, type: projects <project-name>
Example: projects multimodal-store-management-system
    `,

    contact: `
Contact Information
==================
Casablanca, Morocco
Email: ilyassouladdahman@gmail.com
Phone: 0626-414569
LinkedIn: linkedin.com/in/ilyassod
GitHub: github.com/oudala
    `,
  }

  return cvSections[section] || `Section "${section}" not found. Type 'ls' to see available sections.`
}
