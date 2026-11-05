export interface TechItem {
  name: string;
  slug: string;
  iconUrl?: string;
  fallbackIcon?: 
    | 'bluetooth' 
    | 'radio' 
    | 'wifi' 
    | 'zap' 
    | 'cpu' 
    | 'layers' 
    | 'code' 
    | 'server' 
    | 'database' 
    | 'terminal' 
    | 'shield' 
    | 'activity';
  iconColor?: string;
  aliases: string[];
  category?: 'frontend-mobile' | 'backend-cloud' | 'databases-state' | 'iot-protocols';
}

/**
 * Master Registry of all technologies used across the portfolio.
 * Devicon CDN v2.16.0 SVGs are leveraged for verified brands.
 * Clean Lucide icons + brand hex colors are used for hardware, protocols, and specialized libraries.
 */
export const TECH_STACK_REGISTRY: TechItem[] = [
  // --- Frontend & Mobile ---
  {
    name: 'React Native',
    slug: 'react-native',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg',
    iconColor: '#61dafb',
    aliases: ['react native', 'react-native', 'rn'],
    category: 'frontend-mobile',
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/typescript/typescript-original.svg',
    iconColor: '#3178c6',
    aliases: ['typescript', 'ts'],
    category: 'frontend-mobile',
  },
  {
    name: 'Next.js',
    slug: 'nextjs',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nextjs/nextjs-original.svg',
    iconColor: '#ffffff',
    aliases: ['next.js', 'nextjs', 'next.js 16', 'next 16'],
    category: 'frontend-mobile',
  },
  {
    name: 'React',
    slug: 'react',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg',
    iconColor: '#61dafb',
    aliases: ['react', 'react.js', 'reactjs'],
    category: 'frontend-mobile',
  },
  {
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tailwindcss/tailwindcss-original.svg',
    iconColor: '#38bdf8',
    aliases: ['tailwind css', 'tailwind', 'tailwindcss', 'tailwind / nativewind', 'nativewind'],
    category: 'frontend-mobile',
  },
  {
    name: 'Redux Toolkit',
    slug: 'redux-toolkit',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/redux/redux-original.svg',
    iconColor: '#764abc',
    aliases: ['redux toolkit', 'redux', 'rtk'],
    category: 'frontend-mobile',
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/javascript/javascript-original.svg',
    iconColor: '#f7df1e',
    aliases: ['javascript', 'javascript (es6+)', 'js', 'es6'],
    category: 'frontend-mobile',
  },
  {
    name: 'HTML5 & CSS3',
    slug: 'html5-css3',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/html5/html5-original.svg',
    iconColor: '#e34f26',
    aliases: ['html5 & css3', 'html5', 'css3', 'html', 'css'],
    category: 'frontend-mobile',
  },
  {
    name: 'Expo',
    slug: 'expo',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg',
    iconColor: '#000020',
    aliases: ['expo', 'expo mobile sdk', 'expo sdk'],
    category: 'frontend-mobile',
  },
  {
    name: 'Zustand',
    slug: 'zustand',
    fallbackIcon: 'layers',
    iconColor: '#ec4899',
    aliases: ['zustand', 'zustand state'],
    category: 'frontend-mobile',
  },
  {
    name: 'Responsive UI/UX',
    slug: 'responsive-ui',
    fallbackIcon: 'code',
    iconColor: '#06b6d4',
    aliases: ['responsive ui/ux', 'responsive design', 'ui/ux'],
    category: 'frontend-mobile',
  },

  // --- Backend & Cloud ---
  {
    name: 'Python',
    slug: 'python',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/python/python-original.svg',
    iconColor: '#3776ab',
    aliases: ['python', 'py'],
    category: 'backend-cloud',
  },
  {
    name: 'Django',
    slug: 'django',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/django/django-plain.svg',
    iconColor: '#092e20',
    aliases: ['django', 'django rest', 'django rest framework', 'drf', 'python/django', 'python / django'],
    category: 'backend-cloud',
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nodejs/nodejs-original.svg',
    iconColor: '#339933',
    aliases: ['node.js', 'nodejs', 'node'],
    category: 'backend-cloud',
  },
  {
    name: 'Express.js',
    slug: 'express',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/express/express-original.svg',
    iconColor: '#68a063',
    aliases: ['express.js', 'express', 'expressjs'],
    category: 'backend-cloud',
  },
  {
    name: 'Java',
    slug: 'java',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/java/java-original.svg',
    iconColor: '#ed8b00',
    aliases: ['java', 'jdk'],
    category: 'backend-cloud',
  },
  {
    name: 'Spring Boot',
    slug: 'spring-boot',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/spring/spring-original.svg',
    iconColor: '#6db33f',
    aliases: ['spring boot', 'spring', 'spring framework'],
    category: 'backend-cloud',
  },
  {
    name: 'Docker',
    slug: 'docker',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/docker/docker-original.svg',
    iconColor: '#2496ed',
    aliases: ['docker', 'containerization'],
    category: 'backend-cloud',
  },
  {
    name: 'AWS Cloud',
    slug: 'aws',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    iconColor: '#ff9900',
    aliases: ['aws', 'aws cloud', 'amazon web services'],
    category: 'backend-cloud',
  },
  {
    name: 'AWS Lambda',
    slug: 'aws-lambda',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    iconColor: '#ff9900',
    aliases: ['aws lambda', 'lambda', 'serverless'],
    category: 'backend-cloud',
  },
  {
    name: 'Celery',
    slug: 'celery',
    fallbackIcon: 'zap',
    iconColor: '#a9cc38',
    aliases: ['celery', 'celery asynchronous queues', 'celery queues'],
    category: 'backend-cloud',
  },
  {
    name: 'Event-Driven',
    slug: 'event-driven',
    fallbackIcon: 'activity',
    iconColor: '#38bdf8',
    aliases: ['event-driven', 'event driven architecture', 'pub/sub architecture'],
    category: 'backend-cloud',
  },
  {
    name: 'RESTful Microservices',
    slug: 'microservices',
    fallbackIcon: 'server',
    iconColor: '#10b981',
    aliases: ['restful microservices', 'microservices', 'rest api', 'rest apis', 'restful apis'],
    category: 'backend-cloud',
  },
  {
    name: 'Webhooks',
    slug: 'webhooks',
    fallbackIcon: 'zap',
    iconColor: '#10b981',
    aliases: ['webhooks', 'webhook', 'api webhooks'],
    category: 'backend-cloud',
  },
  {
    name: 'Stripe',
    slug: 'stripe',
    fallbackIcon: 'shield',
    iconColor: '#635bff',
    aliases: ['stripe', 'stripe payments', 'stripe checkout'],
    category: 'backend-cloud',
  },
  {
    name: 'Razorpay',
    slug: 'razorpay',
    fallbackIcon: 'shield',
    iconColor: '#0c2340',
    aliases: ['razorpay', 'razorpay gateway'],
    category: 'backend-cloud',
  },
  {
    name: 'Twilio',
    slug: 'twilio',
    fallbackIcon: 'radio',
    iconColor: '#f22f46',
    aliases: ['twilio', 'twilio sms', 'push notifications'],
    category: 'backend-cloud',
  },

  // --- Databases & State ---
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/postgresql/postgresql-original.svg',
    iconColor: '#336791',
    aliases: ['postgresql', 'postgres', 'psql'],
    category: 'databases-state',
  },
  {
    name: 'Redis',
    slug: 'redis',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/redis/redis-original.svg',
    iconColor: '#dc382d',
    aliases: ['redis', 'redis pub/sub', 'redis cache'],
    category: 'databases-state',
  },
  {
    name: 'SQLite',
    slug: 'sqlite',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/sqlite/sqlite-original.svg',
    iconColor: '#003b57',
    aliases: ['sqlite', 'sqlite & sqlcipher', 'sqlcipher'],
    category: 'databases-state',
  },
  {
    name: 'MySQL',
    slug: 'mysql',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mysql/mysql-original.svg',
    iconColor: '#4479a1',
    aliases: ['mysql'],
    category: 'databases-state',
  },
  {
    name: 'MongoDB',
    slug: 'mongodb',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mongodb/mongodb-original.svg',
    iconColor: '#47a248',
    aliases: ['mongodb', 'mongo'],
    category: 'databases-state',
  },
  {
    name: 'Offline-First',
    slug: 'offline-first',
    fallbackIcon: 'layers',
    iconColor: '#10b981',
    aliases: ['offline-first', 'offline-first sync', 'offline sync'],
    category: 'databases-state',
  },
  {
    name: 'Data Encryption',
    slug: 'data-encryption',
    fallbackIcon: 'shield',
    iconColor: '#f59e0b',
    aliases: ['data encryption', 'aes-256 storage encryption', 'aes-256', 'encryption'],
    category: 'databases-state',
  },
  {
    name: 'Time-Series Data',
    slug: 'time-series',
    fallbackIcon: 'database',
    iconColor: '#6366f1',
    aliases: ['time-series data', 'timeseries', 'database indexing & tuning'],
    category: 'databases-state',
  },

  // --- IoT & Protocols ---
  {
    name: 'BLE',
    slug: 'ble',
    fallbackIcon: 'bluetooth',
    iconColor: '#0082fc',
    aliases: ['ble', 'bluetooth', 'bluetooth low energy', 'bluetooth low energy (ble)'],
    category: 'iot-protocols',
  },
  {
    name: 'WebSockets',
    slug: 'websockets',
    fallbackIcon: 'radio',
    iconColor: '#38bdf8',
    aliases: ['websockets', 'websocket', 'websockets & telemetry', 'telemetry'],
    category: 'iot-protocols',
  },
  {
    name: 'Serial UART',
    slug: 'serial-uart',
    fallbackIcon: 'cpu',
    iconColor: '#a855f7',
    aliases: ['serial uart', 'serial uart & hardware qa', 'uart', 'serial communication'],
    category: 'iot-protocols',
  },
  {
    name: 'Embedded Systems',
    slug: 'embedded-systems',
    fallbackIcon: 'cpu',
    iconColor: '#ef4444',
    aliases: ['embedded systems', 'embedded', 'hardware qa', 'microcontroller flashing & jtag'],
    category: 'iot-protocols',
  },
  {
    name: 'PyQt',
    slug: 'pyqt',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/qt/qt-original.svg',
    iconColor: '#41cd52',
    aliases: ['pyqt', 'qt', 'pyqt5', 'pyqt6'],
    category: 'iot-protocols',
  },
  {
    name: 'OCPP 1.6-J',
    slug: 'ocpp',
    fallbackIcon: 'zap',
    iconColor: '#eab308',
    aliases: ['ocpp 1.6-j', 'ocpp', 'ocpp 1.6-j / 2.0', 'ocpp 2.0.1'],
    category: 'iot-protocols',
  },
  {
    name: 'Linux Embedded',
    slug: 'linux',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/linux/linux-original.svg',
    iconColor: '#fcc624',
    aliases: ['linux embedded', 'linux', 'embedded linux', 'posix'],
    category: 'iot-protocols',
  },
  {
    name: 'Git & CI/CD',
    slug: 'git',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/git/git-original.svg',
    iconColor: '#f05032',
    aliases: ['git', 'git & ci/cd', 'github actions', 'ci/cd'],
    category: 'iot-protocols',
  },
  {
    name: 'MQTT Protocol',
    slug: 'mqtt',
    fallbackIcon: 'radio',
    iconColor: '#660066',
    aliases: ['mqtt', 'mqtt protocol'],
    category: 'iot-protocols',
  },
  {
    name: 'Multi-Threading',
    slug: 'multi-threading',
    fallbackIcon: 'cpu',
    iconColor: '#ec4899',
    aliases: ['multi-threading', 'multithreading', 'concurrency'],
    category: 'iot-protocols',
  },
];

