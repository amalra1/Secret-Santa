'use client';

import { useState } from 'react';
import { useGroup } from '@/contexts/GroupContext';
import styles from './page.module.css';
import Header from '@/components/header/Header';
import { Box, Button, IconButton } from '@mui/material';
import TextInput from '@/components/textInput/TextInput';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomAlert from '@/components/customAlert/CustomAlert';

type Participant = {
  id: number;
  name: string;
  email: string;
  error: string | null;
};

const validateEmail = (email: string) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function InfoPage() {
  const { groupName } = useGroup();

  const [participants, setParticipants] = useState<Participant[]>([
    { id: Date.now(), name: '', email: '', error: null },
  ]);

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      { id: Date.now(), name: '', email: '', error: null },
    ]);
  };

  const handleRemoveParticipant = (id: number) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleParticipantChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newParticipants = [...participants];
    const participant = newParticipants[index];
    participant[event.target.name as 'name' | 'email'] = event.target.value;
    
    if (event.target.name === 'email') {
      participant.error = null;
    }

    setParticipants(newParticipants);
  };

  const handleEmailBlur = (index: number) => {
    const newParticipants = [...participants];
    const participant = newParticipants[index];
    
    if (!validateEmail(participant.email)) {
      participant.error = "Please enter a valid email format.";
    } else {
      participant.error = null;
    }
    setParticipants(newParticipants);
  };

  const handleSendEmails = () => {
    let isFormValid = true;
    const updatedParticipants = participants.map(p => {
      if (!validateEmail(p.email)) {
        isFormValid = false;
        return { ...p, error: "Please enter a valid email format." };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    if (!isFormValid) {
      setAlertInfo({ open: true, message: 'Please correct the invalid fields.', severity: 'error' });
      return;
    }

    console.log('Sending emails to:', participants);
    setAlertInfo({ open: true, message: 'Emails sent to all participants', severity: 'success' });
  };

  const isSendButtonDisabled = participants.some(p => !p.name || !p.email);

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
          <div className={styles.mainBoxTitle}>
            {groupName || 'New Group'}
          </div>
          <div className={styles.mainBoxSubtitle}>
            Enter every participant&apos;s name and email
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
                    onBlur={() => handleEmailBlur(index)}
                    error={participant.error}
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
              disabled={isSendButtonDisabled}
            >
              Send Emails
            </Button>
          </div>
        </Box>
      </div>
    </main>
  );
}