import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '../locale/LocaleContext';
import styles from './NewSession.module.css';

const QUESTION_COUNTS = Array.from({ length: 20 }, (_, i) => i + 1);
const QUESTION_TIMES = Array.from({ length: 15 }, (_, i) => i + 1);
const shuffle = items => [...items].sort(() => Math.random() - 0.5);
const clock = seconds => `${Math.floor(Math.max(0, seconds) / 60)}:${String(Math.max(0, seconds) % 60).padStart(2, '0')}`;

export default function NewSession({ questions, categories }) {
  const { t, lang } = useLocale();
  const [questionCount, setQuestionCount] = useState(4);
  const [minutesPerQuestion, setMinutesPerQuestion] = useState(8);
  const [people, setPeople] = useState(4);
  const [chosen, setChosen] = useState(categories);
  const [intro, setIntro] = useState(true);
  const [reflection, setReflection] = useState(true);
  const [steps, setSteps] = useState(null);
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const audioContextRef = useRef(null);
  const signalledStepRef = useRef(-1);

  useEffect(() => {
    if (!running || left <= 0) return undefined;
    const id = setInterval(() => setLeft(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(id);
  }, [running, left]);

  useEffect(() => {
    if (!steps || index >= steps.length || left !== 0 || signalledStepRef.current === index) return;
    signalledStepRef.current = index;

    const context = audioContextRef.current;
    if (!context) return;

    const now = context.currentTime;
    [0, 0.85, 1.7].forEach((delay) => {
      const strikeTime = now + delay;
      const strikeGain = context.createGain();
      strikeGain.gain.setValueAtTime(0.0001, strikeTime);
      strikeGain.gain.exponentialRampToValueAtTime(0.14, strikeTime + 0.025);
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 1.35);
      strikeGain.connect(context.destination);

      [523.25, 783.99].forEach((frequency, toneIndex) => {
        const oscillator = context.createOscillator();
        const toneGain = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, strikeTime);
        toneGain.gain.setValueAtTime(toneIndex === 0 ? 0.7 : 0.3, strikeTime);
        oscillator.connect(toneGain);
        toneGain.connect(strikeGain);
        oscillator.start(strikeTime);
        oscillator.stop(strikeTime + 1.4);
      });
    });
  }, [index, left, steps]);

  const available = useMemo(() => questions.filter(q => chosen.includes(q.category)), [questions, chosen]);
  const introTime = intro ? people * 30 : 0;
  const reflectionTime = reflection ? people * 60 : 0;
  const questionTime = questionCount * minutesPerQuestion * 60;
  const totalTime = introTime + questionTime + reflectionTime;
  const canStart = available.length >= questionCount;
  const text = q => typeof q.question === 'string' ? q.question : q.question?.[lang] || q.question?.sv || '';

  const start = () => {
    if (!canStart) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const context = audioContextRef.current || new AudioContext();
      audioContextRef.current = context;
      context.resume();

      // Unlock audio during the user's tap so the later signal can play on mobile.
      const unlock = context.createOscillator();
      const silentGain = context.createGain();
      silentGain.gain.value = 0.0001;
      unlock.connect(silentGain);
      silentGain.connect(context.destination);
      unlock.start();
      unlock.stop(context.currentTime + 0.01);
    }

    const selected = shuffle(available).slice(0, questionCount);
    const plan = [];
    if (intro) plan.push({ type: 'introduction', text: t('session.introductionPrompt'), seconds: introTime });
    selected.forEach(q => {
      plan.push({ type: 'question', text: text(q), category: q.category, seconds: minutesPerQuestion * 60 });
    });
    if (reflection) plan.push({ type: 'reflection', text: t('session.reflectionPrompt'), seconds: reflectionTime });
    signalledStepRef.current = -1;
    setSteps(plan); setIndex(0); setLeft(plan[0].seconds); setRunning(true);
  };

  const next = () => {
    const nextIndex = index + 1;
    signalledStepRef.current = -1;
    setIndex(nextIndex);
    if (nextIndex < steps.length) { setLeft(steps[nextIndex].seconds); setRunning(true); }
    else { setLeft(0); setRunning(false); }
  };
  const reset = () => {
    signalledStepRef.current = -1;
    setSteps(null); setIndex(0); setRunning(false);
  };

  if (steps) {
    if (index >= steps.length) return (
      <section className={styles.center}>
        <div className={styles.card}><h2>{t('session.finishedTitle')}</h2><p>{t('session.finishedText')}</p>
          <button className={styles.primary} onClick={reset}>{t('session.newSession')}</button>
        </div>
      </section>
    );
    const step = steps[index];
    return (
      <section className={styles.center}>
        <span className={styles.progress}>{index + 1} / {steps.length}</span>
        <article className={styles.card}>
          <div className={styles.eyebrow}>{step.type === 'question' ? t(`categories.${step.category}`) : t(`session.${step.type}`)}</div>
          <p className={styles.prompt}>{step.text}</p>
          <div className={styles.timer} aria-live="polite">{clock(left)}</div>
          <div className={styles.actions}>
            <button disabled={left === 0} onClick={() => setRunning(value => !value)}>{running ? t('session.pause') : t('session.resume')}</button>
            <button className={styles.primary} onClick={next}>{index === steps.length - 1 ? t('session.finish') : t('session.next')}</button>
          </div>
        </article>
        <button className={styles.cancel} onClick={reset}>{t('session.endSession')}</button>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <header><h2>{t('session.title')}</h2><p>{t('session.description')}</p></header>
      <label className={styles.field}>{t('session.questionCount')}
        <select value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))}>
          {QUESTION_COUNTS.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className={styles.field}>{t('session.timePerQuestion')}
        <select value={minutesPerQuestion} onChange={e => setMinutesPerQuestion(Number(e.target.value))}>
          {QUESTION_TIMES.map(value => <option key={value} value={value}>{value} {t('session.minutes')}</option>)}
        </select>
      </label>
      <label className={styles.field}>{t('session.participants')}
        <input type="number" min="2" max="50" value={people} onChange={e => setPeople(Math.min(50, Math.max(2, Number(e.target.value))))} />
      </label>
      <fieldset><legend>{t('session.categories')}</legend><div className={styles.categories}>
        {categories.map(category => <button type="button" key={category} aria-pressed={chosen.includes(category)}
          className={chosen.includes(category) ? styles.selected : ''} onClick={() => setChosen(value => value.includes(category) ? value.filter(c => c !== category) : [...value, category])}>
          {t(`categories.${category}`)}
        </button>)}
      </div></fieldset>
      <div className={styles.toggle}><span>{t('session.includeIntroduction')}</span><button className={intro ? styles.selected : ''} onClick={() => setIntro(v => !v)}>{intro ? t('yes') : t('no')}</button></div>
      <div className={styles.toggle}><span>{t('session.includeReflection')}</span><button className={reflection ? styles.selected : ''} onClick={() => setReflection(v => !v)}>{reflection ? t('yes') : t('no')}</button></div>
      <div className={styles.summary}><strong>{t('session.plan')}</strong>
        <span>{questionCount} {t('session.questions')} · {clock(minutesPerQuestion * 60)} {t('session.perQuestion')}</span>
        {intro && <span>{t('session.introduction')}: {clock(introTime)}</span>}
        {reflection && <span>{t('session.reflection')}: {clock(reflectionTime)}</span>}
        <strong className={styles.total}>{t('session.totalTime')}: {clock(totalTime)}</strong>
      </div>
      {!canStart && <p className={styles.warning}>{available.length ? t('session.notEnoughQuestions') : t('session.selectCategoryWarning')}</p>}
      <button className={styles.start} disabled={!canStart} onClick={start}>{t('session.start')}</button>
    </section>
  );
}
