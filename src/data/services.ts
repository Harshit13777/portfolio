export interface FreelanceService {
  id: string;
  title: string;
  badge: string;
  summary: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  iconName: string;
}

export interface EngagementModel {
  title: string;
  description: string;
  idealFor: string;
  timeline: string;
  commitment: string;
}

export const FREELANCE_SERVICES: FreelanceService[] = [
  {
    id: 'mobile-mvp',
    title: 'Cross-Platform Mobile App MVP',
    badge: 'High Demand',
    summary: 'Turn your product concept into a market-ready iOS and Android app with production-grade architecture, smooth animations, and offline resilience.',
    deliverables: [
      'Native-feel React Native / Expo application',
      'Clean state management (Redux Toolkit / Zustand)',
      'Offline-first data caching & sync logic',
      'App Store & Google Play Store submission prep',
      'Push notification setup & analytics tracking'
    ],
    techStack: ['React Native', 'TypeScript', 'Redux', 'SQLite', 'Tailwind / NativeWind'],
    timeline: '3 - 6 Weeks',
    iconName: 'Smartphone'
  },
  {
    id: 'iot-ble',
    title: 'Hardware & IoT Integration (BLE & Telemetry)',
    badge: 'Specialized',
    summary: 'Bridge the gap between physical hardware and user software. Direct Bluetooth Low Energy (BLE), Serial UART, and MQTT real-time device control.',
    deliverables: [
      'GATT service discovery & characteristic streaming',
      'Binary packet chunking & CRC checksum verification',
      'Fault-tolerant reconnection & pairing state machine',
      'Real-time power, sensor, and state dashboards',
      'Hardware simulator for rapid automated testing'
    ],
    techStack: ['BLE', 'MQTT', 'WebSocket', 'Python', 'React Native'],
    timeline: '2 - 5 Weeks',
    iconName: 'Cpu'
  },
  {
    id: 'backend-apis',
    title: 'Scalable Backend APIs & Microservices',
    badge: 'Production Ready',
    summary: 'Fast, secure RESTful & WebSocket APIs designed to handle burst traffic, concurrent hardware telemetry, and automated background jobs.',
    deliverables: [
      'High-throughput Django REST / Node.js / Spring Boot APIs',
      'Database schema design & migrations (PostgreSQL, Redis)',
      'Async background worker queues (Celery, Redis Pub/Sub)',
      'JWT/OAuth2 authentication and role-based access control',
      'Dockerized deployment configs and automated CI/CD'
    ],
    techStack: ['Python/Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    timeline: '2 - 4 Weeks',
    iconName: 'Server'
  },
  {
    id: 'automation-workflows',
    title: 'Workflow Automation & Data Pipelines',
    badge: 'Efficiency',
    summary: 'Automate manual business operations, scheduled reporting, data scraping, and third-party SaaS integrations with robust reliability.',
    deliverables: [
      'Event-driven automation triggers and webhook processors',
      'Scheduled recurring cron pipelines with error alerting',
      'Automated email/SMS/WhatsApp customer notifications',
      'Third-party API integrations (Stripe, Twilio, Slack)',
      'Detailed audit logging and failure recovery'
    ],
    techStack: ['Python', 'AWS Lambda', 'Celery', 'Webhooks', 'REST APIs'],
    timeline: '1 - 3 Weeks',
    iconName: 'Zap'
  }
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: 'Fixed-Price Project Sprint',
    description: 'Clearly scoped feature, prototype, or complete MVP with guaranteed deliverables and defined milestone deadlines.',
    idealFor: 'Startups launching an MVP or companies with clear specification documents.',
    timeline: '2 to 6 weeks',
    commitment: 'Milestone-based payment'
  },
  {
    title: 'Dedicated Monthly Retainer',
    description: 'Guaranteed weekly hours embedded directly with your team for continuous feature development, code reviews, and rapid iteration.',
    idealFor: 'Growing companies needing an experienced Full-Stack / Mobile specialist without full-time hiring overhead.',
    timeline: 'Monthly rolling contract',
    commitment: '20 - 40 hours / week'
  },
  {
    title: 'Architecture & Technical Advisory',
    description: 'Focused consulting on Bluetooth Low Energy architecture, offline-first mobile sync strategies, code audits, and scalability planning.',
    idealFor: 'Teams facing critical technical blockers, performance lag, or security audits.',
    timeline: '1 - 2 weeks advisory',
    commitment: 'Hourly or fixed advisory fee'
  }
];

export const WORKING_PROCESS = [
  {
    step: '01',
    title: 'Discovery & Requirement Mapping',
    description: 'We align on your product vision, target users, hardware specs (if applicable), core user journeys, and technical constraints.'
  },
  {
    step: '02',
    title: 'Architecture & UX Wireframes',
    description: 'Design the database schema, API contracts, BLE state machines, and interactive wireframes before writing code.'
  },
  {
    step: '03',
    title: 'Iterative Sprint Builds',
    description: 'Bi-weekly testable builds delivered straight to your phone (TestFlight / APK) or staging URL with transparent progress updates.'
  },
  {
    step: '04',
    title: 'Hardening & QA Verification',
    description: 'Rigorous testing under poor network conditions, edge cases, device fragmentation, and performance load profiling.'
  },
  {
    step: '05',
    title: 'Production Launch & Handover',
    description: 'Zero-downtime deployment, store submission, clean documentation handover, and post-launch maintenance support.'
  }
];
