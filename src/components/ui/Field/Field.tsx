import { useId } from 'react';
import { cx } from '@/lib/classNames';
import type { FieldProps } from '@/types/components/ui';
import styles from './Field.module.css';

export default function Field({
  label,
  optionalLabel,
  hint,
  error,
  length,
  maxLength,
  className,
  children,
}: FieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;
  const showCounter = length !== undefined && maxLength !== undefined;

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <div className={styles.top}>
        <label htmlFor={id} className={cx(styles.label, 'mono')}>
          {label}
          {optionalLabel && (
            <span className={styles.optional}> ({optionalLabel})</span>
          )}
        </label>
        {showCounter && (
          <span className={cx(styles.counter, 'mono')} aria-hidden="true">
            {length}/{maxLength}
          </span>
        )}
      </div>
      {children({
        id,
        className: styles.control,
        'aria-invalid': Boolean(error),
        'aria-describedby': message ? messageId : undefined,
      })}
      {message && (
        <p
          id={messageId}
          className={cx(styles.message, error && styles.error, 'mono')}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}
