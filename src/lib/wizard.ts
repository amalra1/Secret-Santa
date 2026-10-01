import { MIN_PARTICIPANTS } from '@/constants/draw';
import { findDuplicateIds, normalizeName } from '@/lib/participants';
import type { DrawState } from '@/types/draw';
import type { WizardStep } from '@/types/wizard';

export function isStepComplete(step: WizardStep, state: DrawState) {
  if (step === 'group') return normalizeName(state.groupName).length > 0;
  if (step === 'people') {
    const { participants } = state;
    return (
      participants.length >= MIN_PARTICIPANTS &&
      participants.every(({ name }) => normalizeName(name)) &&
      findDuplicateIds(participants).size === 0
    );
  }
  return true;
}
