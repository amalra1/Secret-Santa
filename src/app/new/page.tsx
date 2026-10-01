import type { Metadata } from 'next';
import Wizard from '@/components/sections/Wizard/Wizard';

export const metadata: Metadata = {
  title: 'Novo sorteio',
};

export default function NewDrawPage() {
  return <Wizard />;
}
