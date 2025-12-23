function Settings({ categories, enabled, setEnabled }) {
  const toggleCategory = (category) => {
    setEnabled(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
      <div style={{ display: 'flex', flexDirection: 'column'}}>
      <div style= {{display: 'flex', justifyContent: 'center' }}>
      <h2>Inkludera kategorier</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                border: '1px solid #000',
                borderRadius: '999px',
                cursor: 'pointer',
                background: isOn ? '#000' : '#fff',
                color: isOn ? '#fff' : '#000',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{cat}</span>
              <span>{isOn ? 'JA' : 'NEJ'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;
