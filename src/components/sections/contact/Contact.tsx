import React from 'react';
import styles from './Contact.module.css';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Icon from '@/components/icon/Icon';
import Link from 'next/link';

type Social = {
  name: string;
  url: string;
  icon: string;
};

type ContactData = {
  title: string;
  email: string;
  socials: Social[];
};

type ContactProps = {
  data: ContactData;
};

export default function Contact({ data }: ContactProps) {
  return (
    <div className={styles.contactSection}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>{data.title}</h2>
        <Button
          variant="outlined"
          href={`mailto:${data.email}`}
          startIcon={<EmailIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            borderColor: '#555',
            color: '#333',
            padding: '0.5rem 1.5rem',
          }}
        >
          {data.email}
        </Button>
      </div>
      <div className={styles.socials}>
        {data.socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name={social.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
