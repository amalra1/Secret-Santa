import styles from './Header.module.css';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.content}>
        <CardGiftcardIcon className={styles.icon} />
        <h1 className={styles.title}>SecretSanta</h1>
      </div>
      <div className={styles.divider}></div>
    </header>
  );
}
