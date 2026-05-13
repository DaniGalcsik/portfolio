// Root layout — wraps all pages with providers, fonts, meta tags
import type { Metadata } from 'next';
import '../styles/globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://danikovacs.dev'),
  title: 'Kovács Dániel — IT Student & Frontend Developer',
  description:
    'Hungarian IT student and frontend developer. Crafting beautiful, performant web experiences with Next.js, React, and modern tooling.',
  keywords: ['frontend developer', 'IT student', 'Next.js', 'React', 'Hungary', 'web developer'],
  authors: [{ name: 'Kovács Dániel' }],
  creator: 'Kovács Dániel',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://danikovacs.dev',
    title: 'Kovács Dániel — IT Student & Frontend Developer',
    description: 'Hungarian IT student building beautiful web experiences.',
    siteName: 'Kovács Dániel Portfolio',
    images: [
      {
        url: '/assets/sample.png',
        width: 1200,
        height: 630,
        alt: 'Kovács Dániel Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kovács Dániel — IT Student & Frontend Developer',
    description: 'Hungarian IT student building beautiful web experiences.',
    images: ['/assets/sample.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {/* Skip to main content (keyboard accessibility) */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
