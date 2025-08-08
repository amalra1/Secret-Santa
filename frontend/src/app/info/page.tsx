import styles from './page.module.css';
import Header from '@/components/header/Header';
import { Box, Button } from '@mui/material';
import TextInput from '@/components/textInput/TextInput';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Box className={styles.mainBox}>
          <div className={styles.mainBoxTitle}>New Group</div>
          <div className={styles.mainBoxSubtitle}>
            Enter every participant's name and email
          </div>
          <div className={styles.mainBoxDescription}>
            Each participant will receive by email the name of the sorted friend
            to gift!
          </div>

          <div className={styles.mainBoxInputBoxesTitle}>Participants</div>

          <div className={styles.inputBoxes}>
            <div className={styles.inputBoxesRow}>
              <div>
                <TextInput
                  label="Name"
                  id="name"
                  name="name"
                  placeholder="Participant's name"
                  type="text"
                />
              </div>

              <div>
                <TextInput
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Participant's email"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.actionsContainer}>
            <Button className={styles.secondaryButton}>Add Participant</Button>
            <Button
              className={styles.primaryButton}
              startIcon={<EmailOutlinedIcon />}
            >
              Send Emails
            </Button>
          </div>
        </Box>
      </div>
    </main>
  );
}
