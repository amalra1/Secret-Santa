import type { WIZARD_STEPS } from '@/constants/wizard';

export type WizardStep = (typeof WIZARD_STEPS)[number];
