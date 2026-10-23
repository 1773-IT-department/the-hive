import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PAGES } from '../pages';

export const dynamicParams = false;

// Kept inside the raw HTML block so React never hydrates (or re-creates) the preloader the script animates.
const PRELOADER = '<div id="hive-pre" aria-hidden="true"></div><script src="/preloader.js"></script>';

function find(slug?: string[]) {
  const key = (slug ?? []).join('/');
  return PAGES.find((p) => p.slug === key);
}

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug ? [p.slug] : [] }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }): Metadata {
  const page = find(params.slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  const page = find(params.slug);
  if (!page) notFound();
  const html = fs.readFileSync(path.join(process.cwd(), 'content', page.file + '.html'), 'utf8');
  return (
    <>
      <div id="dc-mount" dangerouslySetInnerHTML={{ __html: PRELOADER + html }} />
    </>
  );
}
