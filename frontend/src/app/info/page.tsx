'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Header from '@/components/header/Header';
import { Box, Button, IconButton } from '@mui/material';
import TextInput from '@/components/textInput/TextInput';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomAlert from '@/components/customAlert/CustomAlert';

export default function HomePage() {
  const [participants, setParticipants] = useState([
    { id: Date.now(), name: '', email: '' },
  ]);

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleAddParticipant = () => {
    setParticipants([...participants, { id: Date.now(), name: '', email: '' }]);
  };

  const handleRemoveParticipant = (id: number) => {
    const newParticipants = participants.filter((p) => p.id !== id);
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newParticipants = [...participants];
    newParticipants[index][event.target.name as 'name' | 'email'] =
      event.target.value;
    setParticipants(newParticipants);
  };

  const handleSendEmails = () => {
    console.log('Sending emails to:', participants);
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
            {participants.map((participant, index) => (
              <div key={participant.id} className={styles.inputBoxesRow}>
                <div className={styles.inputWrapper}>
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Participant's name"
                    value={participant.name}
                    onChange={(e) => handleParticipantChange(index, e)}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="Participant's email"
                    value={participant.email}
                    onChange={(e) => handleParticipantChange(index, e)}
                  />
                </div>

                {participants.length > 1 && (
                  <IconButton
                    className={styles.deleteButton}
                    onClick={() => handleRemoveParticipant(participant.id)}
                    aria-label="delete participant"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.actionsContainer}>
            <Button
              className={styles.secondaryButton}
              onClick={handleAddParticipant}
            >
              Add Participant
            </Button>
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
