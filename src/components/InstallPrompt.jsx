import { useEffect, useState } from 'react';
import { FiShare } from 'react-icons/fi'; // ikon för "Dela"
import styles from './InstallPrompt.module.css';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    const standalone = ('standalone' in window.navigator) && window.navigator.standalone;

    setIsIos(ios);

    if (ios && !standalone) {
      setShowPrompt(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log(`Install outcome: ${choiceResult.outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className={styles.promptContainer}>
      <div className={styles.promptContent}>
        <span className={styles.promptText}>
          {isIos ? (
            <>
              BigTalk App fungerar bäst om den läggs till på mobilens hemskärm. Detta görs via Dela{' '}
              <FiShare style={{ verticalAlign: 'middle', margin: '0 0.2rem' }} /> → Lägg till på hemskärmen.
            </>
          ) : (
            'BigTalk App fungerar bäst om den installeras som app på din enhet.'
          )}
        </span>
        <div className={styles.promptButtons}>
          {!isIos && deferredPrompt && (
            <button onClick={handleAndroidInstall} className={styles.installBtn}>
              Installera
            </button>
          )}
          <button onClick={() => setShowPrompt(false)} className={styles.closeBtn}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
