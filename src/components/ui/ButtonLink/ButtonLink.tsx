import Link from 'next/link';
import ButtonContent from '@/components/ui/Button/ButtonContent';
import { buttonClassName } from '@/components/ui/Button/buttonClassName';
import type { ButtonLinkProps } from '@/types/components/ui';

export default function ButtonLink({
  children,
  arrow,
  variant,
  size,
  block,
  className,
  href,
  ...anchorProps
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClassName({ variant, size, block, className })}
      {...anchorProps}
    >
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </Link>
  );
}
