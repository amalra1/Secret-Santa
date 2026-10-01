import { cx } from '@/lib/classNames';
import type { ToastProps } from '@/types/components/ui';
import styles from './Toast.module.css';

export default function Toast({ toast }: ToastProps) {
  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        <p key={toast.id} className={cx(styles.toast, 'mono')}>
          <span className={styles.mark} aria-hidden="true" />
          {toast.text}
        </p>
      )}
    </div>
  );
}
