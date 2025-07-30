'use client';

import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Switch.module.css';

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  const isPtBr = language === 'pt-BR';

  return (
    <div className={styles.switchContainer}>
      <span
        className={`${styles.label} ${!isPtBr ? styles.activeLabel : ''}`}
        onClick={isPtBr ? toggleLanguage : undefined}
      >
        EN
      </span>
      <MuiSwitch checked={isPtBr} onChange={toggleLanguage} color="primary" />
      <span
        className={`${styles.label} ${isPtBr ? styles.activeLabel : ''}`}
        onClick={!isPtBr ? toggleLanguage : undefined}
      >
        PT-BR
      </span>
    </div>
  );
}
