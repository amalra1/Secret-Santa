import styles from './Header.module.css';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Link href="/home" className={styles.logoLink}>
        <div className={styles.content}>
          <CardGiftcardIcon className={styles.icon} />
          <h1 className={styles.title}>SecretSanta</h1>
        </div>
      </Link>
      <div className={styles.divider}></div>
    </header>
  );
}
