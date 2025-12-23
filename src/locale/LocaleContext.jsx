import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import sv from '../locales/sv.json';
import en from '../locales/en.json';

const messages = { sv, en };
const DEFAULT_LANG = 'sv';

const detectBrowserLang = () => {
  try {
    const nav = navigator;
    const langs = (nav && (nav.languages && nav.languages.length ? nav.languages : [nav.language || nav.userLanguage || nav.browserLanguage]));
    if (langs && langs.length) {
      for (const l of langs) {
        if (!l) continue;
        const code = l.toLowerCase();
        if (code.startsWith('sv')) return 'sv';
        if (code.startsWith('en')) return 'en';
      }
    }
  } catch (err) {
    // ignore
  }
  return DEFAULT_LANG;
};

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved) return saved;
      return detectBrowserLang();
    } catch {
      return DEFAULT_LANG;
    }
  });

  useEffect(() => {
    try { localStorage.setItem('language', lang); } catch {}
  }, [lang]);

  const t = useMemo(() => {
    const lookup = (keyPath) => {
      const parts = keyPath.split('.');
      const obj = messages[lang] || messages[DEFAULT_LANG];
      let cur = obj;
      for (const p of parts) {
        if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
        else return undefined;
      }
      return cur;
    };
    return lookup;
  }, [lang]);

  return (
    <LocaleContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
