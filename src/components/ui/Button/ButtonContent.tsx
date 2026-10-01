import type { ButtonContentProps } from '@/types/components/ui';
import { buttonPartStyles } from './buttonClassName';

export default function ButtonContent({ children, arrow }: ButtonContentProps) {
  return (
    <>
      <span className={buttonPartStyles.label}>{children}</span>
      {arrow && (
        <span className={buttonPartStyles.arrow} aria-hidden="true">
          {arrow}
        </span>
      )}
    </>
  );
}
