'use client';

import { DrawProvider } from '@/contexts/DrawContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { ProvidersProps } from '@/types/components/providers';

export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <DrawProvider>{children}</DrawProvider>
    </LanguageProvider>
  );
}
