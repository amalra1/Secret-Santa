'use client';

import { GROUP_NAME_MAX_LENGTH } from '@/constants/draw';
import { normalizeName } from '@/lib/participants';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import Field from '@/components/ui/Field/Field';

export default function GroupStep() {
  const { wizard } = useCopy();
  const { state, setGroupName } = useDraw();

  return (
    <Field
      label={wizard.group.label}
      length={state.groupName.length}
      maxLength={GROUP_NAME_MAX_LENGTH}
    >
      {(control) => (
        <input
          {...control}
          type="text"
          value={state.groupName}
          maxLength={GROUP_NAME_MAX_LENGTH}
          placeholder={wizard.group.placeholder}
          autoComplete="off"
          enterKeyHint="next"
          onChange={(event) => setGroupName(event.target.value)}
          onBlur={(event) => setGroupName(normalizeName(event.target.value))}
        />
      )}
    </Field>
  );
}
