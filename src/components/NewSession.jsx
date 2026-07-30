import { useEffect, useMemo, useState } from 'react';
import { useLocale } from '../locale/LocaleContext';
import styles from './NewSession.module.css';

const TIMES = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);
const shuffle = items => [...items].sort(() => Math.random() - 0.5);
const clock = seconds => `${Math.floor(Math.max(0, seconds) / 60)}:${String(Math.max(0, seconds) % 60).padStart(2, '0')}`;

export default function NewSession({ questions, categories }) {
  const { t, lang } = useLocale();
  const [duration, setDuration] = useState(30);
  const [people, setPeople] = useState(4);
  const [chosen, setChosen] = useState(categories);
  const [intro, setIntro] = useState(true);
  const [reflection, setReflection] = useState(true);
  const [steps, setSteps] = useState(null);
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setChosen(current => [...current.filter(c => categories.includes(c)), ...categories.filter(c => !current.includes(c))]);
  }, [categories]);

  useEffect(() => {
    if (!running || left <= 0) return undefined;
    const id = setInterval(() => setLeft(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(id);
  }, [running, left]);

  const available = useMemo(() => questions.filter(q => chosen.includes(q.category)), [questions, chosen]);
  const introTime = intro ? people * 30 : 0;
  const reflectionTime = reflection ? people * 60 : 0;
  const questionTime = Math.max(0, duration * 60 - introTime - reflectionTime);
  const minimumQuestionTime = Math.min(12, 6 + Math.max(0, people - 2) * 2) * 60;
  const count = Math.min(available.length, Math.floor(questionTime / minimumQuestionTime));
  const canStart = available.length > 0 && count > 0;
  const text = q => typeof q.question === 'string' ? q.question : q.question?.[lang] || q.question?.sv || '';

  const start = () => {
    if (!canStart) return;
    const selected = shuffle(available).slice(0, count);
    const perQuestion = Math.floor(questionTime / selected.length);
    let remainder = questionTime - perQuestion * selected.length;
    const plan = [];
    if (intro) plan.push({ type: 'introduction', text: t('session.introductionPrompt'), seconds: introTime });
    selected.forEach(q => {
      plan.push({ type: 'question', text: text(q), category: q.category, seconds: perQuestion + (remainder-- > 0 ? 1 : 0) });
    });
    if (reflection) plan.push({ type: 'reflection', text: t('session.reflectionPrompt'), seconds: reflectionTime });
    setSteps(plan); setIndex(0); setLeft(plan[0].seconds); setRunning(true);
  };

  const next = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    if (nextIndex < steps.length) { setLeft(steps[nextIndex].seconds); setRunning(true); }
    else { setLeft(0); setRunning(false); }
  };
  const reset = () => { setSteps(null); setIndex(0); setRunning(false); };

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
            <button onClick={() => setRunning(value => !value)}>{running ? t('session.pause') : t('session.resume')}</button>
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
      <label className={styles.field}>{t('session.duration')}
        <select value={duration} onChange={e => setDuration(Number(e.target.value))}>
          {TIMES.map(value => <option key={value} value={value}>{value} {t('session.minutes')}</option>)}
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
        <span>{count} {t('session.questions')} · {clock(count ? Math.floor(questionTime / count) : 0)} {t('session.perQuestion')}</span>
        {intro && <span>{t('session.introduction')}: {clock(introTime)}</span>}
        {reflection && <span>{t('session.reflection')}: {clock(reflectionTime)}</span>}
      </div>
      {!canStart && <p className={styles.warning}>{available.length ? t('session.timeWarning') : t('session.selectCategoryWarning')}</p>}
      <button className={styles.start} disabled={!canStart} onClick={start}>{t('session.start')}</button>
    </section>
  );
}
