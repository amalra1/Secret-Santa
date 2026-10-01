'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ROUTES } from '@/constants/routes';
import { WIZARD_STEPS } from '@/constants/wizard';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { isStepComplete } from '@/lib/wizard';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import Button from '@/components/ui/Button/Button';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import StepIndicator from '@/components/ui/StepIndicator/StepIndicator';
import DetailsStep from '@/components/sections/DetailsStep/DetailsStep';
import GroupStep from '@/components/sections/GroupStep/GroupStep';
import PeopleStep from '@/components/sections/PeopleStep/PeopleStep';
import { useWizardAnimation } from './useWizardAnimation';
import styles from './Wizard.module.css';

const STEP_CONTENT = {
  group: GroupStep,
  people: PeopleStep,
  details: DetailsStep,
};

export default function Wizard() {
  const { wizard } = useCopy();
  const { state, hydrated, runDraw } = useDraw();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLFormElement>(null);
  const changedStep = useRef(false);
  useWizardAnimation(ref, index);

  const step = WIZARD_STEPS[index];
  const stepCopy = wizard[step];
  const StepContent = STEP_CONTENT[step];
  const isLast = index === WIZARD_STEPS.length - 1;
  const canContinue = isStepComplete(step, state);

  useEffect(() => {
    if (!changedStep.current) return;
    window.scrollTo({ top: 0 });
    ref.current?.querySelector<HTMLElement>('input, textarea')?.focus({
      preventScroll: true,
    });
  }, [index]);

  const goTo = (next: number) => {
    changedStep.current = true;
    setIndex(next);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue) return;
    if (!isLast) return goTo(index + 1);
    runDraw();
    router.push(ROUTES.draw);
  };

  if (!hydrated) return <div className="page" />;

  return (
    <form
      ref={ref}
      className={cx('page', styles.wizard)}
      onSubmit={onSubmit}
      noValidate
    >
      <header className={styles.aside}>
        <StepIndicator
          current={index + 1}
          total={WIZARD_STEPS.length}
          label={fill(wizard.stepCounter, {
            current: index + 1,
            total: WIZARD_STEPS.length,
          })}
        />
        <div key={step} className={styles.heading}>
          <p className={cx(styles.kicker, 'mono')}>{stepCopy.word}</p>
          <h1 className={cx(styles.title, 'display')}>
            <span className={styles.titleInner}>{stepCopy.title}</span>
          </h1>
          <p className={styles.description}>{stepCopy.description}</p>
        </div>
      </header>

      <div key={step} className={styles.panel}>
        <StepContent />
      </div>

      <div className={styles.bar}>
        {index === 0 ? (
          <ButtonLink href={ROUTES.home} variant="quiet" arrow="←">
            {wizard.back}
          </ButtonLink>
        ) : (
          <Button variant="quiet" arrow="←" onClick={() => goTo(index - 1)}>
            {wizard.back}
          </Button>
        )}
        <Button
          type="submit"
          disabled={!canContinue}
          arrow={isLast ? '✦' : '→'}
        >
          {isLast ? wizard.finish : wizard.next}
        </Button>
      </div>
    </form>
  );
}
