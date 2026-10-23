import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://the-hive-prototype.vercel.app'),
  icons: { icon: '/favicon.png' },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#D49516' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://img.magnific.com" />
        <link rel="preconnect" href="https://images.squarespace-cdn.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500;700&family=Pontano+Sans:wght@400;700&display=swap" />
        <style dangerouslySetInnerHTML={{ __html: 'x-dc{display:none!important}html,body{margin:0;background:#F5F5F5}#dc-boot{position:fixed;inset:0;background:#D49516;display:flex;align-items:center;justify-content:center;z-index:2000;transition:opacity .35s ease}#dc-boot img{height:56px;width:auto}html.dc-ready #dc-boot{opacity:0;pointer-events:none}' }} />
        <script dangerouslySetInnerHTML={{ __html: 'window.__resources={};' }} />
        <script src="/vendor/react.production.min.js" defer />
        <script src="/vendor/react-dom.production.min.js" defer />
        <script src="/dc-runtime.js" defer />
        <script src="/dc-ready.js" defer />
      </head>
      <body>{children}</body>
    </html>
  );
}
