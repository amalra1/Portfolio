'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

export type Language = 'en' | 'pt-BR';
type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const STORAGE_KEY = 'portfolio:lang';

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Restore the previous choice (or the browser language) after hydration.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'pt-BR') {
        setLanguage(stored);
        return;
      }
      if (navigator.language.toLowerCase().startsWith('pt')) {
        setLanguage('pt-BR');
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'pt-BR' ? 'pt-BR' : 'en';
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* storage unavailable */
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'pt-BR' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
