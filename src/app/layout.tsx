import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Harshit Soni | Full-Stack & IoT / Mobile Software Engineer',
  description: 'Portfolio of Harshit Soni: Full-Stack, React Native, and IoT Specialist building offline-first mobile apps, BLE telemetry protocols, and resilient cloud architectures.',
  keywords: [
    'Harshit Soni',
    'Full-Stack Engineer',
    'React Native Developer',
    'IoT Specialist',
    'Bluetooth Low Energy',
    'BLE App Developer',
    'Freelance Mobile Developer',
    'Django Developer'
  ],
  authors: [{ name: 'Harshit Soni' }],
  openGraph: {
    title: 'Harshit Soni | Full-Stack & IoT / Mobile Software Engineer',
    description: 'Explore live project highlights, video walk-throughs, and deep-dive technical case studies across React Native, BLE, and distributed cloud backends.',
    type: 'website',
  },
};

const themeScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
