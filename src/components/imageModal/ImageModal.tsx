'use client';

import React, { useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './ImageModal.module.css';
import CloseIcon from '@mui/icons-material/Close';

type ImageModalProps = {
  imageSrc: StaticImageData | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ImageModal({
  imageSrc,
  isOpen,
  onClose,
}: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen || !imageSrc) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
        <Image
          src={imageSrc}
          alt="Badge em tamanho grande"
          quality={100}
          style={{
            width: 'auto',
            height: 'auto',
            maxHeight: '80vh',
            maxWidth: '80vw',
          }}
        />
      </div>
    </div>
  );
}
