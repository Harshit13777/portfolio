export interface AchievementItem {
  text: string;
  featured?: boolean; // When true, rendered on the Home Page timeline highlight
  metric?: string;    // Short impact tag (e.g. "< 0.6% Drops", "250k+ Tasks/Day")
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  type: 'Full-time' | 'Contract' | 'Freelance';
  summary: string;
  achievements: AchievementItem[];
  technologies: string[];
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
      {
        text: 'Architected cross-platform React Native app communicating directly with hardware chargers over Bluetooth Low Energy (BLE), reducing peripheral connection drop rates to under 0.6%.',
        featured: true,
        metric: '< 0.6% Drops'
      },
      {
        text: 'Developed dynamic load-balancing microservices in Spring Boot & WebSockets to automatically throttle charging current and prevent electrical substation overloads.',
        featured: true,
        metric: 'Grid Optimizer'
      },
      {
        text: 'Engineered an offline-first transaction queue persisting sessions in SQLite and syncing automatically with Django REST backend when network connectivity restores.',
        featured: false
      },
      {
        text: 'Built multi-threaded Python desktop tools for factory assembly line testing, reducing board QA inspection from 25 min to 4 min.',
        featured: false
      }
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
      {
        text: 'Designed a metadata-driven workflow automation engine in Django and Celery, orchestrating 250,000+ daily asynchronous tasks with 99.99% execution reliability.',
        featured: true,
        metric: '250k+ Tasks/Day'
      },
      {
        text: 'Implemented distributed Redis task caching and message pub/sub, decreasing API response latency by 45%.',
        featured: false
      },
      {
        text: 'Built interactive frontend dashboards using React and modern CSS, translating Figma mockups into pixel-perfect responsive web interfaces.',
        featured: false
      },
      {
        text: 'Integrated payment gateways, automated invoicing, and third-party webhook notification pipelines.',
        featured: false
      }
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
      {
        text: 'Delivered a HIPAA-compliant medical diagnostic telemetry mobile app with zero packet loss over Bluetooth and encrypted local storage.',
        featured: true,
        metric: 'HIPAA Verified'
      },
      {
        text: 'Engineered travel management and automated customer reminder systems, increasing booking conversion by 30%.',
        featured: false
      },
      {
        text: 'Provided end-to-end consulting from system architecture design through App Store / Play Store deployment.',
        featured: false
      }
    ],
    technologies: ['React Native', 'Node.js', 'Python', 'BLE', 'SQLite', 'Tailwind CSS', 'Next.js']
  }
];

export const SOCIAL_LINKS = {
  name: 'Harshit Soni',
  title: 'Full-Stack Software Engineer & IoT / Mobile Specialist',
  email: 'soniharshit186@gmail.com',
  github: 'https://github.com/Harshit13777',
  linkedin: 'https://www.linkedin.com/in/harshit13777',
  location: 'Gurugram, India (Available for Remote & Relocation)',
  whatsapp: 'https://wa.me/918920334033',
  avatarUrl: '/images/profile.jpeg',
  avatarFallback: 'HS'
};
