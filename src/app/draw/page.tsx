import type { Metadata } from 'next';
import DrawHub from '@/components/sections/DrawHub/DrawHub';

export const metadata: Metadata = {
  title: 'O sorteio',
  robots: { index: false },
};

export default function DrawPage() {
  return <DrawHub />;
}
