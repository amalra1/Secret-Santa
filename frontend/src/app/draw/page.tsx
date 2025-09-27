'use client';

import { useState, useEffect } from 'react';
import { useGroup } from '@/contexts/GroupContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/header/Header';
import { Box, Button } from '@mui/material';

export default function DrawPage() {
  const {
    groupName,
    drawResults,
    setGroupName,
    setParticipants,
    setDrawResults,
  } = useGroup();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (drawResults.length === 0) {
      router.push('/');
    }
  }, [drawResults, router]);

  if (drawResults.length === 0) {
    return null;
  }

  const currentPair = drawResults[currentIndex];

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < drawResults.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsRevealed(false);
    setIsFinished(false);
  };

  const handleGoHome = () => {
    setGroupName('');
    setParticipants([]);
    setDrawResults([]);
    router.push('/');
  };

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Box className={styles.mainBox} style={{ textAlign: 'center' }}>
          {!isFinished ? (
            <>
              <div className={styles.mainBoxTitle}>{groupName}&apos;s Draw</div>

              <div className={styles.drawInstruction}>
                It&apos;s time for{' '}
                <span className={styles.giverName}>
                  {currentPair.giver.name}
                </span>{' '}
                to reveal its sorted friend, be sure to take notes!
              </div>

              <div className={styles.drawSubInstruction}>
                (Please give the phone to {currentPair.giver.name})
              </div>

              <div className={styles.revealContainer}>
                {isRevealed ? (
                  <div className={styles.revealedName}>
                    {currentPair.receiver.name}
                  </div>
                ) : (
                  <Button
                    className={styles.primaryButton}
                    onClick={handleReveal}
                  >
                    Reveal Friend
                  </Button>
                )}
              </div>

              <div className={styles.drawActionsContainer}>
                {isRevealed && (
                  <Button
                    className={styles.secondaryButton}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={styles.mainBoxTitle}>Draw Finished!</div>
              <div className={styles.drawInstruction}>
                Everyone has discovered their Secret Santa. Happy gifting!
              </div>
              <div className={styles.drawActionsContainer}>
                <Button
                  className={styles.secondaryButton}
                  onClick={handleGoHome}
                >
                  Back to Home
                </Button>
                <Button
                  className={styles.primaryButton}
                  onClick={handleRestart}
                >
                  Check Again
                </Button>
              </div>
            </>
          )}
        </Box>
      </div>
    </main>
  );
}
