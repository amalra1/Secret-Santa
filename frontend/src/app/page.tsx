import styles from './page.module.css';
import Header from '@/components/header/Header';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Header />
    </main>
  );
}
