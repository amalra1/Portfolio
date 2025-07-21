import React from 'react';
import MuiButton from '@mui/material/Button';
import styles from './Button.module.css';

type ButtonProps = {
  href?: string;
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <MuiButton variant="outlined" className={styles.button}>
      {text}
    </MuiButton>
  );
}
