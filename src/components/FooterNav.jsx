import React from 'react';
import { FaQuestionCircle, FaPlus, FaCog } from 'react-icons/fa';
import styles from './FooterNav.module.css';

export default function FooterNav({ view, setView }) {
  return (
    <footer className={styles.footer}>
      <button
        className={`${styles.navBtn} ${view === 'main' ? styles.active : ''}`}
        onClick={() => setView('main')}
      >
        {/* Frågetecken */}
        <FaQuestionCircle className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>Fråga</span>
      </button>

      <button
        className={`${styles.navBtn} ${view === 'add' ? styles.active : ''}`}
        onClick={() => setView('add')}
      >
        {/* Svartvit plus */}
        <FaPlus className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>Lägg till fråga</span>
      </button>

      <button
               className={`${styles.navBtn} ${view === 'settings' ? styles.active : ''}`}
        onClick={() => setView('settings')}
      >
        {/* Kugghjul */}
        <FaCog className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>Inställningar</span>
      </button>
    </footer>
  );
}