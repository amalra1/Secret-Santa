'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ROUTES } from '@/constants/routes';
import { cx } from '@/lib/classNames';
import { useCopy } from '@/hooks/useCopy';
import { useHeaderScrolled } from '@/hooks/useHeaderScrolled';
import LangToggle from '@/components/layout/LangToggle/LangToggle';
import TribalSun from '@/components/ornaments/TribalSun/TribalSun';
import { useHeaderAnimation } from './useHeaderAnimation';
import styles from './Header.module.css';

export default function Header() {
  const copy = useCopy();
  const scrolled = useHeaderScrolled();
  const brandRef = useRef<HTMLAnchorElement>(null);
  useHeaderAnimation(brandRef);

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)}>
      <Link
        ref={brandRef}
        href={ROUTES.home}
        className={styles.brand}
        aria-label={copy.meta.home}
      >
        <span className={styles.sunWrap}>
          <TribalSun className={styles.sun} />
        </span>
        <span className={cx(styles.name, 'mono')}>{copy.header.brand}</span>
      </Link>
      <span className={styles.toggle}>
        <LangToggle label={copy.meta.language} />
      </span>
    </header>
  );
}
