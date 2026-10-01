'use client';

import { AUTHOR_URL } from '@/constants/site';
import { cx } from '@/lib/classNames';
import { useCopy } from '@/hooks/useCopy';
import styles from './Footer.module.css';

export default function Footer() {
  const { footer } = useCopy();

  return (
    <footer className={cx(styles.footer, 'mono')}>
      {footer.madeBy}{' '}
      <a
        href={AUTHOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {footer.author} <span aria-hidden="true">↗</span>
      </a>
    </footer>
  );
}
