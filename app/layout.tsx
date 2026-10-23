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
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="preload" as="image" href="https://images.squarespace-cdn.com/content/v1/688633ab5eb7735480a9622d/6c140487-9cba-4324-9f2c-23180ca56305/The+Hive_Primary+Identity_Reverse.png?format=750w" />
        <link rel="preconnect" href="https://images.squarespace-cdn.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500;700&family=Pontano+Sans:wght@400;700&display=swap" />
        <style dangerouslySetInnerHTML={{ __html: 'x-dc{display:none!important}html,body{margin:0;background:#F5F5F5}#hive-pre{position:fixed;inset:0;z-index:2000;background:#2B2D42;display:grid;place-items:center;overflow:hidden;cursor:default}html.hive-pre-on,html.hive-pre-on body{overflow:hidden}' }} />
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
