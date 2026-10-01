'use client';

import { useId } from 'react';
import { cx } from '@/lib/classNames';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { ConfirmDialogProps } from '@/types/components/ui';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      open={open}
      onClose={onCancel}
      labelledBy={titleId}
      describedBy={descriptionId}
    >
      <TribalGlyph name="eye" className={styles.glyph} />
      <h2 id={titleId} className={cx(styles.title, 'display')}>
        {title}
      </h2>
      <p id={descriptionId} className={styles.description}>
        {description}
      </p>
      <div className={styles.actions}>
        <Button variant="primary" block onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="ghost" block onClick={onCancel} autoFocus>
          {cancelLabel}
        </Button>
      </div>
    </Modal>
  );
}
