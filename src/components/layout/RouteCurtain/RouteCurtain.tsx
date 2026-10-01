'use client';

import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { useRouteCurtainAnimation } from './useRouteCurtainAnimation';
import styles from './RouteCurtain.module.css';

export default function RouteCurtain() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useRouteCurtainAnimation(ref, pathname);

  return <div ref={ref} className={styles.curtain} aria-hidden="true" />;
}
