import { useLocale } from '../locale/LocaleContext';
import styles from './Settings.module.css';

function Settings({ categories, enabled, setEnabled }) {
  const { t, lang, setLang } = useLocale();

  const toggleCategory = (category) => {
    setEnabled(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.languageSection}>
        <label className={styles.languageLabel}>{t('language')}:</label>
        <select 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
          className={styles.languageSelect}
        >
          <option value="sv">SV</option>
          <option value="en">EN</option>
        </select>
      </div>

      <div className={styles.categoriesSection}>
        <h2 className={styles.categoriesTitle}>{t('includeCategories')}</h2>
        
        <div className={styles.categoriesList}>
          {categories.map(cat => {
            const isOn = enabled.includes(cat);

            return (
              <div
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`${styles.categoryToggle} ${isOn ? styles.active : ''}`}
              >
                <span className={styles.categoryLabel}>{t(`categories.${cat}`) || cat}</span>
                <span className={styles.categoryStatus}>{isOn ? t('yes') : t('no')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Settings;
