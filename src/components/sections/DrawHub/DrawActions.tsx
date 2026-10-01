'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import { useToast } from '@/hooks/useToast';
import Button from '@/components/ui/Button/Button';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import ConfirmDialog from '@/components/ui/ConfirmDialog/ConfirmDialog';
import Toast from '@/components/ui/Toast/Toast';
import type { DrawDialog } from '@/types/components/sections';
import styles from './DrawHub.module.css';

export default function DrawActions() {
  const { draw } = useCopy();
  const { runDraw, reset } = useDraw();
  const router = useRouter();
  const { toast, showToast } = useToast();
  const [dialog, setDialog] = useState<DrawDialog>(null);

  const redo = () => {
    runDraw();
    setDialog(null);
    showToast(draw.redone);
  };

  const startOver = () => {
    setDialog(null);
    router.push(ROUTES.create);
    reset();
  };

  return (
    <div className={styles.actions}>
      <Button variant="ghost" arrow="↻" onClick={() => setDialog('redo')}>
        {draw.redo}
      </Button>
      <ButtonLink href={ROUTES.create} variant="quiet" arrow="✎">
        {draw.edit}
      </ButtonLink>
      <Button variant="quiet" arrow="✕" onClick={() => setDialog('reset')}>
        {draw.newGroup}
      </Button>

      <ConfirmDialog
        open={dialog === 'redo'}
        title={draw.redoTitle}
        description={draw.redoText}
        confirmLabel={draw.redoConfirm}
        cancelLabel={draw.cancel}
        onConfirm={redo}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === 'reset'}
        title={draw.newGroupTitle}
        description={draw.newGroupText}
        confirmLabel={draw.newGroupConfirm}
        cancelLabel={draw.cancel}
        onConfirm={startOver}
        onCancel={() => setDialog(null)}
      />
      <Toast toast={toast} />
    </div>
  );
}
