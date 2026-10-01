import type { ButtonProps } from '@/types/components/ui';
import ButtonContent from './ButtonContent';
import { buttonClassName } from './buttonClassName';

export default function Button({
  children,
  arrow,
  variant,
  size,
  block,
  className,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, block, className })}
      {...buttonProps}
    >
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </button>
  );
}
