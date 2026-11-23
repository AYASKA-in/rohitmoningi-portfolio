import { createSocialImage } from '@/lib/og';
import { projectMap, projects } from '@/lib/content';
import { notFound } from 'next/navigation';
export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export default async function Image({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = projectMap.get(slug); if (!p) notFound(); return createSocialImage(p.shortTitle, p.category); }
