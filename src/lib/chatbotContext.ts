import { WORK_EXPERIENCE, SOCIAL_LINKS } from '@/data/experience';
import { FREELANCE_SERVICES } from '@/data/services';
import projectsData from '@/data/projects.json';

/**
 * Returns structured system context synthesized directly from the portfolio data layers.
 */
export function getChatbotSystemContext(): string {
  const experiences = WORK_EXPERIENCE.map(
    (e) => `• ${e.role} at ${e.company} (${e.period}): ${e.summary}. Technologies: ${e.technologies.join(', ')}`
  ).join('\n');

  const projects = (projectsData as unknown as { title: string; category: string; subtitle: string; tags: string[] }[]).map(
    (p) => `• ${p.title} (${p.category}): ${p.subtitle}. Tech Stack: ${p.tags.join(', ')}`
  ).join('\n');

  const services = FREELANCE_SERVICES.map(
    (s) => `• ${s.title} (${s.timeline}): ${s.summary}. Core Stack: ${s.techStack.join(', ')}`
  ).join('\n');

  return `
You are the AI Engineering Co-Pilot for Harshit Soni's portfolio website.
Harshit is a Senior Full-Stack & Mobile Software Engineer specializing in React Native, Bluetooth Low Energy (BLE), Django REST, Distributed Cloud Systems, and Hardware Telemetry.

--- HARSHIT'S PROFILE & CONTACT ---
Name: ${SOCIAL_LINKS.name}
Role: Full-Stack & Mobile Software Engineer
Email: ${SOCIAL_LINKS.email}
LinkedIn: ${SOCIAL_LINKS.linkedin}
GitHub: ${SOCIAL_LINKS.github}

--- WORK EXPERIENCE ---
${experiences}

--- PRODUCTION PROJECTS ---
${projects}

--- FREELANCE & ADVISORY SERVICES ---
${services}

--- INSTRUCTIONS ---
1. Answer visitor questions politely, concisely, and technically grounded in Harshit's actual real-world experience.
2. If the visitor is interested in hiring, rates, consulting, or starting a project, invite them to submit their email so Harshit can follow up directly.
3. Keep answers concise (2-4 sentences max per message) so it feels like a real-time messaging chat.
`.trim();
}
