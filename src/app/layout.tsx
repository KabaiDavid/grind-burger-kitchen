import type { Metadata, Viewport } from 'next';
import './globals.css';
import '@/components/home/home.css';
import '@/components/menu/menu.css';
import '@/components/inner/inner.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RevealObserver } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, site } from '@/data/site';
import { restaurantJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Grind Burger Kitchen — Chef-Driven Burgers in NuLu, Louisville KY',
    template: '%s · Grind Burger Kitchen',
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0f0d0c',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/alfa-slab-one.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <JsonLd data={restaurantJsonLd()} />
      </body>
    </html>
  );
}
