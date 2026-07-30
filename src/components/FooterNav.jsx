import React from 'react';
import { FaQuestionCircle, FaPlus, FaClock, FaCog } from 'react-icons/fa';
import { useLocale } from '../locale/LocaleContext';
import styles from './FooterNav.module.css';

export default function FooterNav({ view, setView }) {
  const { t } = useLocale();

  return (
    <footer className={styles.footer}>
      <button
        className={`${styles.navBtn} ${view === 'main' ? styles.active : ''}`}
        onClick={() => setView('main')}
        aria-label={t('navigation.questions')}
      >
        {/* Frågetecken */}
        <FaQuestionCircle className={styles.icon} aria-hidden="true" />
      </button>

      <button
        className={`${styles.navBtn} ${view === 'add' ? styles.active : ''}`}
        onClick={() => setView('add')}
        aria-label={t('navigation.addQuestion')}
      >
        {/* Svartvit plus */}
        <FaPlus className={styles.icon} aria-hidden="true" />
      </button>
        {/* Klocka */}
      <button className={`${styles.navBtn} ${view === 'session' ? styles.active : ''}`} onClick={() => setView('session')} aria-label={t('navigation.newSession')}>
        <FaClock className={styles.icon} aria-hidden="true" />
      </button>

      <button
        className={`${styles.navBtn} ${view === 'settings' ? styles.active : ''}`}
        onClick={() => setView('settings')}
        aria-label={t('navigation.settings')}
      >
        {/* Kugghjul */}
        <FaCog className={styles.icon} aria-hidden="true" />
      </button>
    </footer>
  );
}
