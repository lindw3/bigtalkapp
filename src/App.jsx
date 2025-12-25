import { useState, useEffect, useRef } from 'react';
import { useLocale } from './locale/LocaleContext';
import logo from './assets/bta_logotype.svg';
import styles from './App.module.css';
import defaultQuestions from './data/defaultQuestions';
import AddQuestion from './components/AddQuestion';
import Settings from './components/Settings';
import FooterNav from './components/FooterNav';
import InstallPrompt from './components/InstallPrompt';

function App() {
  // --------------------
  // QUESTIONS
  // --------------------
  const CATEGORY_LEGACY_MAP = {
    'Självinsikt & Personlig utveckling': 'self_insight',
    'Värderingar & Prioriteringar': 'values',
    'Intressen & Drivkrafter': 'interests',
    'Sociala relationer': 'social',
    'Egna frågor': 'ownQuestions'
  };

  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('questions');
    if (!saved) return defaultQuestions;

    let parsed = JSON.parse(saved);

    // Mappa gamla kategori-etiketter till nya nycklar
    parsed = parsed.map((q) => {
      if (q && typeof q.category === 'string') {
        const mapped = CATEGORY_LEGACY_MAP[q.category] || q.category;
        return { ...q, category: mapped };
      }
      return q;
    });

    // Sync: lägg till nya frågor från defaultQuestions som inte redan finns
    const savedIds = parsed.map(q => q.id);
    const genuinelyNew = defaultQuestions.filter(q => !savedIds.includes(q.id));
    const updated = [...parsed, ...genuinelyNew];

    return updated;
  });

  // --------------------
  // UI STATE
  // --------------------
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [view, setView] = useState('main'); // main | add | settings
  const [animating, setAnimating] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  // --------------------
  // CATEGORIES
  // --------------------
  const allCategories = [...new Set(questions.map(q => q.category))];
  const [enabledCategories, setEnabledCategories] = useState(() => {
    const saved = localStorage.getItem('enabledCategories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(cat => CATEGORY_LEGACY_MAP[cat] || cat);
      } catch {
        return allCategories;
      }
    }
    return allCategories;
  });
  const prevCategoriesRef = useRef(allCategories);

  // --------------------
  // SEEN QUESTIONS
  // --------------------
  const [seenQuestionIds, setSeenQuestionIds] = useState(() => {
    const saved = localStorage.getItem('seenQuestionIds');
    return saved ? JSON.parse(saved) : [];
  });

  // --------------------
  // LOCALSTORAGE (debounced)
  // --------------------
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('questions', JSON.stringify(questions));
    }, 300);
    return () => clearTimeout(id);
  }, [questions]);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
    }, 300);
    return () => clearTimeout(id);
  }, [enabledCategories]);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('seenQuestionIds', JSON.stringify(seenQuestionIds));
    }, 300);
    return () => clearTimeout(id);
  }, [seenQuestionIds]);

  // --------------------
  // SYNC NEW CATEGORIES
  // --------------------
  useEffect(() => {
    const prevCategories = prevCategoriesRef.current;
    const genuinelyNew = allCategories.filter(cat => !prevCategories.includes(cat));
    if (genuinelyNew.length > 0) {
      setEnabledCategories(prev => [...prev, ...genuinelyNew]);
    }
    prevCategoriesRef.current = allCategories;
  }, [allCategories]);

  // --------------------
  // FILTER QUESTIONS
  // --------------------
  const filteredQuestions = questions.filter(q =>
    enabledCategories.includes(q.category)
  );

  // Helpers for localization-aware rendering
  const { t, lang } = useLocale();

  const getQuestionText = (q) => {
    if (!q) return '';
    if (typeof q.question === 'string') return q.question;
    if (q.question && typeof q.question === 'object') return q.question[lang] || q.question.sv || '';
    return '';
  };

  const getCategoryLabel = (key) => {
    if (!key) return '';
    return t(`categories.${key}`) || key;
  };


  // --------------------
  // RANDOM QUESTION LOGIC
  // --------------------
  const getRandomQuestion = () => {
    if (filteredQuestions.length === 0) return null;

    let availableQuestions = filteredQuestions.filter(
      q => !seenQuestionIds.includes(q.id)
    );

    if (availableQuestions.length === 0) {
      setSeenQuestionIds([]);
      availableQuestions = filteredQuestions;
    }

    if (availableQuestions.length === 1) return availableQuestions[0];

    let next;
    do {
      next = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    } while (activeQuestion && next.id === activeQuestion.id);

    return next;
  };

  const nextQuestion = () => {
    if (animating) return;
    setAnimating(true);

    setTimeout(() => {
      const next = getRandomQuestion();
      setActiveQuestion(next);

      if (next) {
        setSeenQuestionIds(prev => [...prev, next.id]);
      }

      setAnimating(false);
    }, 300);
  };

  const handleNextQuestion = () => {
    setBtnPressed(true);
    nextQuestion();
    setTimeout(() => setBtnPressed(false), 350);
  };

  // --------------------
  // INITIAL QUESTION
  // --------------------
  useEffect(() => {
    if (!activeQuestion && filteredQuestions.length > 0) {
      const next = getRandomQuestion();
      setActiveQuestion(next);
      if (next) setSeenQuestionIds([next.id]);
    }
  }, []);

  // --------------------
  // ORIENTATION / LANDSCAPE HANDLING (MOBILE ONLY)
  // --------------------
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    // Enkel mobildetektor: userAgent + pekskärmsindikator + small screen
    const isMobileDevice = () => {
      try {
        const ua = navigator.userAgent || '';
        const mobileUa = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
        const pointerCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        const smallScreen = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
        return mobileUa || pointerCoarse || smallScreen;
      } catch {
        return false;
      }
    };

    const mobile = isMobileDevice();
    if (!mobile) return; // Do nothing on desktop / non-mobile devices

    // Försök låsa orienteringen till portrait när det stöds (endast på mobil)
    (async () => {
      try {
        if (typeof screen !== 'undefined' && screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('portrait');
        }
      } catch (err) {
        // lock kan misslyckas på iOS eller utan användarinteraktion — ignorera
      }
    })();

    // Fallback: visa overlay när vi är i liggande läge
    const mq = window.matchMedia && window.matchMedia('(orientation: landscape)');
    const handler = (e) => setIsLandscape(e.matches);
    if (mq) {
      setIsLandscape(mq.matches);
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else mq.addListener(handler);
    }

    const resizeHandler = () => {
      const isL = window.matchMedia && window.matchMedia('(orientation: landscape)').matches;
      setIsLandscape(!!isL);
    };
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', resizeHandler);

    return () => {
      if (mq) {
        if (mq.removeEventListener) mq.removeEventListener('change', handler);
        else mq.removeListener(handler);
      }
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('orientationchange', resizeHandler);
    };
  }, []);

  // --------------------
  // OWN QUESTIONS
  // --------------------
  const ownQuestions = questions.filter(
    q => q.category === 'ownQuestions'
  );

  const deleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    setSeenQuestionIds(prev => prev.filter(seenId => seenId !== id));
  };

  // --------------------
  // RENDER
  // --------------------
  return (
    <div className={styles.app}>
      {isLandscape && (
        <div className={styles.orientationOverlay} role="dialog" aria-live="polite">
          <div>
            <p style={{fontSize: '1.25rem', fontWeight: 600}}>{t('rotate_prompt')}</p>
            <p className={styles.orientationHint}>{t('rotate_hint')}</p>
          </div>
        </div>
      )}
      <div className={styles.wrapper} style={{ padding: 'env(safe-area-inset, var(--space-4))' }}>
        {/* HEADER */}
        <header className={styles.header}>
          <img src={logo} alt="BigTalk logo" className={styles.logo} />
          <h1 className={styles.title}>BigTalk</h1>
          <h2 className={styles.subtitle}>App</h2>
        </header>

        {/* MAIN */}
        <main className={`${styles.main} ${view === 'main' ? styles.centered : ''}`} style={{ flex: 1 }}>
          {view === 'main' && (
            <div className={styles.card}>
              {activeQuestion && (
                <div className={styles.questionCategory}>
                  {getCategoryLabel(activeQuestion.category)}
                </div>
                )}

                <div 
                  className={`${styles.questionText} ${
                    animating ? styles['fade-slide-out'] : styles['fade-slide-in']
                  }`}
                >
                    {activeQuestion
                    ? getQuestionText(activeQuestion)
                    : (t('no_matching_questions') || 'Inga frågor matchar dina inställningar')}
            </div>

              <button
                className={styles.primaryBtn}
                onClick={handleNextQuestion}
                style={{
                  backgroundColor: btnPressed ? 'var(--c-fg)' : 'var(--c-bg)',
                  color: btnPressed ? 'var(--c-bg)' : 'var(--c-fg)',
                  borderColor: 'var(--c-border)',
                }}
              >
                {t('newQuestion')}
              </button>
            </div>
          )}

          {view === 'add' && (
            <AddQuestion
              onAdd={(q) => {
                setQuestions(prev => [...prev, q]);
              }}
              ownQuestions={ownQuestions}
              onDelete={deleteQuestion}
            />
          )}

          {view === 'settings' && (
            <Settings
              categories={allCategories}
              enabled={enabledCategories}
              setEnabled={setEnabledCategories}
            />
          )}
        </main>

        <FooterNav view={view} setView={setView} />
        <InstallPrompt />
      </div>
    </div>
  );
}

export default App;
