import Header from '../components/header/Header';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Header />

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ height: '200vh', paddingTop: '10rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#333' }}>
            Conteúdo
          </h1>
          <p style={{ color: '#555' }}>
            Role para baixo para ver que o header acompanha o scroll.
          </p>
        </div>
      </div>
    </main>
  );
}
