import type { RefObject } from 'react';
import type { MEDIA } from '@/constants/media';

export type MediaConditions = Partial<Record<keyof typeof MEDIA, boolean>>;

export type MediaAnimationSetup = (
  conditions: MediaConditions,
) => void | (() => void);

export interface MediaAnimationOptions {
  scope?: RefObject<HTMLElement | null>;
  dependencies?: unknown[];
  revertOnUpdate?: boolean;
}

export interface HoldProgressOptions {
  duration: number;
  onComplete: () => void;
  onHoldingChange: (holding: boolean) => void;
}
