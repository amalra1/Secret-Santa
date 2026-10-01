import { cx } from '@/lib/classNames';
import { padIndex } from '@/lib/format';
import type { StepIndicatorProps } from '@/types/components/ui';
import styles from './StepIndicator.module.css';

export default function StepIndicator({
  current,
  total,
  label,
}: StepIndicatorProps) {
  const steps = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div className={styles.indicator}>
      <p className={cx(styles.count, 'mono')} aria-hidden="true">
        <span className={styles.current}>{padIndex(current)}</span>
        <span className={styles.total}> / {padIndex(total)}</span>
      </p>
      <p className="visually-hidden" aria-live="polite">
        {label}
      </p>
      <ol className={styles.bars} aria-hidden="true">
        {steps.map((step) => (
          <li
            key={step}
            className={cx(
              styles.bar,
              step <= current && styles.filled,
              step === current && styles.now,
            )}
          />
        ))}
      </ol>
    </div>
  );
}
