import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useLocale } from '../locale/LocaleContext';
import styles from './UpdatePrompt.module.css';

export default function UpdatePrompt() {
  const { t } = useLocale();
  const [updating, setUpdating] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const {
    needRefresh: [updateAvailable],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
  });

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      // Activates the waiting service worker and reloads the page.
      // User data is stored separately in localStorage and is not cleared.
      await updateServiceWorker(true);
    } catch {
      setUpdating(false);
    }
  };

  if (!updateAvailable || dismissed) return null;

  return (
    <aside className={styles.prompt} role="status" aria-live="polite">
      <p>{t('update.available')}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.updateButton} onClick={handleUpdate} disabled={updating}>
          {updating ? t('update.updating') : t('update.action')}
        </button>
        <button type="button" className={styles.laterButton} onClick={() => setDismissed(true)}>
          {t('update.later')}
        </button>
      </div>
    </aside>
  );
}
