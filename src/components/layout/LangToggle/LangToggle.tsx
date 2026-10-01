'use client';

import { PORTUGUESE_LANGUAGE } from '@/constants/language';
import { cx } from '@/lib/classNames';
import { useLanguage } from '@/hooks/useLanguage';
import type { LangToggleProps } from '@/types/components/layout';
import styles from './LangToggle.module.css';

export default function LangToggle({ label }: LangToggleProps) {
  const { language, toggleLanguage } = useLanguage();
  const isPortuguese = language === PORTUGUESE_LANGUAGE;

  return (
    <button
      type="button"
      className={cx(styles.toggle, 'mono')}
      onClick={toggleLanguage}
      aria-label={label}
      aria-pressed={isPortuguese}
      title={label}
    >
      <span className={cx(styles.option, isPortuguese && styles.active)}>
        PT
      </span>
      <span className={styles.slash} aria-hidden="true">
        /
      </span>
      <span className={cx(styles.option, !isPortuguese && styles.active)}>
        EN
      </span>
    </button>
  );
}
