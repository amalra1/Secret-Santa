'use client';

import { useEffect, useRef } from 'react';
import type { MouseEvent, SyntheticEvent } from 'react';
import { cx } from '@/lib/classNames';
import type { ModalProps } from '@/types/components/ui';
import styles from './Modal.module.css';

export default function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  variant = 'sheet',
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={cx(styles.dialog, styles[variant])}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={onCancel}
      onClick={onBackdropClick}
    >
      {open && <div className={styles.body}>{children}</div>}
    </dialog>
  );
}
