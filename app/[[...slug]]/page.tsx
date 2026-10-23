import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PAGES } from '../pages';

export const dynamicParams = false;

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
      <div id="dc-boot" aria-hidden="true">
        <img src="https://images.squarespace-cdn.com/content/v1/688633ab5eb7735480a9622d/6c140487-9cba-4324-9f2c-23180ca56305/The+Hive_Primary+Identity_Reverse.png?format=750w" alt="" />
      </div>
      <div id="dc-mount" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
