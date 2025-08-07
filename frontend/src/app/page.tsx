import styles from './page.module.css';
import Header from '@/components/header/Header';
import { Box, Button } from '@mui/material';
import TextInput from '@/components/textInput/TextInput';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Box className={styles.mainBox}>
          <div className={styles.mainBoxTitle}>Secret Santa</div>
          <div className={styles.mainBoxSubtitle}>
            Type a group name to use SecretSanta
          </div>

          <div className={styles.inputBox}>
            <TextInput
              label="Group Name"
              id="group-name"
              name="groupName"
              placeholder="Ex: Silva Family"
              type="text"
            />
          </div>

          <Button className={styles.primaryButton}>Proceed</Button>
        </Box>
      </div>
    </main>
  );
}
