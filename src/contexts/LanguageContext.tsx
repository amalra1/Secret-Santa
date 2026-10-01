'use client';

import { createContext, useEffect, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
  PORTUGUESE_LANGUAGE,
} from '@/constants/language';
import type { Language, LanguageContextValue } from '@/types/language';
import type { LanguageProviderProps } from '@/types/components/providers';

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function isLanguage(value: string | null): value is Language {
  return LANGUAGES.some((language) => language === value);
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguage(stored)) setLanguage(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {}
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((previous) =>
      previous === PORTUGUESE_LANGUAGE ? ENGLISH_LANGUAGE : PORTUGUESE_LANGUAGE,
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
