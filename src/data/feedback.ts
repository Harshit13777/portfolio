import { FeedbackItem } from '@/types/feedback';

export const CLIENT_FEEDBACK: FeedbackItem[] = [
  {
    id: 'fb-1',
    author: 'Elena Rostova',
    role: 'VP of Hardware & IoT',
    company: 'ChargePoint Systems EU',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote:
      'Harshit resolved our toughest Bluetooth Low Energy connectivity bottlenecks. His custom MTU handshake and offline buffer architecture boosted session completion from 88% to over 99.8% in high-noise garage environments.',
    rating: 5,
    projectContext: 'Smart EV Charger BLE Companion App',
    linkedinUrl: 'https://linkedin.com/in/elena-rostova-iot',
    verified: true,
  },
  {
    id: 'fb-2',
    author: 'Dr. Marcus Vance',
    role: 'CTO & Co-Founder',
    company: 'HealthPulse Telemetry',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote:
      'Working with Harshit felt like having a senior staff engineer on call. He designed the FDA-compliant offline cryptographic buffer for our patient monitors and delivered clean, audit-ready TypeScript and Flutter code.',
    rating: 5,
    projectContext: 'Medical Device Telemetry Scanner',
    linkedinUrl: 'https://linkedin.com/in/marcus-vance-healthtech',
    verified: true,
  },
  {
    id: 'fb-3',
    author: 'Siddharth Nair',
    role: 'Principal Architect',
    company: 'VoltGrid Energy',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote:
      'We brought in Harshit to build our distributed dynamic load balancer across 200+ microgrids. His Node.js event-driven engine prevented grid breaker trips flawlessly during our peak summer heatwave spikes.',
    rating: 5,
    projectContext: 'Dynamic Charging Load Balancer',
    linkedinUrl: 'https://linkedin.com/in/siddharth-nair-energy',
    verified: true,
  },
  {
    id: 'fb-4',
    author: 'Claire Dufresne',
    role: 'Head of Product',
    company: 'AutoFlow Labs',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote:
      'The metadata automation pipeline Harshit developed saved our operations team 18 hours per week. He understood our enterprise requirements on day one and shipped ahead of the aggressive sprint deadline.',
    rating: 5,
    projectContext: 'Metadata Workflow Automation Engine',
    linkedinUrl: 'https://linkedin.com/in/claire-dufresne-product',
    verified: true,
  },
  {
    id: 'fb-5',
    author: 'Arjun Mehta',
    role: 'Engineering Director',
    company: 'PulseCharge Infrastructure',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote:
      'Harshit’s deep expertise in OCPP 2.0.1 WebSocket protocols and concurrent charging state machines made him an invaluable asset to our core backend team. Exceptionally strong systems engineering mind.',
    rating: 5,
    projectContext: 'OCPP 2.0.1 Charging Station Core',
    linkedinUrl: 'https://linkedin.com/in/arjun-mehta-ocpp',
    verified: true,
  },
  {
    id: 'fb-6',
    author: 'Rachel Steinberg',
    role: 'Founder & CEO',
    company: 'Nexis Mobility',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    quote:
      'If you need someone who bridges low-level device protocols with polished mobile UI and scalable cloud backends, Harshit is your engineer. Transparent, reliable, and relentlessly focused on production quality.',
    rating: 5,
    projectContext: 'Fleet Management IoT Mobile Suite',
    // Example where linkedinUrl is omitted to verify conditional rendering
    verified: true,
  },
];
