import { useLocale } from '../locale/LocaleContext';

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
      <div style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'center', marginTop: '1rem'}}>
          <label >{t('language')}:</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="sv">SV</option>
            <option value="en">EN</option>
          </select>
        </div>
      <div style= {{display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
        <h2>{t('includeCategories')}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {categories.map(cat => {
          const isOn = enabled.includes(cat);

          return (
            <div
              key={cat}
              onClick={() => toggleCategory(cat)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                border: '1px solid var(--c-border)',
                borderRadius: '999px',
                cursor: 'pointer',
                background: isOn ? 'var(--c-fg)' : 'var(--c-bg)',
                color: isOn ? 'var(--c-bg)' : 'var(--c-fg)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{t(`categories.${cat}`) || cat}</span>
              <span>{isOn ? t('yes') : t('no')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;