/**
 * Normalizes input string for reliable alias lookup
 */
function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .replace(/[._\-/\s+]+/g, ' ')
    .trim();
}

// Pre-indexed lookup map for O(1) matching
const LOOKUP_MAP = new Map<string, TechItem>();

TECH_STACK_REGISTRY.forEach((item) => {
  LOOKUP_MAP.set(normalizeKey(item.name), item);
  LOOKUP_MAP.set(normalizeKey(item.slug), item);
  item.aliases.forEach((alias) => {
    LOOKUP_MAP.set(normalizeKey(alias), item);
  });
});

/**
 * Universal lookup helper. Returns registered tech item or a graceful default fallback.
 */
export function getTechItem(query: string): TechItem {
  if (!query) {
    return {
      name: 'Technology',
      slug: 'tech',
      fallbackIcon: 'code',
      iconColor: '#10b981',
      aliases: [],
    };
  }

  const normalized = normalizeKey(query);
  const found = LOOKUP_MAP.get(normalized);
  if (found) {
    return found;
  }

  // Substring fuzzy matching for composite terms
  for (const item of TECH_STACK_REGISTRY) {
    if (
      normalized.includes(normalizeKey(item.name)) ||
      item.aliases.some((alias) => normalized.includes(normalizeKey(alias)))
    ) {
      return item;
    }
  }

  // Graceful fallback for any unregistered term
  return {
    name: query,
    slug: query.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    fallbackIcon: 'code',
    iconColor: '#10b981',
    aliases: [],
  };
}
