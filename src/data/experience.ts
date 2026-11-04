export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  type: 'Full-time' | 'Contract' | 'Freelance';
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Proficient'; years?: string }[];
}

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-evi',
    role: 'Lead Mobile & IoT Software Engineer',
    company: 'EVI Technologies Pvt. Ltd.',
    location: 'New Delhi, India',
    period: '2023 - Present',
    current: true,
    type: 'Full-time',
    summary: 'Directing the architecture and implementation of consumer & enterprise mobile apps for smart EV charging networks, local Bluetooth Low Energy control protocols, and distributed charging station load optimization.',
    achievements: [
      'Architected cross-platform React Native app communicating directly with hardware chargers over Bluetooth Low Energy (BLE), reducing peripheral connection drop rates to under 0.6%.',
      'Engineered an offline-first transaction queue persisting sessions in SQLite and syncing automatically with Django REST backend when network connectivity restores.',
      'Developed dynamic load-balancing microservices in Spring Boot & WebSockets to automatically throttle charging current and prevent electrical substation overloads.',
      'Built multi-threaded Python desktop tools for factory assembly line testing, reducing board QA inspection from 25 min to 4 min.'
    ],
    technologies: ['React Native', 'TypeScript', 'BLE', 'Django REST', 'Spring Boot', 'SQLite', 'Docker', 'WebSockets']
  },
  {
    id: 'exp-veblika',
    role: 'Full-Stack Software Engineer',
    company: 'Veblika Software Solutions',
    location: 'Jaipur, India',
    period: '2022 - 2023',
    type: 'Full-time',
    summary: 'Developed scalable web applications, event-driven workflow automation systems, and backend RESTful microservices for corporate clients.',
    achievements: [
      'Designed a metadata-driven workflow automation engine in Django and Celery, orchestrating 250,000+ daily asynchronous tasks with 99.99% execution reliability.',
      'Implemented distributed Redis task caching and message pub/sub, decreasing API response latency by 45%.',
      'Built interactive frontend dashboards using React and modern CSS, translating Figma mockups into pixel-perfect responsive web interfaces.',
      'Integrated payment gateways, automated invoicing, and third-party webhook notification pipelines.'
    ],
    technologies: ['Python', 'Django', 'React', 'Celery', 'Redis', 'PostgreSQL', 'AWS Lambda', 'Git']
  },
  {
    id: 'exp-freelance',
    role: 'Full-Stack & Mobile App Consultant',
    company: 'Independent Freelance Practice',
    location: 'Global (Remote)',
    period: '2022 - Present',
    type: 'Freelance',
    summary: 'Partnering with early-stage tech founders, hardware startups, and agencies to engineer MVPs, offline-first mobile apps, and custom workflow automations.',
    achievements: [
      'Delivered a HIPAA-compliant medical diagnostic telemetry mobile app with zero packet loss over Bluetooth and encrypted local storage.',
      'Engineered travel management and automated customer reminder systems, increasing booking conversion by 30%.',
      'Provided end-to-end consulting from system architecture design through App Store / Play Store deployment.'
    ],
    technologies: ['React Native', 'Node.js', 'Python', 'BLE', 'SQLite', 'Tailwind CSS', 'Next.js']
  }
];

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: 'Mobile & Frontend',
    skills: [
      { name: 'React Native', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'React.js / Next.js', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Redux Toolkit / Zustand', level: 'Expert' },
      { name: 'Offline-First (SQLite/WatermelonDB)', level: 'Advanced' }
    ]
  },
  {
    title: 'Hardware & IoT Protocols',
    skills: [
      { name: 'Bluetooth Low Energy (BLE)', level: 'Expert' },
      { name: 'Serial UART / USB Communications', level: 'Advanced' },
      { name: 'MQTT & WebSockets', level: 'Advanced' },
      { name: 'Hardware Telemetry Parsing', level: 'Expert' },
      { name: 'Embedded Testing Tools', level: 'Proficient' }
    ]
  },
  {
    title: 'Backend & Cloud',
    skills: [
      { name: 'Python / Django REST Framework', level: 'Expert' },
      { name: 'Java / Spring Boot', level: 'Advanced' },
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'PostgreSQL / MySQL', level: 'Advanced' },
      { name: 'Redis (Caching & Pub/Sub)', level: 'Advanced' },
      { name: 'Celery (Distributed Task Queues)', level: 'Expert' },
      { name: 'Docker & Containerization', level: 'Advanced' },
      { name: 'AWS (Lambda, S3, EC2)', level: 'Proficient' }
    ]
  },
  {
    title: 'Architecture & Practices',
    skills: [
      { name: 'Distributed Systems & Microservices', level: 'Advanced' },
      { name: 'Event-Driven Architecture', level: 'Advanced' },
      { name: 'REST & GraphQL API Design', level: 'Expert' },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 'Advanced' },
      { name: 'Agile & Milestone Sprints', level: 'Expert' }
    ]
  }
];

export const SOCIAL_LINKS = {
  name: 'Harshit Soni',
  title: 'Full-Stack Software Engineer & IoT / Mobile Specialist',
  email: 'soniharshit186@gmail.com',
  github: 'https://github.com/Harshit13777',
  linkedin: 'https://www.linkedin.com/in/harshit13777',
  location: 'Gurugram, India (Available for Remote & Relocation)',
  whatsapp: 'https://wa.me/918920334033'
};
