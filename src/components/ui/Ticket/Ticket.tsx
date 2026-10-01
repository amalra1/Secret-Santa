import { cx } from '@/lib/classNames';
import type { TicketProps } from '@/types/components/ui';
import styles from './Ticket.module.css';

export default function Ticket({
  as: Tag = 'div',
  stub,
  children,
  className,
  stubClassName,
  bodyClassName,
}: TicketProps) {
  return (
    <Tag className={cx(styles.ticket, className)}>
      <Tag className={cx(styles.stub, stubClassName)}>{stub}</Tag>
      <Tag className={cx(styles.body, bodyClassName)}>{children}</Tag>
    </Tag>
  );
}
