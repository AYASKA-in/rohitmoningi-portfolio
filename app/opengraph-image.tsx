import { createSocialImage } from '@/lib/og';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Rohit Moningi — Full-Stack Software Engineer';
export default function Image() { return createSocialImage('ROHIT MONINGI', 'Full-Stack Software Engineer'); }
