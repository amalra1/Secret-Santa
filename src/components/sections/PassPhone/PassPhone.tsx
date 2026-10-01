'use client';

import { useState } from 'react';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import ConfirmDialog from '@/components/ui/ConfirmDialog/ConfirmDialog';
import Modal from '@/components/ui/Modal/Modal';
import RevealCard from '@/components/sections/RevealCard/RevealCard';
import type { PassPhoneProps } from '@/types/components/sections';
import type { Pairing } from '@/types/draw';
import DrawComplete from './DrawComplete';
import NameCard from './NameCard';
import styles from './PassPhone.module.css';

const REVEAL_TITLE_ID = 'pass-phone-reveal';

export default function PassPhone({
  pairings,
  groupName,
  details,
}: PassPhoneProps) {
  const { draw, reveal } = useCopy();
  const { state, markRevealed } = useDraw();
  const [selected, setSelected] = useState<Pairing | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const seen = new Set(state.revealedIds);
  const done = pairings.filter(({ giver }) => seen.has(giver.id)).length;
  const finished = done === pairings.length && !selected;
  const selectedSeen = selected ? seen.has(selected.giver.id) : false;

  const close = () => {
    const giverId = selected?.giver.id;
    setSelected(null);
    setConfirmed(false);
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>(`[data-giver="${giverId}"]`)
        ?.focus({ preventScroll: true }),
    );
  };

  return (
    <div className={styles.pass}>
      {finished ? (
        <DrawComplete date={details.date} />
      ) : (
        <>
          <p className={styles.intro}>{draw.phoneIntro}</p>
          <div className={cx(styles.progress, 'mono')}>
            <span>{fill(draw.progress, { done, total: pairings.length })}</span>
            <span className={styles.track} aria-hidden="true">
              <span
                className={styles.bar}
                style={{ transform: `scaleX(${done / pairings.length})` }}
              />
            </span>
          </div>
        </>
      )}

      <ul className={styles.grid}>
        {pairings.map((pairing, index) => (
          <li key={pairing.giver.id}>
            <NameCard
              giverId={pairing.giver.id}
              index={index + 1}
              name={pairing.giver.name}
              seen={seen.has(pairing.giver.id)}
              seenLabel={draw.seen}
              onSelect={() => setSelected(pairing)}
            />
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={Boolean(selected) && !confirmed}
        title={fill(draw.confirmTitle, { name: selected?.giver.name ?? '' })}
        description={fill(
          selectedSeen ? draw.confirmSeenText : draw.confirmText,
          { name: selected?.giver.name ?? '' },
        )}
        confirmLabel={draw.confirmYes}
        cancelLabel={draw.confirmNo}
        onConfirm={() => setConfirmed(true)}
        onCancel={close}
      />

      <Modal
        open={Boolean(selected) && confirmed}
        onClose={close}
        labelledBy={REVEAL_TITLE_ID}
        variant="full"
      >
        {selected && (
          <div id={REVEAL_TITLE_ID} className={styles.reveal}>
            <RevealCard
              groupName={groupName}
              giver={selected.giver.name}
              receiver={selected.receiver.name}
              details={details}
              doneLabel={reveal.hide}
              onRevealed={() => markRevealed(selected.giver.id)}
              onDone={close}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
