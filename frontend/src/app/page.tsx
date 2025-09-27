'use client';

import { useState } from 'react';
import { useGroup } from '@/contexts/GroupContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/header/Header';
import { Box, Button } from '@mui/material';
import TextInput from '@/components/textInput/TextInput';

export default function HomePage() {
  const router = useRouter();
  const { groupName, setGroupName } = useGroup();

  const [error, setError] = useState<string | null>(null);

  const handleProceed = () => {
    if (!error) {
      router.push('/info');
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length == 40) {
      setError('Group name cannot exceed 40 characters.');
    } else {
      setError(null);
    }

    setGroupName(value);
  };

  const isButtonDisabled = !groupName || !!error;

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
              maxLength={40}
              type="text"
              value={groupName}
              onChange={handleNameChange} 
              error={error}
            />
          </div>

          <Button
            className={styles.primaryButton}
            onClick={handleProceed}
            disabled={isButtonDisabled}
          >
            Proceed
          </Button>
        </Box>
      </div>
    </main>
  );
}