'use client';

import { useState } from 'react';

import styles from './page.module.css';
import Header from '@/components/header/Header';
import { Box, Button } from '@mui/material';
import TextInput from '@/components/textInput/TextInput';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CustomAlert from '@/components/customAlert/CustomAlert';

export default function HomePage() {
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleSendEmails = () => {
    console.log('Sending emails...');

    setAlertInfo({
      open: true,
      message: 'Emails sent to all participants',
      severity: 'success',
    });
  };

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <CustomAlert
          open={alertInfo.open}
          message={alertInfo.message}
          severity={alertInfo.severity}
          onClose={() => setAlertInfo({ ...alertInfo, open: false })}
          className={styles.alertBox}
        />
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
              onClick={handleSendEmails}
            >
              Send Emails
            </Button>
          </div>
        </Box>
      </div>
    </main>
  );
}
