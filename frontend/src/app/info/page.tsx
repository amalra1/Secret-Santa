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
import { useParticipants } from '@/hooks/useParticipants';

export default function InfoPage() {
  const { groupName } = useGroup();

  const {
    participants,
    setParticipants,
    handleAddParticipant,
    handleRemoveParticipant,
    handleParticipantChange,
    handleNameBlur,
    handleEmailBlur,
    validateEmail,
  } = useParticipants();

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleSendEmails = () => {
    let isFormValid = true;
    const nameCounts: { [key: string]: number } = {};
    const emailCounts: { [key: string]: number } = {};

    participants.forEach((p) => {
      const trimmedName = p.name.trim().toLowerCase();
      const trimmedEmail = p.email.trim().toLowerCase();
      if (trimmedName)
        nameCounts[trimmedName] = (nameCounts[trimmedName] || 0) + 1;
      if (trimmedEmail)
        emailCounts[trimmedEmail] = (emailCounts[trimmedEmail] || 0) + 1;
    });

    const updatedParticipants = participants.map((p) => {
      const trimmedName = p.name.trim().toLowerCase();
      const trimmedEmail = p.email.trim().toLowerCase();
      const errors: { name: string | null; email: string | null } = {
        name: null,
        email: null,
      };

      if (nameCounts[trimmedName] > 1) {
        errors.name = 'This name is already in the list.';
      }
      if (!validateEmail(p.email)) {
        errors.email = 'Please enter a valid email format.';
      } else if (emailCounts[trimmedEmail] > 1) {
        errors.email = 'This email is already in the list.';
      }

      if (errors.name || errors.email) isFormValid = false;
      return { ...p, errors };
    });

    setParticipants(updatedParticipants);

    if (!isFormValid) {
      setAlertInfo({
        open: true,
        message: 'Please correct the fields with errors.',
        severity: 'error',
      });
      return;
    }

    console.log('Sending emails to:', participants);
    setAlertInfo({
      open: true,
      message: 'Emails sent to all participants',
      severity: 'success',
    });
  };

  const isSendButtonDisabled = participants.some(
    (p) => !p.name || !p.email || p.errors.name || p.errors.email,
  );

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <CustomAlert
          open={alertInfo.open}
          message={alertInfo.message}
          severity={alertInfo.severity}
          onClose={() => setAlertInfo({ ...alertInfo, open: false })}
          className={styles.alertBox}
        />
        <Box className={styles.mainBox}>
          <div className={styles.mainBoxTitle}>{groupName || 'New Group'}</div>
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
                    maxLength={100}
                    value={participant.name}
                    onChange={(e) => handleParticipantChange(index, e)}
                    onBlur={() => handleNameBlur(index)}
                    error={participant.errors.name}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="Participant's email"
                    maxLength={100}
                    value={participant.email}
                    onChange={(e) => handleParticipantChange(index, e)}
                    onBlur={() => handleEmailBlur(index)}
                    error={participant.errors.email}
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
