import { LONG_NAME_LENGTH } from '@/constants/draw';
import { CARD_GLYPHS } from '@/constants/glyphs';
import { cx } from '@/lib/classNames';
import { glyphAt } from '@/lib/glyphs';
import { padIndex } from '@/lib/format';
import Ticket from '@/components/ui/Ticket/Ticket';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { NameCardProps } from '@/types/components/sections';
import styles from './PassPhone.module.css';

export default function NameCard({
  giverId,
  index,
  name,
  seen,
  seenLabel,
  onSelect,
}: NameCardProps) {
  return (
    <button
      type="button"
      data-giver={giverId}
      className={cx(styles.card, seen && styles.seen)}
      onClick={onSelect}
    >
      <Ticket
        as="span"
        className={styles.ticket}
        stubClassName={styles.stub}
        bodyClassName={styles.body}
        stub={
          <>
            <TribalGlyph
              name={glyphAt(CARD_GLYPHS, index - 1)}
              className={styles.glyph}
            />
            <span className={cx(styles.cardIndex, 'mono')}>
              {padIndex(index)}
            </span>
          </>
        }
      >
        <span
          className={cx(
            styles.cardName,
            name.length > LONG_NAME_LENGTH && styles.longName,
            'display',
          )}
        >
          {name}
        </span>
        {seen && <span className={cx(styles.stamp, 'mono')}>{seenLabel}</span>}
      </Ticket>
    </button>
  );
}
