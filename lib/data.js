import { FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiElectron, SiExpress, SiMongodb, SiMysql, SiNextdotjs, SiPostman, SiTailwindcss } from "react-icons/si";

export const NAV = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];
export const FOOTER_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

/** Brand icons only (no text on the orbit). `label` is used for aria-label/tooltip. */
export const HERO_ORBIT = [
  { label: "React", icon: FaReact, color: "#149eca" }, { label: "Next.js", icon: SiNextdotjs, color: "#111827" },
  { label: "Node.js", icon: FaNodeJs, color: "#5fa04e" }, { label: "Express", icon: SiExpress, color: "#374151" },
  { label: "MongoDB", icon: SiMongodb, color: "#47a248" }, { label: "JavaScript", icon: FaJs, color: "#eab308" },
  { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" }, { label: "Git", icon: FaGitAlt, color: "#f05032" },
];

export const SKILL_ORBIT = [
  { label: "HTML5", icon: FaHtml5, color: "#e34f26" }, { label: "CSS3", icon: FaCss3Alt, color: "#1572b6" },
  { label: "JavaScript", icon: FaJs, color: "#eab308" }, { label: "React", icon: FaReact, color: "#149eca" },
  { label: "Next.js", icon: SiNextdotjs, color: "#111827" }, { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { label: "Node.js", icon: FaNodeJs, color: "#5fa04e" }, { label: "Express", icon: SiExpress, color: "#374151" },
  { label: "MongoDB", icon: SiMongodb, color: "#47a248" }, { label: "MySQL", icon: SiMysql, color: "#00758f" },
  { label: "Electron", icon: SiElectron, color: "#47848f" }, { label: "Git", icon: FaGitAlt, color: "#f05032" },
  { label: "GitHub", icon: FaGithub, color: "#111827" }, { label: "Postman", icon: SiPostman, color: "#ff6c37" },
];

/** icon = key resolved inside Skills.js */
export const SKILL_GROUPS = [
  { title: "Frontend", label: "01 / CLIENT SIDE", icon: "layout",
    desc: "Responsive, accessible interfaces with smooth, intentional interactions.",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", label: "02 / SERVER SIDE", icon: "server",
    desc: "Secure, well-structured APIs and data layers that scale with the product.",
    items: ["Node.js", "Express", "MongoDB", "MySQL", "REST APIs"] },
  { title: "Development Tools", label: "03 / WORKFLOW", icon: "tool",
    desc: "The tooling I rely on to build, test, collaborate and ship with confidence.",
    items: ["Git", "GitHub", "Postman", "Electron", "VS Code"] },
];

/** icon = key resolved inside About.js */
export const INFO = [
  { title: "Education", icon: "book", text: "Final-year student  of Information technology building real products alongside coursework." },
  { title: "Development", icon: "code", text: "Full-stack MERN apps with clean architecture and responsive, accessible interfaces." },
  { title: "Learning & Exploring", icon: "compass", text: "Always exploring new tools, patterns and best practices to ship better software." },
  { title: "Why Work With Me", icon: "award", text: "knowledge of everything from core programming concepts and clean code to JSON, routing, APIs, error handling, and complete frontend-to-backend development." },
];

export const ABOUT_STATS = [["MERN", "Core stack"], ["UI + API", "End to end"], ["AI", "Exploring"]];


export const PROJECTS = [
  {
    name: "AI Career Pilot",
    desc: "A complete full-stack MERN application with AI-powered resume analysis, job discovery, career roadmaps and interview preparation.",
    tags: ["MongoDB", "Express", "React", "Node.js", "AI"],
    link: "https://ai-career-website.netlify.app/",
    image: "/projects/p1.png",
  },
  {
    name: "Job Search Admin Panel",
    desc: "A React-based admin dashboard for managing job-related information.",
    tags: ["React", "JavaScript", "CSS"],
    link: "https://jobsearch-adminpanel.netlify.app/",
    image: "/projects/p2.png",
  },
  {
    name: "React Job Search Website",
    desc: "A responsive frontend job search platform with a clean interface.",
    tags: ["React", "JavaScript", "CSS"],
    link: "https://react-jobsearch-website.netlify.app/",
    image: "/projects/p3.png",
  },
  {
    name: "Personal Portfolio 2026",
    desc: "A personal portfolio built using HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://portfolio-website-2k26.netlify.app/",
    image: "/projects/p4.png",
  },
  {
    name: "To-Do List App",
    desc: "An interactive task management application for organizing daily activities.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://your-to-do-listapp.netlify.app/",
    image: "/projects/p5.png",
  },
  {
    name: "Digital Calculator",
    desc: "A digital calculator for performing basic arithmetic operations.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://digital-calculater.netlify.app/",
    image: "/projects/p6.png",
  },
  {
    name: "Weather Fetching App",
    desc: "A weather application that fetches live weather information using an external API.",
    tags: ["HTML", "CSS", "JavaScript", "API"],
    link: "https://weatherfetching-app.netlify.app/",
    image: "/projects/p7.png",
  },
];



export const JOURNEY = [
  { when: "Start", title: "University", text: "Began a IT degree and discovered web development." },
  { when: "Year 2", title: "Frontend Foundations", text: "Mastered HTML, CSS and JavaScript,React Next.js through  hands-on builds." },
  { when: "Year 3", title: "MERN Learning", text: "Learned MongoDB, Express, React and Node.js end to end." },
  { when: "Internship", title: "ZABTechs", text: "Worked on production features in a professional team." },
  { when: "Final Year", title: "Final Year Project", text: "Designed and built a complete full-stack system. Smart Tractor Showroom managmnet system " },
  { when: "Now", title: "Open to Work", text: "Looking for opportunities to grow and contribute." },
];

/** Replace the placeholders (YOUR_EMAIL, XXXX, YOUR_LINKEDIN_URL) with your real details. */
export const CONTACT = {
  email: "meo24693@gmail.com",
  phone: "03131242702",
  whatsapp: "923131242702",
  github: "https://github.com/Khanali-1",
  linkedin: "https://www.linkedin.com/in/habib-khan-28a75b436/",
  location: "Hyderabad / Karachi, Pakistan",
};
export const SOCIAL = { github: CONTACT.github, linkedin: CONTACT.linkedin, email: CONTACT.email };
