'use client';

import { useState } from 'react';
import { useGroup } from '@/contexts/GroupContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Box, Button, IconButton } from '@mui/material';
import TextInput from '@/components/textInput/TextInput';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomAlert from '@/components/customAlert/CustomAlert';
import { useParticipants } from '@/hooks/useParticipants';
import Header from '@/components/header/Header';

export default function InfoPage() {
  const {
    groupName,
    setParticipants: setContextParticipants,
    setDrawResults,
  } = useGroup();
  const router = useRouter();

  const {
    participants,
    setParticipants,
    handleAddParticipant,
    handleRemoveParticipant,
    handleParticipantChange,
    handleNameBlur,
  } = useParticipants();

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleStartDraw = () => {
    let isFormValid = true;
    const nameCounts: { [key: string]: number } = {};

    participants.forEach((p) => {
      const trimmedName = p.name.trim().toLowerCase();
      if (trimmedName)
        nameCounts[trimmedName] = (nameCounts[trimmedName] || 0) + 1;
    });

    const updatedParticipants = participants.map((p) => {
      const trimmedName = p.name.trim().toLowerCase();
      const errors: { name: string | null } = { name: null };

      if (nameCounts[trimmedName] > 1) {
        errors.name = 'This name is already in the list.';
      }
      if (errors.name) isFormValid = false;
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

    const givers = [...participants];
    const receivers = [...participants];
    let validShuffle;
    do {
      receivers.sort(() => Math.random() - 0.5);
      validShuffle = true;
      for (let i = 0; i < givers.length; i++) {
        if (givers[i].id === receivers[i].id) {
          validShuffle = false;
          break;
        }
      }
    } while (!validShuffle);

    const results = givers.map((giver, index) => ({
      giver: { id: giver.id, name: giver.name },
      receiver: {
        id: receivers[index].id,
        name: receivers[index].name,
      },
    }));

    setContextParticipants(
      participants.map((p) => ({ id: p.id, name: p.name })),
    );
    setDrawResults(results);

    router.push('/draw');
  };

  const isButtonDisabled =
    participants.length < 4 ||
    participants.some((p) => !p.name.trim() || p.errors.name);

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
          <div className={styles.mainBoxTitle}>{groupName || 'New Group'}</div>
          <div className={styles.mainBoxSubtitle}>
            Enter every participant&apos;s name (Min 4, Max 20)
          </div>
          <div className={styles.mainBoxDescription}>
            When finished, every participant will be able to to reveal its
            sorted friend
          </div>
          <div className={styles.mainBoxInputBoxesTitle}>
            Participants ({participants.length} / 20)
          </div>
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
              disabled={participants.length >= 20}
            >
              Add Participant
            </Button>
            <Button
              className={styles.primaryButton}
              onClick={handleStartDraw}
              disabled={isButtonDisabled}
            >
              Start Draw
            </Button>
          </div>
        </Box>
      </div>
    </main>
  );
}
