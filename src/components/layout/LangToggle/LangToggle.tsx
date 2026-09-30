'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './LangToggle.module.css';

export default function LangToggle({ label }: { label: string }) {
  const { language, toggleLanguage } = useLanguage();
  const isPt = language === 'pt-BR';

  return (
    <button
      type="button"
      className={`${styles.toggle} mono`}
      onClick={toggleLanguage}
      aria-label={label}
      aria-pressed={isPt}
      title={label}
    >
      <span className={`${styles.option} ${!isPt ? styles.active : ''}`}>
        EN
      </span>
      <span className={styles.slash} aria-hidden="true">
        /
      </span>
      <span className={`${styles.option} ${isPt ? styles.active : ''}`}>
        PT
      </span>
    </button>
  );
}
