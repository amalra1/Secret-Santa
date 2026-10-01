'use client';

import { useContext } from 'react';
import { DrawContext } from '@/contexts/DrawContext';

export function useDraw() {
  const context = useContext(DrawContext);
  if (context === undefined) {
    throw new Error('useDraw must be used within a DrawProvider');
  }
  return context;
}
